"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BrandDashboard() {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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

      const { data: brand } = await supabase
        .from("brands")
        .select("name")
        .eq("id", user.id)
        .single();

      setName(brand?.name ?? null);
      setLoading(false);
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
        <h1 className="font-display text-3xl mb-2">Welcome, {name}</h1>
        <p className="text-muted mb-10">
          Manage your campaigns from here.
        </p>

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
