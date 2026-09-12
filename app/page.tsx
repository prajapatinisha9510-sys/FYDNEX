import Link from "next/link";

const funnelWords = [
  "Awareness",
  "Consideration",
  "Ad creative",
  "Conversion",
  "Always-on",
];

const models = [
  {
    stage: "Awareness",
    n: "01",
    name: "CPV Campaign",
    detail:
      "Brands pay per verified view. Any eligible creator joins instantly — an open pool, not a hand-picked few.",
    accent: "#E8A63D",
  },
  {
    stage: "Consideration",
    n: "02",
    name: "Participation Campaign",
    detail:
      "A fixed payout per post, gated by eligibility, verified against the brief before payment clears.",
    accent: "#1F8A79",
  },
  {
    stage: "Ad creative",
    n: "03",
    name: "One-Time Campaign",
    detail:
      "Creators deliver content brands own outright — for their own ads, not a public post.",
    accent: "#8B5E8A",
  },
  {
    stage: "Conversion",
    n: "04",
    name: "Sales Campaign",
    detail:
      "One shared link. A guaranteed floor per creator, plus a bonus pool that scales with real, tracked sales.",
    accent: "#2E6F9E",
  },
  {
    stage: "Always-on",
    n: "05",
    name: "Gig Marketplace",
    detail:
      "Verified creators list fixed-price services. Brands order on demand, no campaign required.",
    accent: "#B8632F",
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
    detail:
      "Triggered by an API, a verification check, or approval — never a chase.",
  },
];

export default function Home() {
  return (
    <main>
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl text-white tracking-tight">
            Fydnex
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#how-it-works" className="hover:text-white transition">
              How it works
            </a>
            <a href="#models" className="hover:text-white transition">
              Campaign types
            </a>
            <div className="relative group">
              <span className="hover:text-white transition cursor-pointer">
                Log in
              </span>
              <div className="absolute right-0 top-full pt-3 hidden group-hover:block">
                <div className="bg-white rounded-lg shadow-xl py-2 w-40">
                  <Link
                    href="/brand/login"
                    className="block px-4 py-2 text-sm text-ink hover:bg-paper transition"
                  >
                    Brand login
                  </Link>
                  <Link
                    href="/creator/login"
                    className="block px-4 py-2 text-sm text-ink hover:bg-paper transition"
                  >
                    Creator login
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <Link
            href="/brand/signup"
            className="bg-amber text-ink text-sm font-medium px-4 py-2 rounded-full hover:brightness-95 transition"
          >
            Start a campaign
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-ink text-white overflow-hidden">
        {/* background depth */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-24 w-[30rem] h-[30rem] rounded-full bg-amber/20 blur-3xl" />
          <div className="absolute top-10 right-0 w-[26rem] h-[26rem] rounded-full bg-teal/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <span className="inline-block text-sm text-amber font-medium mb-6 bg-amber/10 px-3 py-1 rounded-full">
              A full-funnel campaign marketplace
            </span>
            <h1 className="font-display text-5xl md:text-[3.6rem] leading-[1.06] mb-6">
              Campaigns, not
              <br />
              cold outreach.
            </h1>
            <p className="text-white/70 text-lg max-w-lg mb-10 leading-relaxed">
              Fydnex is where brands fund structured campaigns and creators
              join under fixed rules. Every dollar sits in escrow until the
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
            <div className="relative bg-white text-ink rounded-2xl p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rotate-[1.5deg]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-muted uppercase tracking-wide">
                  CPV Campaign
                </span>
                <span className="text-xs bg-teal/10 text-teal px-2 py-1 rounded-full font-medium">
                  Live
                </span>
              </div>
              <p className="font-display text-2xl mb-1">Launch Campaign</p>
              <p className="text-muted text-sm mb-6">
                Multi-market &middot; Food &amp; lifestyle creators
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
                  <p className="text-2xl font-display">$25,000</p>
                  <p className="text-xs text-muted">Escrowed budget</p>
                </div>
                <div>
                  <p className="text-2xl font-display">$0.02</p>
                  <p className="text-xs text-muted">Per verified view</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* marquee strip — one deliberate motion moment */}
        <div className="relative border-t border-white/10 bg-inksoft/60 py-4 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...funnelWords, ...funnelWords, ...funnelWords, ...funnelWords].map(
              (w, i) => (
                <span
                  key={i}
                  className="mx-6 text-sm text-white/50 flex items-center gap-6"
                >
                  {w}
                  <span className="text-amber/60">&bull;</span>
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-display text-6xl text-amber mb-4">01</p>
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
            <p className="font-display text-6xl text-teal mb-4">02</p>
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
      <section
        id="how-it-works"
        className="bg-white border-y border-ink/10"
      >
        <div className="max-w-6xl mx-auto px-6 py-28">
          <h2 className="font-display text-3xl mb-14 max-w-lg">
            One structure, every campaign.
          </h2>
          <div className="relative grid md:grid-cols-4 gap-10">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-ink/10" />
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="w-12 h-12 rounded-full bg-ink text-white flex items-center justify-center font-display text-lg mb-6 relative z-10">
                  {s.n}
                </div>
                <h3 className="font-medium text-lg mb-2">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIVE MODELS — die-cut ticket cards */}
      <section id="models" className="max-w-6xl mx-auto px-6 py-28">
        <h2 className="font-display text-3xl mb-3 max-w-lg">
          Five campaign types. One funnel.
        </h2>
        <p className="text-muted mb-14 max-w-lg">
          Brands move through the funnel without leaving the platform —
          awareness, trust, conversion, and everything in between.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {models.map((m) => (
            <div
              key={m.name}
              className="relative bg-white rounded-2xl overflow-hidden border border-ink/10"
            >
              <div
                className="h-1.5"
                style={{ backgroundColor: m.accent }}
              />
              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-muted">
                    {m.stage}
                  </span>
                  <span
                    className="font-display text-2xl"
                    style={{ color: m.accent }}
                  >
                    {m.n}
                  </span>
                </div>
                <p className="font-display text-xl mb-2">{m.name}</p>
                <p className="text-muted text-sm leading-relaxed">
                  {m.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-10">
          <div>
            <p className="font-display text-5xl mb-2 text-amber">100%</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Of campaign budgets held in escrow before a creator ever
              starts work.
            </p>
          </div>
          <div>
            <p className="font-display text-5xl mb-2 text-amber">0</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Manual matchmaking. No browsing profiles, no cold pitching,
              ever.
            </p>
          </div>
          <div>
            <p className="font-display text-5xl mb-2 text-amber">5</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Campaign models spanning the full funnel, from first view to
              final sale.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="max-w-6xl mx-auto px-6 py-28">
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
            <Link
              href="/brand/login"
              className="block mt-4 text-sm text-muted hover:text-ink transition"
            >
              Already have an account? Log in
            </Link>
          </div>
          <div className="relative bg-ink text-white rounded-2xl p-10 overflow-hidden">
            <div className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-amber/20 blur-3xl" />
            <div className="relative">
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
              <Link
                href="/creator/login"
                className="block mt-4 text-sm text-white/60 hover:text-white transition"
              >
                Already have an account? Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-ink/10 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
          <div>
            <span className="font-display text-xl">Fydnex</span>
            <p className="text-muted text-sm mt-3 leading-relaxed">
              A full-funnel campaign marketplace for brands and creators.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Product</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="#how-it-works" className="hover:text-ink transition">
                  How it works
                </a>
              </li>
              <li>
                <a href="#models" className="hover:text-ink transition">
                  Campaign types
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">For brands</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/brand/signup" className="hover:text-ink transition">
                  Start a campaign
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">For creators</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link
                  href="/creator/signup"
                  className="hover:text-ink transition"
                >
                  Join as a creator
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-ink/10">
          <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-muted">
            Fydnex &mdash; built for real campaigns, everywhere.
          </div>
        </div>
      </footer>
    </main>
  );
}
