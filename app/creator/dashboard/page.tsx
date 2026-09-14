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

export default function CreatorDashboard() {
  const [profile, setProfile] = useState<CreatorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
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

        const { data, error: selectError } = await supabase
          .from("creators")
          .select("name, niche, platform, follower_count")
          .eq("id", user.id)
          .maybeSingle();

        if (selectError) throw selectError;

        if (!data) {
          router.push("/creator/complete-profile");
          return;
        }

        setProfile(data);
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

        <div className="bg-white border border-ink/10 rounded-2xl p-8">
          <p className="font-display text-xl mb-2">No campaigns yet</p>
          <p className="text-muted text-sm">
            Eligible campaigns will appear here once brands start creating
            them.
          </p>
        </div>
      </div>
    </div>
  );
}
