"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BrandDashboard() {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadBrand() {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          router.push("/brand/login");
          return;
        }

        const { data, error: selectError } = await supabase
          .from("brands")
          .select("name")
          .eq("id", user.id)
          .maybeSingle();

        if (selectError) throw selectError;

        if (!data) {
          router.push("/brand/complete-profile");
          return;
        }

        setName(data.name);
        setLoading(false);
      } catch (err: unknown) {
        console.error(err);
        setLoadError(
          err instanceof Error ? err.message : "Something went wrong."
        );
        setLoading(false);
      }
    }
    loadBrand();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/brand/login");
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
        <h1 className="font-display text-3xl mb-2">Welcome, {name}</h1>
        <p className="text-muted mb-10">Manage your campaigns from here.</p>

        <Link
          href="/brand/campaign/new"
          className="inline-block bg-amber text-ink px-6 py-3 rounded-full font-medium hover:brightness-95 transition"
        >
          + Create a campaign
        </Link>
      </div>
    </div>
  );
}
