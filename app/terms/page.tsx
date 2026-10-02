export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-paper px-6 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 md:p-12">
        <h1 className="font-display text-3xl mb-2">Terms of Service</h1>
        <p className="text-muted text-sm mb-10">Last updated: October 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-ink/90">
          <section>
            <h2 className="font-display text-xl mb-2">1. Overview</h2>
            <p>
              Fydnex is a campaign marketplace connecting brands and
              creators. By creating an account, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-2">
              2. Creator accounts and connected platforms
            </h2>
            <p>
              Creators may connect a YouTube and/or Instagram account to
              verify views on content submitted to a campaign. You
              represent that you own or are authorized to connect the
              account(s) you link, and may disconnect them at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-2">
              3. Campaigns and payouts
            </h2>
            <p>
              Brands fund campaigns in advance. Creators are paid based on
              the rules of the specific campaign they join (e.g. per
              verified view). Payout amounts are calculated from data
              obtained via the connected platform&apos;s official API.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-2">4. Acceptable use</h2>
            <p>
              You agree not to submit fraudulent view counts, misrepresent
              your account&apos;s statistics, or attempt to circumvent
              campaign eligibility rules.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-2">5. Changes</h2>
            <p>
              We may update these terms as the product evolves. Continued
              use of Fydnex after an update constitutes acceptance of the
              revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-2">6. Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
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
