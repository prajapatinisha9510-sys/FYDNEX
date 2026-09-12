"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

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

export default function CreatorSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [followerCount, setFollowerCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data, error } = await supabase
      .from("creators")
      .insert({
        name,
        email,
        niche,
        platform,
        follower_count: Number(followerCount) || 0,
      })
      .select()
      .single();

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    localStorage.setItem("creator_id", data.id);
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-paper">
        <div className="bg-white rounded-2xl shadow p-8 max-w-md text-center">
          <h1 className="font-display text-2xl mb-2 text-teal">
            You&apos;re in
          </h1>
          <p className="text-muted">
            Creator account saved. Check your Supabase{" "}
            <code className="bg-paper px-1 rounded">creators</code> table to
            confirm the row appeared. Social account connection (needed for
            CPV view-tracking) comes in the next step.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-paper">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="font-display text-2xl mb-1">Join as a creator</h1>
        <p className="text-muted text-sm mb-6">
          Get matched into campaigns that already fit your niche.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="e.g. 5000"
              value={followerCount}
              onChange={(e) => setFollowerCount(e.target.value)}
              className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
              min={0}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-white rounded-lg px-3 py-2.5 font-medium hover:bg-inksoft transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Join as a creator"}
          </button>
        </form>
      </div>
    </div>
  );
}
