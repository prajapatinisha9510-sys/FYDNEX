"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MODELS = [
  {
    stage: "Awareness",
    name: "CPV Campaign",
    detail:
      "Pay per verified view. Any eligible creator joins instantly — an open pool, not a hand-picked few.",
    accent: "#E8A63D",
    href: "/brand/campaign/new/cpv",
    live: true,
  },
  {
    stage: "Consideration",
    name: "Participation Campaign",
    detail:
      "A fixed payout per post, gated by eligibility, verified against the brief before payment clears.",
    accent: "#1F8A79",
    href: "#",
    live: false,
  },
  {
    stage: "Ad creative",
    name: "One-Time Campaign",
    detail:
      "Creators deliver content brands own outright — for their own ads, not a public post.",
    accent: "#8B5E8A",
    href: "#",
    live: false,
  },
  {
    stage: "Conversion",
    name: "Sales Campaign",
    detail:
      "One shared link. A guaranteed floor per creator, plus a bonus pool that scales with real, tracked sales.",
    accent: "#2E6F9E",
    href: "#",
    live: false,
  },
  {
    stage: "Always-on",
    name: "Gig Marketplace",
    detail:
      "Verified creators list fixed-price services. Brands order on demand, no campaign required.",
    accent: "#B8632F",
    href: "#",
    live: false,
  },
];

export default function SelectCampaignType() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/brand/login");
        return;
      }
      setChecking(false);
    }
    checkAuth();
  }, [router]);

  if (checking) {
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
          <Link
            href="/brand/dashboard"
            className="text-sm text-muted hover:text-ink transition"
          >
            Back to dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl mb-2">
          What kind of campaign do you need?
        </h1>
        <p className="text-muted mb-10">
          Pick the model that fits your goal. Each one has different rules
          for how creators join and get paid.
        </p>

        <div className="space-y-4">
          {MODELS.map((m) => {
            const card = (
              <div
                className={`relative bg-white rounded-2xl overflow-hidden border border-ink/10 transition ${
                  m.live
                    ? "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                <div
                  className="h-1.5"
                  style={{ backgroundColor: m.accent }}
                />
                <div className="p-6 flex items-start justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-medium text-muted">
                        {m.stage}
                      </span>
                      {!m.live && (
                        <span className="text-xs bg-ink/5 text-muted px-2 py-0.5 rounded-full">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <p className="font-display text-xl mb-2">{m.name}</p>
                    <p className="text-muted text-sm leading-relaxed max-w-md">
                      {m.detail}
                    </p>
                  </div>
                  {m.live && (
                    <span
                      className="text-2xl font-display shrink-0"
                      style={{ color: m.accent }}
                    >
                      &rarr;
                    </span>
                  )}
                </div>
              </div>
            );

            return m.live ? (
              <Link key={m.name} href={m.href}>
                {card}
              </Link>
            ) : (
              <div key={m.name}>{card}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
