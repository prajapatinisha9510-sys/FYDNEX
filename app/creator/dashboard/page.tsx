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
  const router = useRouter();

  useEffect(() => {
    async function loadCreator() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/creator/login");
        return;
      }

      const { data: existing } = await supabase
        .from("creators")
        .select("name, niche, platform, follower_count")
        .eq("id", user.id)
        .maybeSingle();

      if (existing) {
        setProfile(existing);
        setLoading(false);
        return;
      }

      // No profile row yet — create it now from the metadata saved at signup
      const meta = user.user_metadata || {};
      const { data: created, error: createError } = await supabase
        .from("creators")
        .insert({
          id: user.id,
          name: meta.name ?? "",
          email: user.email,
          niche: meta.niche ?? "",
          platform: meta.platform ?? "instagram",
          follower_count: meta.follower_count ?? 0,
        })
        .select("name, niche, platform, follower_count")
        .single();

      if (createError) {
        console.error(createError);
      }

      setProfile(created ?? null);
      setLoading(false);
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
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <p className="text-muted">Loading...</p>
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
            them — this list is being built next.
          </p>
        </div>
      </div>
    </div>
  );
}
