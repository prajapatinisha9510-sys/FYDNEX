"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function BrandCompleteProfile() {
  const [name, setName] = useState("");
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function check() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/brand/login");
        return;
      }

      const { data: existing } = await supabase
        .from("brands")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (existing) {
        router.push("/brand/dashboard");
        return;
      }

      const meta = user.user_metadata || {};
      setName(meta.full_name || meta.name || "");
      setChecking(false);
    }
    check();
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
      router.push("/brand/login");
      return;
    }

    const { error: insertError } = await supabase.from("brands").insert({
      id: user.id,
      name,
      email: user.email,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    router.push("/brand/dashboard");
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-paper">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="font-display text-2xl mb-1">Tell us about your brand</h1>
        <p className="text-muted text-sm mb-6">
          One quick detail before you get to your dashboard.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Brand name
            </label>
            <input
              type="text"
              placeholder="e.g. QuickBite"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            {loading ? "Saving..." : "Go to dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
