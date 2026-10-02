export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-paper px-6 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 md:p-12">
        <h1 className="font-display text-3xl mb-2">Privacy Policy</h1>
        <p className="text-muted text-sm mb-10">Last updated: October 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-ink/90">
          <section>
            <h2 className="font-display text-xl mb-2">1. Who we are</h2>
            <p>
              Fydnex (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates a
              campaign marketplace connecting brands and creators. This
              policy explains what data we collect, why, and how it is
              used.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-2">
              2. Information we collect
            </h2>
            <p className="mb-2">
              <strong>Account information:</strong> name, email address, and
              (for creators) niche, platform, and follower count, provided
              directly by you at signup.
            </p>
            <p className="mb-2">
              <strong>Connected platform data:</strong> if you choose to
              connect your YouTube or Instagram account, we request
              read-only access to view counts and basic post/video
              statistics for content you submit to a campaign. We do not
              request or access private messages, personal contacts, or
              content you have not submitted to a campaign.
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
              Connected platform data is used solely to verify view counts
              for campaigns you have voluntarily joined, in order to
              calculate and release payouts owed to you. Account
              information is used to operate your account, match you with
              eligible campaigns, and facilitate payment.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-2">
              4. Data sharing
            </h2>
            <p>
              We do not sell personal data. Aggregated, non-identifying
              campaign performance data (e.g. total verified views) may be
              shown to the brand running a campaign you joined. We do not
              share your connected account&apos;s access tokens with any
              third party.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-2">
              5. Data retention and disconnection
            </h2>
            <p>
              You may disconnect your YouTube or Instagram account at any
              time, which revokes our access going forward. You may request
              deletion of your account and associated data by contacting us
              at the email below.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-2">6. Security</h2>
            <p>
              Account data is stored with a managed database provider using
              row-level access controls. Connected-account tokens are
              stored server-side and are never exposed to the browser or
              other users.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-2">7. Contact</h2>
            <p>
              Questions about this policy or your data can be sent to{" "}
              <a
                href="mailto:prajapatianil9735@gmail.com"
                className="text-amber font-medium"
              >
                prajapatianil9735@gmail.com
              </a>{" "}
              or by phone at{" "}
              <a href="tel:+917984266725" className="text-amber font-medium">
                +91 79842 66725
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
