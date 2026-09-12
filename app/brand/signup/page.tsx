"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BrandSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      options: {
        data: { name },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (!data.user) {
      setError("Signup failed. Please try again.");
      return;
    }

    if (data.session) {
      router.push("/brand/dashboard");
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
    <div className="min-h-screen flex items-center justify-center px-6 bg-paper">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="font-display text-2xl mb-6">
          Create your brand account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Brand name
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-white rounded-lg px-3 py-2.5 font-medium hover:bg-inksoft transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="text-sm text-muted mt-4 text-center">
          Already have an account?{" "}
          <Link href="/brand/login" className="text-amber font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
