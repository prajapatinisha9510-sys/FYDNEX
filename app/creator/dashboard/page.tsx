"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type CreatorProfile = {
  name: string;
  niche: string;
  platform: string;
  follower_count: number;
  youtube_connected: boolean;
  instagram_connected: boolean;
};

type Campaign = {
  id: string;
  title: string;
  brief: string;
  rate_per_view: number;
  budget_remaining: number;
  eligibility: {
    niche?: string;
    min_followers?: number;
    platform?: string;
  };
};

export default function CreatorDashboard() {
  const [creatorId, setCreatorId] = useState<string | null>(null);
  const [profile, setProfile] = useState<CreatorProfile | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [joiningId, setJoiningId] = useState<string | null>(null);
  const [postUrls, setPostUrls] = useState<Record<string, string>>({});
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set());
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadCreator() {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          router.push("/creator/login");
          return;
        }

        const { data: creatorData, error: selectError } = await supabase
          .from("creators")
          .select(
            "name, niche, platform, follower_count, youtube_connected, instagram_connected"
          )
          .eq("id", user.id)
          .maybeSingle();

        if (selectError) throw selectError;

        if (!creatorData) {
          router.push("/creator/complete-profile");
          return;
        }

        setCreatorId(user.id);
        setProfile(creatorData);

        // Fetch live campaigns and filter to ones this creator qualifies for
        const { data: liveCampaigns, error: campaignError } = await supabase
          .from("campaigns")
          .select(
            "id, title, brief, rate_per_view, budget_remaining, eligibility"
          )
          .eq("status", "live");

        if (campaignError) throw campaignError;

        const eligible = (liveCampaigns || []).filter((c) => {
          const req = c.eligibility || {};
          if (req.niche && req.niche !== creatorData.niche) return false;
          if (req.platform && req.platform !== creatorData.platform)
            return false;
          if (
            req.min_followers &&
            creatorData.follower_count < req.min_followers
          )
            return false;
          return true;
        });

        setCampaigns(eligible);

        // Which of these has this creator already joined?
        const { data: joined } = await supabase
          .from("campaign_creators")
          .select("campaign_id, post_url")
          .eq("creator_id", user.id);

        setJoinedIds(new Set((joined || []).map((j) => j.campaign_id)));
        setSubmittedIds(
          new Set(
            (joined || [])
              .filter((j) => j.post_url)
              .map((j) => j.campaign_id)
          )
        );

        setLoading(false);
      } catch (err: unknown) {
        console.error(err);
        setLoadError(
          err instanceof Error ? err.message : "Something went wrong."
        );
        setLoading(false);
      }
    }
    loadCreator();
  }, [router]);

  async function handleJoin(campaignId: string) {
    if (!creatorId) return;
    setJoiningId(campaignId);

    const supabase = createClient();
    const { error } = await supabase.from("campaign_creators").insert({
      campaign_id: campaignId,
      creator_id: creatorId,
      status: "joined",
    });

    setJoiningId(null);

    if (error) {
      alert(error.message);
      return;
    }

    setJoinedIds((prev) => new Set(prev).add(campaignId));
  }

  async function handleConnectYouTube() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/creator/dashboard&connect=youtube`,
        scopes: "https://www.googleapis.com/auth/youtube.readonly",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  }

  function handleConnectInstagram() {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID!,
      redirect_uri: `${window.location.origin}/api/instagram/callback`,
      response_type: "code",
      scope: "instagram_business_basic,instagram_business_manage_insights",
    });
    window.location.href = `https://www.instagram.com/oauth/authorize?${params.toString()}`;
  }

  async function handleSubmitLink(campaignId: string) {
    const url = postUrls[campaignId];
    if (!url) return;

    setSubmittingId(campaignId);

    const supabase = createClient();
    const { error } = await supabase
      .from("campaign_creators")
      .update({ post_url: url, status: "posted" })
      .eq("campaign_id", campaignId)
      .eq("creator_id", creatorId);

    setSubmittingId(null);

    if (error) {
      alert(error.message);
      return;
    }

    setSubmittedIds((prev) => new Set(prev).add(campaignId));
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/creator/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper px-6">
        {loadError ? (
          <div className="bg-white rounded-2xl shadow p-8 max-w-md text-center">
            <h1 className="font-display text-xl mb-2 text-red-600">
              Something went wrong
            </h1>
            <p className="text-muted text-sm">{loadError}</p>
          </div>
        ) : (
          <p className="text-muted">Loading...</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-white border-b border-ink/10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-lg">Fydnex</span>
          <button
            onClick={handleLogout}
            className="text-sm text-muted hover:text-ink transition"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl mb-2">
          Welcome, {profile?.name}
        </h1>
        <p className="text-muted mb-6 capitalize">
          {profile?.niche} &middot; {profile?.platform} &middot;{" "}
          {profile?.follower_count?.toLocaleString()} followers
        </p>

        <div className="bg-white border border-ink/10 rounded-2xl p-6 mb-4 flex items-center justify-between">
          <div>
            <p className="font-medium mb-1">Instagram account</p>
            <p className="text-muted text-sm">
              {profile?.instagram_connected
                ? "Connected — Fydnex can track verified views on your posts."
                : "Connect your account so Fydnex can verify views for CPV campaigns."}
            </p>
          </div>
          {profile?.instagram_connected ? (
            <span className="shrink-0 text-sm bg-teal/10 text-teal px-4 py-2 rounded-full font-medium">
              Connected
            </span>
          ) : (
            <button
              onClick={handleConnectInstagram}
              className="shrink-0 bg-ink text-white px-5 py-2.5 rounded-full font-medium hover:bg-inksoft transition"
            >
              Connect Instagram
            </button>
          )}
        </div>

        <div className="bg-white border border-ink/10 rounded-2xl p-6 mb-10 flex items-center justify-between">
          <div>
            <p className="font-medium mb-1">YouTube account</p>
            <p className="text-muted text-sm">
              {profile?.youtube_connected
                ? "Connected — Fydnex can track verified views on your videos."
                : "Connect your account so Fydnex can verify views for CPV campaigns."}
            </p>
          </div>
          {profile?.youtube_connected ? (
            <span className="shrink-0 text-sm bg-teal/10 text-teal px-4 py-2 rounded-full font-medium">
              Connected
            </span>
          ) : (
            <button
              onClick={handleConnectYouTube}
              className="shrink-0 bg-ink text-white px-5 py-2.5 rounded-full font-medium hover:bg-inksoft transition"
            >
              Connect YouTube
            </button>
          )}
        </div>

        {campaigns.length === 0 ? (
          <div className="bg-white border border-ink/10 rounded-2xl p-8">
            <p className="font-display text-xl mb-2">No campaigns yet</p>
            <p className="text-muted text-sm">
              Eligible campaigns will appear here once brands create ones
              that match your niche, platform, and follower count.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((c) => {
              const joined = joinedIds.has(c.id);
              const submitted = submittedIds.has(c.id);
              return (
                <div
                  key={c.id}
                  className="bg-white border border-ink/10 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <p className="font-display text-xl mb-1">{c.title}</p>
                      <p className="text-muted text-sm mb-2">{c.brief}</p>
                      <p className="text-xs text-muted">
                        ${c.rate_per_view.toFixed(2)} per verified view
                        &middot; ${c.budget_remaining.toLocaleString()}{" "}
                        budget remaining
                      </p>
                    </div>
                    <button
                      onClick={() => handleJoin(c.id)}
                      disabled={joined || joiningId === c.id}
                      className={`shrink-0 px-5 py-2.5 rounded-full font-medium transition ${
                        joined
                          ? "bg-teal/10 text-teal cursor-default"
                          : "bg-amber text-ink hover:brightness-95 disabled:opacity-50"
                      }`}
                    >
                      {joined
                        ? "Joined"
                        : joiningId === c.id
                        ? "Joining..."
                        : "Join campaign"}
                    </button>
                  </div>

                  {joined && (
                    <div className="mt-4 pt-4 border-t border-ink/10">
                      {submitted ? (
                        <p className="text-sm text-teal font-medium">
                          Post link submitted — tracking will begin once
                          view verification is live.
                        </p>
                      ) : (
                        <div className="flex gap-3">
                          <input
                            type="url"
                            placeholder="Paste your post link here"
                            value={postUrls[c.id] || ""}
                            onChange={(e) =>
                              setPostUrls((prev) => ({
                                ...prev,
                                [c.id]: e.target.value,
                              }))
                            }
                            className="flex-1 border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                          />
                          <button
                            onClick={() => handleSubmitLink(c.id)}
                            disabled={
                              !postUrls[c.id] || submittingId === c.id
                            }
                            className="shrink-0 bg-ink text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-inksoft transition disabled:opacity-50"
                          >
                            {submittingId === c.id
                              ? "Submitting..."
                              : "Submit"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

