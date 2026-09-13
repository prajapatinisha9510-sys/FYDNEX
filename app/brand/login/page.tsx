"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleButton from "@/components/GoogleButton";

export default function BrandLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/brand/dashboard`,
      },
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/brand/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-paper">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="font-display text-2xl mb-6">Log in</h1>

        <GoogleButton onClick={handleGoogle} />

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-ink/10" />
          <span className="text-xs text-muted">or</span>
          <div className="flex-1 h-px bg-ink/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="text-sm text-muted mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/brand/signup" className="text-amber font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
