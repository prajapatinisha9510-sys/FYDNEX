import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-ink border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-lg text-white">
            Fydnex
          </Link>
          <Link
            href="/"
            className="text-sm text-white/70 hover:text-white transition"
          >
            Back to home
          </Link>
        </div>
      </header>

      <div className="px-6 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 md:p-12">
          <h1 className="font-display text-3xl mb-2">Privacy Policy</h1>
          <p className="text-muted text-sm mb-10">
            Last updated: October 2026
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-ink/90">
            <section>
              <h2 className="font-display text-xl mb-2">1. Who we are</h2>
              <p>
                Fydnex (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
                operates a campaign marketplace connecting brands and
                creators. This policy explains what data we collect, why we
                collect it, and how it is used and protected.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-2">
                2. Information we collect
              </h2>
              <p className="mb-2">
                <strong>Account information:</strong> name and email
                address for all users; for creators, also niche, primary
                platform, and follower count, all provided directly by you
                at signup.
              </p>
              <p className="mb-2">
                <strong>Connected platform data:</strong> if you choose to
                connect your YouTube or Instagram account, we request
                read-only access to view counts and basic post/video
                statistics, limited to content you have submitted to an
                active campaign. We do not request or access private
                messages, contact lists, or content outside an active
                campaign.
              </p>
              <p>
                <strong>Campaign activity:</strong> campaigns you create or
                join, content links you submit, and associated payout
                records.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-2">
                3. How we use this information
              </h2>
              <p>
                Connected platform data is used solely to verify view
                counts for campaigns you have voluntarily joined, in order
                to calculate and release the payout owed to you. Account
                information is used to operate your account, match
                creators with eligible campaigns, and facilitate payment
                between brands and creators.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-2">
                4. Data sharing
              </h2>
              <p>
                We do not sell personal data. Aggregated, non-identifying
                campaign performance data (for example, total verified
                views on a campaign) may be visible to the brand running
                that campaign. Connected-account access tokens are never
                shared with any third party, including the brand.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-2">
                5. Data retention and disconnection
              </h2>
              <p>
                You may disconnect your YouTube or Instagram account at any
                time from your dashboard, which revokes our access to that
                account going forward. You may request deletion of your
                account and associated data at any time by contacting us
                using the details below; we will action such requests
                within a reasonable timeframe.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-2">6. Cookies</h2>
              <p>
                Fydnex uses only the cookies necessary to keep you signed
                in securely. We do not use advertising or tracking cookies.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-2">
                7. Children&apos;s privacy
              </h2>
              <p>
                Fydnex is not directed at and does not knowingly collect
                data from individuals under the age required by applicable
                law to independently enter into this kind of agreement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-2">8. Security</h2>
              <p>
                Account data is stored with a managed database provider
                using row-level access controls, so that each user can
                only access their own records. Connected-account tokens are
                stored server-side and are never exposed to the browser or
                other users.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-2">
                9. Changes to this policy
              </h2>
              <p>
                We may update this policy as Fydnex evolves. Material
                changes will be reflected by updating the date at the top
                of this page.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-2">10. Contact</h2>
              <p>
                Questions about this policy or your data can be sent to{" "}
                <a
                  href="mailto:prajapatianil9735@gmail.com"
                  className="text-amber font-medium"
                >
                  prajapatianil9735@gmail.com
                </a>{" "}
                or by phone at{" "}
                <a
                  href="tel:+917984266725"
                  className="text-amber font-medium"
                >
                  +91 79842 66725
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
