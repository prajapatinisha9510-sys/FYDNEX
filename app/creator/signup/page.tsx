"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const [password, setPassword] = useState("");
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [followerCount, setFollowerCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    if (!data.user) {
      setLoading(false);
      setError("Signup failed. Please try again.");
      return;
    }

    const { error: profileError } = await supabase.from("creators").insert({
      id: data.user.id,
      name,
      email,
      niche,
      platform,
      follower_count: Number(followerCount) || 0,
    });

    setLoading(false);

    if (profileError) {
      setError(profileError.message);
      return;
    }

    if (data.session) {
      router.push("/creator/dashboard");
    } else {
      setCheckEmail(true);
    }
  }

  if (checkEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-paper">
        <div className="bg-white rounded-2xl shadow p-8 max-w-md text-center">
          <h1 className="font-display text-2xl mb-2">Check your email</h1>
          <p className="text-muted">
            Confirm your account via the link we sent, then log in.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
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
            {loading ? "Creating..." : "Join as a creator"}
          </button>
        </form>
        <p className="text-sm text-muted mt-4 text-center">
          Already have an account?{" "}
          <Link href="/creator/login" className="text-amber font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
