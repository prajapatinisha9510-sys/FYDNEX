"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type CreatorProfile = {
  name: string;
  niche: string;
  platform: string;
  follower_count: number;
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
          .select("name, niche, platform, follower_count")
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
          .select("campaign_id")
          .eq("creator_id", user.id);

        setJoinedIds(new Set((joined || []).map((j) => j.campaign_id)));

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
        <p className="text-muted mb-10 capitalize">
          {profile?.niche} &middot; {profile?.platform} &middot;{" "}
          {profile?.follower_count?.toLocaleString()} followers
        </p>

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
              return (
                <div
                  key={c.id}
                  className="bg-white border border-ink/10 rounded-2xl p-6 flex items-center justify-between gap-6"
                >
                  <div>
                    <p className="font-display text-xl mb-1">{c.title}</p>
                    <p className="text-muted text-sm mb-2">{c.brief}</p>
                    <p className="text-xs text-muted">
                      ${c.rate_per_view.toFixed(2)} per verified view &middot; $
                      {c.budget_remaining.toLocaleString()} budget remaining
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

