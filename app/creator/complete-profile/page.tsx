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

export default function CompleteProfile() {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [followerCount, setFollowerCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function prefill() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/creator/login");
        return;
      }

      // Already has a profile? skip straight to dashboard
      const { data: existing } = await supabase
        .from("creators")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (existing) {
        router.push("/creator/dashboard");
        return;
      }

      const meta = user.user_metadata || {};
      setName(meta.full_name || meta.name || "");
    }
    prefill();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      router.push("/creator/login");
      return;
    }

    const { error: insertError } = await supabase.from("creators").insert({
      id: user.id,
      name,
      email: user.email,
      niche,
      platform,
      follower_count: Number(followerCount) || 0,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    router.push("/creator/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-paper">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="font-display text-2xl mb-1">One more step</h1>
        <p className="text-muted text-sm mb-6">
          A couple of details we need to match you with the right campaigns.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Niche
            </label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber bg-white"
              required
            >
              <option value="" disabled>
                Select your primary niche
              </option>
              {NICHES.map((n) => (
                <option key={n} value={n.toLowerCase()}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Primary platform
            </label>
            <div className="flex gap-3">
              {["instagram", "youtube"].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`flex-1 border rounded-lg px-3 py-2 text-sm font-medium capitalize transition ${
                    platform === p
                      ? "border-amber bg-amber/10 text-ink"
                      : "border-ink/15 text-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Follower count
            </label>
            <input
              type="number"
              min={0}
              value={followerCount}
              onChange={(e) => setFollowerCount(e.target.value)}
              className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-white rounded-lg px-3 py-2.5 font-medium hover:bg-inksoft transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Finish setting up"}
          </button>
        </form>
      </div>
    </div>
  );
}
