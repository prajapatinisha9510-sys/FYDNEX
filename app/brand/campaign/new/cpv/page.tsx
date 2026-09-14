"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const NICHES = [
  "Food",
  "Tech",
  "Fitness",
  "Fashion",
  "Beauty",
  "Lifestyle",
  "Gaming",
  "Finance",
  "Travel",
  "Comedy",
];

export default function NewCampaign() {
  const [brandId, setBrandId] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [ratePerView, setRatePerView] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [milestoneSize, setMilestoneSize] = useState("5000");
  const [durationDays, setDurationDays] = useState("3");
  const [niche, setNiche] = useState("");
  const [minFollowers, setMinFollowers] = useState("0");
  const [platform, setPlatform] = useState("instagram");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadBrand() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/brand/login");
        return;
      }

      setBrandId(user.id);
      setChecking(false);
    }
    loadBrand();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!brandId) {
      setError(
        "No brand account found on this browser. Sign up as a brand first."
      );
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const budget = Number(totalBudget);
    const now = new Date();
    const end = new Date(now.getTime() + Number(durationDays) * 86400000);

    const { error } = await supabase.from("campaigns").insert({
      brand_id: brandId,
      title,
      brief,
      rate_per_view: Number(ratePerView),
      total_budget: budget,
      budget_remaining: budget,
      milestone_size: Number(milestoneSize),
      eligibility: {
        niche,
        min_followers: Number(minFollowers),
        platform,
      },
      status: "live",
      start_at: now.toISOString(),
      end_at: end.toISOString(),
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-paper">
        <div className="bg-white rounded-2xl shadow p-8 max-w-md text-center">
          <h1 className="font-display text-2xl mb-2 text-teal">
            Campaign live
          </h1>
          <p className="text-muted">
            Check your Supabase <code className="bg-paper px-1 rounded">campaigns</code> table
            to confirm the row appeared, with{" "}
            <code className="bg-paper px-1 rounded">budget_remaining</code>{" "}
            equal to your total budget.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-paper">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow p-8">
        <h1 className="font-display text-2xl mb-1">Create a CPV campaign</h1>
        <p className="text-muted text-sm mb-6">
          Set your budget and rate. Funds are tracked in your{" "}
          <code className="bg-paper px-1 rounded">escrow_ledger</code> once
          real payments are wired in.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Campaign title
            </label>
            <input
              type="text"
              placeholder="e.g. StrikeZone Launch"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Content brief
            </label>
            <textarea
              placeholder="What should creators show or do in their content?"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Rate per view ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.02"
                value={ratePerView}
                onChange={(e) => setRatePerView(e.target.value)}
                className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Total budget ($)
              </label>
              <input
                type="number"
                step="1"
                min="0"
                placeholder="25000"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
                className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Milestone size (views)
              </label>
              <input
                type="number"
                min="1"
                value={milestoneSize}
                onChange={(e) => setMilestoneSize(e.target.value)}
                className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Duration (days)
              </label>
              <input
                type="number"
                min="1"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
                required
              />
            </div>
          </div>

          <div className="border-t border-ink/10 pt-4">
            <p className="text-sm font-medium text-ink mb-3">
              Creator eligibility
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-1">
                  Required niche
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber bg-white"
                  required
                >
                  <option value="" disabled>
                    Select a niche
                  </option>
                  {NICHES.map((n) => (
                    <option key={n} value={n.toLowerCase()}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted mb-1">
                    Min. followers
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={minFollowers}
                    onChange={(e) => setMinFollowers(e.target.value)}
                    className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber bg-white"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-white rounded-lg px-3 py-2.5 font-medium hover:bg-inksoft transition disabled:opacity-50"
          >
            {loading ? "Launching..." : "Launch campaign"}
          </button>
        </form>
      </div>
    </div>
  );
}
