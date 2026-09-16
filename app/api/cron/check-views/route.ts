import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

async function refreshGoogleToken(
  refreshToken: string
): Promise<string | undefined> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  return data.access_token as string | undefined;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const results: Array<{
    campaign_creator_id: string;
    viewCount: number;
    newMilestones: number;
  }> = [];

  const { data: rows, error } = await supabase
    .from("campaign_creators")
    .select(
      `id, campaign_id, creator_id, post_url, platform, last_milestone,
       campaigns ( rate_per_view, milestone_size, budget_remaining, status ),
       creators ( youtube_access_token, youtube_refresh_token, youtube_connected )`
    )
    .eq("status", "posted")
    .eq("platform", "youtube");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  for (const row of rows || []) {
    try {
      const campaign = Array.isArray(row.campaigns)
        ? row.campaigns[0]
        : row.campaigns;
      const creator = Array.isArray(row.creators)
        ? row.creators[0]
        : row.creators;

      if (!campaign || campaign.status !== "live") continue;
      if (!creator?.youtube_connected || !creator.youtube_access_token)
        continue;
      if (!row.post_url) continue;

      const videoId = extractYouTubeId(row.post_url);
      if (!videoId) continue;

      let accessToken = creator.youtube_access_token;

      let statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      // Token expired — refresh and retry once
      if (statsRes.status === 401 && creator.youtube_refresh_token) {
        const newToken = await refreshGoogleToken(
          creator.youtube_refresh_token
        );
        if (newToken) {
          accessToken = newToken;
          await supabase
            .from("creators")
            .update({ youtube_access_token: newToken })
            .eq("id", row.creator_id);
          statsRes = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
        }
      }

      const statsData = await statsRes.json();
      const viewCount = Number(statsData.items?.[0]?.statistics?.viewCount ?? 0);

      await supabase.from("view_snapshots").insert({
        campaign_creator_id: row.id,
        view_count: viewCount,
      });

      const milestoneSize = campaign.milestone_size;
      const milestonesReached = Math.floor(viewCount / milestoneSize);
      const newMilestones = milestonesReached - (row.last_milestone || 0);

      if (newMilestones > 0) {
        const payoutAmount =
          newMilestones * milestoneSize * campaign.rate_per_view;
        const cappedAmount = Math.min(payoutAmount, campaign.budget_remaining);

        if (cappedAmount > 0) {
          await supabase.from("payouts").insert({
            campaign_creator_id: row.id,
            amount: cappedAmount,
            milestone_number: milestonesReached,
            status: "pending", // no real payments provider wired in yet
          });

          await supabase
            .from("campaigns")
            .update({
              budget_remaining: campaign.budget_remaining - cappedAmount,
            })
            .eq("id", row.campaign_id);

          await supabase
            .from("campaign_creators")
            .update({ last_milestone: milestonesReached })
            .eq("id", row.id);
        }
      }

      results.push({
        campaign_creator_id: row.id,
        viewCount,
        newMilestones,
      });
    } catch (err) {
      console.error("Error processing campaign_creator", row.id, err);
    }
  }

  return NextResponse.json({ checked: results.length, results });
}
