import Link from "next/link";

const models = [
  {
    stage: "Awareness",
    name: "CPV Campaign",
    detail:
      "Brands pay per verified view. Any eligible creator joins instantly — an open pool, not a hand-picked few.",
    color: "bg-amber",
  },
  {
    stage: "Consideration",
    name: "Participation Campaign",
    detail:
      "A fixed payout per post, gated by eligibility, verified against the brief before payment clears.",
    color: "bg-teal",
  },
  {
    stage: "Ad creative",
    name: "One-Time Campaign",
    detail:
      "Creators deliver content brands own outright — for their own ads, not a public post.",
    color: "bg-[#8B5E8A]",
  },
  {
    stage: "Conversion",
    name: "Sales Campaign",
    detail:
      "One shared link. A guaranteed floor per creator, plus a bonus pool that scales with real, tracked sales.",
    color: "bg-[#2E6F9E]",
  },
  {
    stage: "Always-on",
    name: "Gig Marketplace",
    detail:
      "Verified creators list fixed-price services. Brands order on demand, no campaign required.",
    color: "bg-[#B8632F]",
  },
];

const steps = [
  {
    n: "01",
    title: "Brand funds a campaign",
    detail: "Budget locked in escrow before a single creator joins.",
  },
  {
    n: "02",
    title: "Creators join under fixed rules",
    detail: "Eligibility-gated, instant — no application, no pitch.",
  },
  {
    n: "03",
    title: "Creator delivers",
    detail: "Content posted, tracked, or submitted per the campaign type.",
  },
  {
    n: "04",
    title: "Payout releases",
    detail: "Triggered by an API, a verification check, or approval — never a chase.",
  },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-ink text-white">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-24 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <h1 className="font-display text-5xl md:text-6xl leading-[1.08] mb-6">
              Campaigns, not
              <br />
              cold outreach.
            </h1>
            <p className="text-white/70 text-lg max-w-lg mb-10 leading-relaxed">
              Fydnex is where brands fund structured campaigns and creators
              join under fixed rules. Every rupee sits in escrow until the
              work is verified — no browsing profiles, no DMs, no chasing
              payment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/brand/signup"
                className="bg-amber text-ink px-6 py-3 rounded-full font-medium hover:brightness-95 transition"
              >
                Start a campaign
              </Link>
              <Link
                href="/creator/signup"
                className="border border-white/25 text-white px-6 py-3 rounded-full font-medium hover:bg-white/5 transition"
              >
                Join as a creator
              </Link>
            </div>
          </div>

          {/* Ticket mock */}
          <div className="md:col-span-2">
            <div className="relative bg-white text-ink rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-muted uppercase tracking-wide">
                  CPV Campaign
                </span>
                <span className="text-xs bg-teal/10 text-teal px-2 py-1 rounded-full font-medium">
                  Live
                </span>
              </div>
              <p className="font-display text-2xl mb-1">QuickBite Launch</p>
              <p className="text-muted text-sm mb-6">
                5 cities &middot; Food &amp; lifestyle creators
              </p>

              <div
                className="border-t border-dashed border-ink/15 pt-4 relative"
                aria-hidden
              >
                <span className="absolute -left-9 -top-3 w-4 h-4 rounded-full bg-paper" />
                <span className="absolute -right-9 -top-3 w-4 h-4 rounded-full bg-paper" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-2xl font-display">&#8377;2,00,000</p>
                  <p className="text-xs text-muted">Escrowed budget</p>
                </div>
                <div>
                  <p className="text-2xl font-display">&#8377;0.15</p>
                  <p className="text-xs text-muted">Per verified view</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-3xl mb-4">
              Brands pay upfront and hope.
            </h2>
            <p className="text-muted leading-relaxed">
              Flat fees with no guarantee of real views. No independent way
              to verify a creator&apos;s numbers before the money moves.
              Slow, manual discovery through DMs and negotiation.
            </p>
          </div>
          <div className="md:border-l md:border-ink/10 md:pl-16">
            <h2 className="font-display text-3xl mb-4">
              Creators wait and hope.
            </h2>
            <p className="text-muted leading-relaxed">
              Payment delays of 30 to 90 days are treated as normal. Nano
              and mid-tier creators get overlooked by agencies entirely. No
              recourse when a brand simply disappears after delivery.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white border-y border-ink/10">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="font-display text-3xl mb-14 max-w-lg">
            One structure, every campaign.
          </h2>
          <div className="grid md:grid-cols-4 gap-10">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                <p className="font-display text-4xl text-amber mb-4">
                  {s.n}
                </p>
                <h3 className="font-medium text-lg mb-2">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {s.detail}
                </p>
                {i < steps.length - 1 && (
                  <span className="hidden md:block absolute top-5 -right-5 w-10 h-px bg-ink/15" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIVE MODELS */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="font-display text-3xl mb-3 max-w-lg">
          Five campaign types. One funnel.
        </h2>
        <p className="text-muted mb-14 max-w-lg">
          Brands move through the funnel without leaving the platform —
          awareness, trust, conversion, and everything in between.
        </p>

        <div className="space-y-4">
          {models.map((m) => (
            <div
              key={m.name}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 border border-ink/10 rounded-xl px-6 py-5 bg-white"
            >
              <div className="flex items-center gap-3 md:w-48 shrink-0">
                <span className={`w-2.5 h-2.5 rounded-full ${m.color}`} />
                <span className="text-sm text-muted">{m.stage}</span>
              </div>
              <p className="font-display text-xl md:w-64 shrink-0">
                {m.name}
              </p>
              <p className="text-muted text-sm leading-relaxed">
                {m.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="bg-ink text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
          <div>
            <p className="font-display text-4xl mb-2 text-amber">100%</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Of campaign budgets held in escrow before a creator ever
              starts work.
            </p>
          </div>
          <div>
            <p className="font-display text-4xl mb-2 text-amber">0</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Manual matchmaking. No browsing profiles, no cold pitching,
              ever.
            </p>
          </div>
          <div>
            <p className="font-display text-4xl mb-2 text-amber">5</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Campaign models spanning the full funnel, from first view to
              final sale.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-ink/10 rounded-2xl p-10">
            <h3 className="font-display text-2xl mb-3">For brands</h3>
            <p className="text-muted mb-8 leading-relaxed">
              Fund a campaign, set your terms, and let creators come to you
              — with your budget protected the entire time.
            </p>
            <Link
              href="/brand/signup"
              className="inline-block bg-ink text-white px-5 py-2.5 rounded-full font-medium hover:bg-inksoft transition"
            >
              Create a brand account
            </Link>
          </div>
          <div className="bg-ink text-white rounded-2xl p-10">
            <h3 className="font-display text-2xl mb-3">For creators</h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              Join campaigns that already match your niche. Get paid on
              merit, protected by escrow, without chasing anyone.
            </p>
            <Link
              href="/creator/signup"
              className="inline-block bg-amber text-ink px-5 py-2.5 rounded-full font-medium hover:brightness-95 transition"
            >
              Join as a creator
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>Fydnex &mdash; a full-funnel campaign marketplace</p>
          <p>India-first, built for real campaigns</p>
        </div>
      </footer>
    </main>
  );
}
