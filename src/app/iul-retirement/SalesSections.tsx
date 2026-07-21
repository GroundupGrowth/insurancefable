import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesQuote,
  SalesCta,
} from '../../components/EbookLanding';

/* Live sales copy for /iul-retirement/ — reproduced verbatim from
   extraction/parsed/iul-retirement.json (sections 1-3; the LeadConnector
   opt-in form is covered by EbookLanding's form card, the footer by
   PageShell). Heading/bullet structure follows the live screenshot
   (extraction/screens/src/iul-retirement.jpeg). */

const UPLOADS = '/wp-content/uploads';

export default function SalesSections() {
  return (
    <>
      {/* Live hero copy (section 1) — the copy around live's form. */}
      <SalesSection tone="navy">
        <p className="text-white/60 text-sm tracking-wide mb-2">
          By Jason Herring; Steven Gibbs, JD, AEP&reg;; and Jason Kenyon, Esq.
        </p>
        <p className="text-white/60 text-sm tracking-wide mb-6">
          DOWNLOADED BY THOUSANDS OF ENTREPRENEURS, INVESTORS &amp; PROFESSIONALS
        </p>
        <p
          className="text-white text-2xl md:text-4xl font-medium leading-tight max-w-4xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          You&rsquo;ve outgrown the &quot;Honda Civic&quot; of financial tools. It is time for a
          sophisticated strategy designed for sophisticated wealth builders.
        </p>
        <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-3xl mt-6">
          The High Earner&rsquo;s Guide to Tax Free Retirement Income Without Limits
        </p>
        <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-3xl mt-4">
          Are you a high-income professional earning $150,000 or more annually? If so, you have
          likely realized that traditional retirement advice&mdash;maxing out your 401(k) and
          hoping for the best&mdash;simply doesn&rsquo;t work for you anymore.
        </p>
      </SalesSection>

      {/* Live section 2: the sales body. */}
      <SalesSection>
        <SalesHeading>The High-Earner&rsquo;s Dilemma: Trapped by Traditional Tools</SalesHeading>
        <SalesProse>
          <p>
            Traditional retirement accounts like 401(k)s and Roth IRAs were built in the 1970s for
            middle-income workers, not for high-income entrepreneurs and professionals. As a
            result, you face <b>four major traps</b>:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <b>Contribution Limits:</b> You are restricted to saving just $23,500 per year (for
              2025) in a 401(k), even if you have the capacity to save much more.
            </li>
            <li>
              <b>Income Restrictions:</b> If you earn over $161,000 (single), the government
              effectively locks you out of tax-free Roth IRA growth.
            </li>
            <li>
              <b>Access Restrictions:</b> Touching your 401(k) before age 59.5 triggers a 10%
              penalty plus ordinary income taxes, potentially costing you 40-50% of your
              withdrawal.
            </li>
            <li>
              <b>Required Minimum Distributions (RMDs):</b> Starting at age 73, the IRS forces you
              to withdraw money and pay taxes on their schedule, not yours.
            </li>
          </ul>
        </SalesProse>

        <SalesSubheading>The Solution: Indexed Universal Life (IUL)</SalesSubheading>
        <SalesProse>
          <p>
            Indexed Universal Life insurance is a powerful financial tool that provides a
            self-directed retirement strategy you control. When structured correctly by
            specialists, it addresses every limitation of traditional accounts:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <b>No Contribution Limits:</b> Save as much as you want without hitting artificial
              caps.
            </li>
            <li>
              <b>No Income Restrictions:</b> Access tax-advantaged growth regardless of how much
              you earn.
            </li>
            <li>
              <b>Market Participation with a 0% Floor:</b> Participate in market gains (linked to
              indexes like the S&amp;P 500) while enjoying a 0% floor that protects you from ever
              losing principal due to market crashes.
            </li>
            <li>
              <b>Tax-Free Retirement Income:</b> Access your cash value through policy loans that
              are not taxable events under current law.
            </li>
            <li>
              <b>No RMDs:</b> You decide the timing and amount of your distributions.
            </li>
          </ul>
        </SalesProse>

        <SalesSubheading>
          The &ldquo;Anti-Agent&rdquo; Design: Maximizing Your Wealth, Not Commissions
        </SalesSubheading>
        <SalesProse>
          <p>
            The reason most financial advisors don&rsquo;t mention IUL is either a training gap or
            a lack of financial incentive, as these assets don&rsquo;t fit the &ldquo;Assets Under
            Management&rdquo; fee model. Furthermore, most agents design policies to maximize their
            commissions by selling the largest death benefit possible.
          </p>
          <p>
            <b>We do the opposite.</b> At Insurance &amp; Estate Strategies, we use the{' '}
            <b>Minimum Death Benefit Principle</b> (solving for the IRS &ldquo;corridor&rdquo;).
            This approach:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Minimizes internal insurance costs.</li>
            <li>Maximizes your cash value allocation.</li>
            <li>
              Can result in <b>$150,000 to $250,000+</b> more in wealth over 30 years compared to
              standard designs.
            </li>
          </ul>
        </SalesProse>

        <SalesSubheading>Is This Strategy Right for You?</SalesSubheading>
        <SalesProse>
          <p>
            IUL is a sophisticated tool, but it isn&rsquo;t for everyone. You are an ideal
            candidate if:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You earn <b>$150,000+</b> and have maxed out traditional retirement accounts.</li>
            <li>You can commit <b>$20,000+</b> annually for at least 7&ndash;10 years.</li>
            <li>
              You value <b>downside protection</b> and <b>tax diversification</b> over chasing
              maximum risky returns.
            </li>
            <li>
              You understand the <b>3&ndash;4 year build-up period</b> before significant cash
              value becomes accessible.
            </li>
          </ul>
        </SalesProse>

        <SalesSubheading>Take the Next Step with Estate Planning Attorneys</SalesSubheading>
        <SalesProse>
          <p>
            Don&rsquo;t settle for generic advice designed for the average earner. Work with a team
            of specialists who practice what they teach.
          </p>
        </SalesProse>
      </SalesSection>

      {/* Live section 2 (continued): social proof card. */}
      <SalesSection tone="navy">
        <SalesHeading light>Join 10,000+ Who&rsquo;ve Downloaded Our Guides</SalesHeading>
        <SalesProse light>
          <p>
            <span aria-hidden="true">&#11088;&#11088;&#11088;&#11088;&#11088;</span>{' '}
            <strong>270+ Five-Star Reviews on Trustpilot</strong>
          </p>
        </SalesProse>
        <div className="space-y-6 mt-6">
          <SalesQuote light>
            &ldquo;Education is key&mdash;I&amp;E delivered exactly that. I&rsquo;m excited about
            actively building a plan to secure my financial future and that of my family.&rdquo;
            &mdash; El G.
          </SalesQuote>
          <SalesQuote light>
            &ldquo;After 10 months with other agents, I&amp;E made it simple. The whole thing
            became simple.&rdquo; &mdash; Janine
          </SalesQuote>
          <SalesQuote light>
            &ldquo;No pressure, just education and transparency. They never applied
            pressure.&rdquo; &mdash; Peter Z.
          </SalesQuote>
          <SalesQuote light>
            &ldquo;I wish I knew them 20 years ago.&rdquo; &mdash; Verified Client
          </SalesQuote>
        </div>
      </SalesSection>

      {/* Live section 2 (continued): about the authors. */}
      <SalesSection tone="tint">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={`${UPLOADS}/steve-and-jason-300x140.webp`}
            alt="Steve And Jason"
            className="w-64 h-auto rounded-2xl object-cover shrink-0"
          />
          <div>
            <SalesSubheading>About Jason Kenyon, Esq. &amp; Steve Gibbs, Esq.</SalesSubheading>
            <SalesProse>
              <p>
                Estate planning attorneys who discovered this strategy solving real client
                problems.
              </p>
              <p>
                We founded Insurance &amp; Estate Strategies in 2018 with one mission: show
                families how to implement the same strategies banks and wealthy families use.
              </p>
              <p>270+ five-star reviews. 10,000+ downloads. Zero pressure.</p>
            </SalesProse>
          </div>
        </div>
      </SalesSection>

      {/* Live section 3: final CTA (live repeats the opt-in form here; the CTA
          anchors back up to the form card instead). */}
      <SalesSection tone="navy">
        <div className="flex flex-col items-center text-center">
          <img
            src={`${UPLOADS}/The-Self-Banking-Blueprint-2020-Cover-Update-V3-128x200.jpg`}
            alt="The Self Banking Blueprint 2020 Cover Update V3"
            className="w-32 h-auto rounded-sm shadow-[0_16px_40px_rgba(0,0,0,0.35)] mb-6"
          />
          <p className="text-white/60 text-sm mb-3">The Ultimate Free Download</p>
          <p
            className="text-white text-3xl md:text-5xl font-medium leading-tight mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            Get Access Now
          </p>
          <p className="text-white/60 leading-relaxed max-w-2xl mb-8">
            Join the thousands of readers who have already transformed their approach to wealth
            protection. Grab your free copy today!
          </p>
          <SalesCta light>Get Access Now</SalesCta>
        </div>
      </SalesSection>
    </>
  );
}
