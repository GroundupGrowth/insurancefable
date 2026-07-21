import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesChecklist,
  SalesQuote,
  SalesCta,
} from '../../components/EbookLanding';

/* Live sales copy for /kingdom-money/ — reproduced verbatim from
   extraction/parsed/kingdom-money.json (sections 2-5; section 1 is the hero +
   form, covered by EbookLanding's hero block, and section 6 is the site
   footer, covered by PageShell). Presented in the site's design language. */

export default function SalesSections() {
  return (
    <>
      {/* Live hero headline (section 1) — the copy above live's form. */}
      <SalesSection tone="navy">
        <p
          className="text-white text-2xl md:text-4xl font-medium leading-tight max-w-4xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          You Did Everything Right. So Why Does the Math Still Not Work?
        </p>
        <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-3xl mt-6">
          What wealthy families have quietly done for 100 years &mdash; and why your advisor
          never mentioned it.
        </p>
      </SalesSection>

      {/* Live section 2 */}
      <SalesSection>
        <SalesHeading>The Uncomfortable Truth About &ldquo;Doing Everything Right&rdquo;</SalesHeading>
        <SalesProse>
          <p>
            You got out of debt. You maxed out your 401(k). You followed the Baby Steps. You lived
            below your means for decades. And yet&hellip;
          </p>
        </SalesProse>
        <SalesChecklist
          items={[
            <>You sense something is off, but you can&rsquo;t name it</>,
            <>The retirement calculators keep moving the finish line</>,
            <>Your &ldquo;magic number&rdquo; gets bigger every time you check</>,
            <>You&rsquo;re not sure there will be anything left for your kids&mdash;let alone your grandchildren</>,
          ]}
        />
        <SalesProse>
          <p>There&rsquo;s a word for this feeling. It&rsquo;s not anxiety. It&rsquo;s not fear.</p>
          <p>It&rsquo;s betrayal.</p>
          <p>You kept your end of the deal. The system didn&rsquo;t keep its.</p>
          <p>
            73% of Americans die with debt&mdash;not because they were reckless, but because the
            system was never designed to produce what Scripture describes.
          </p>
        </SalesProse>
      </SalesSection>

      {/* Live section 3 */}
      <SalesSection>
        <SalesHeading>The Problem Isn&rsquo;t You. It&rsquo;s the System.</SalesHeading>
        <SalesProse>
          <p>
            <em>Proverbs 13:22 says a good man leaves an inheritance to his children&rsquo;s children.</em>
          </p>
          <p>
            Not a wealthy man. Not a lucky man. A <i>good</i> man.
          </p>
          <p>
            But here&rsquo;s what no one tells you: 401(k)s, IRAs, and conventional retirement
            accounts were designed for single-generation consumption. They&rsquo;re structurally
            incapable of producing multi-generational transfer.
          </p>
          <p>You can&rsquo;t build generational infrastructure using tools designed for lifetime depletion.</p>
          <p>
            <b>Kingdom Money</b> exposes why the system fails&mdash;and reveals what banks,
            corporations, and wealthy families have used for over a century to build what Scripture
            actually describes.
          </p>
        </SalesProse>

        <SalesSubheading>You&rsquo;ll Discover:</SalesSubheading>
        <SalesChecklist
          items={[
            <>
              <b>Why the &lsquo;magic number&rsquo; keeps moving </b>&mdash; and the mathematical
              trap hidden inside every retirement calculator
            </>,
            <>
              <b>The 3 characteristics every wealth transfer requires</b>&mdash;and why your 401(k){' '}
              <i>salary reduction plan</i> has none of them
            </>,
            <>
              <b>What banks hold $200+ billion of</b> &mdash; the same asset class they tell you to
              avoid
            </>,
            <>
              <b>How to reconcile Matthew 6 and Proverbs 13:22</b> &mdash; building wealth without
              hoarding anxiously
            </>,
          ]}
        />
        <SalesProse>
          <p>
            <b>Real case studies</b> &mdash; families who eliminated debt, funded businesses, and
            transferred wealth tax-free using the same infrastructure
          </p>
        </SalesProse>

        <SalesSubheading>What Readers Are Saying</SalesSubheading>
        <div className="space-y-6">
          <SalesQuote>
            &ldquo;My only regret is not knowing about this years ago. We&rsquo;re already
            establishing policies for our children so they don&rsquo;t have the same regret.&rdquo;
            &mdash; Cynthia
          </SalesQuote>
          <SalesQuote>
            &ldquo;Being able to be my own bank, led by the Holy Ghost and the integrity of
            God&rsquo;s Word&mdash;this has enabled me to advance His Kingdom on earth.&rdquo;
            &mdash; Jenkins J.
          </SalesQuote>
          <SalesQuote>
            &ldquo;Best decision ever. I was able to bypass the bank because of our policies, and
            paid the loan back from the rental income that was created. I wish I had known about
            this tool when I was 26 instead of 56.&rdquo; &mdash; Tony D.
          </SalesQuote>
        </div>
      </SalesSection>

      {/* Live section 4 */}
      <SalesSection tone="navy">
        <SalesHeading light>
          Your Children&rsquo;s Children Are Counting on Decisions You Make Today
        </SalesHeading>
        <SalesProse light>
          <p>
            <em>Proverbs 13:22 doesn&rsquo;t say &ldquo;a good man hopes to leave an inheritance.&rdquo;</em>
          </p>
          <p>
            It says a good man <i>leaves</i> one.
          </p>
          <p>
            That requires structure. Infrastructure. A system designed for the outcome Scripture
            describes.
          </p>
          <p>
            <b>Kingdom Money</b> shows you what that system looks like&mdash;and how families just
            like yours are already building it.
          </p>
          <p>
            A year from now, you&rsquo;ll either be watching the same calculators &mdash; or
            building something they can&rsquo;t calculate.
          </p>
          <p>You did everything right. Now do the one thing no one told you about.</p>
        </SalesProse>
        <div className="mt-8">
          <SalesCta light>Download Kingdom Money Free</SalesCta>
        </div>
        <SalesProse light>
          <p className="mt-6">&#9989; No credit card required. Instant access.</p>
          <p>
            <strong>
              Kingdom Money is the first step. For families ready to implement, the Self-Banking
              Blueprint shows you exactly how.
            </strong>
          </p>
        </SalesProse>
      </SalesSection>

      {/* Live section 5 */}
      <SalesSection tone="tint">
        <SalesSubheading>About Insurance &amp; Estate Strategies</SalesSubheading>
        <SalesProse>
          <p>
            Founded in 2018 by two estate planning attorneys who saw the gap between what
            institutions do and what families are told. We help families build financial
            infrastructure aligned with God&rsquo;s design for generational flourishing.
          </p>
          <p>
            I&amp;E was founded by top estate attorneys with one goal, namely creating the most
            complete arsenal of resources on the web and amassing a team of top professionals
            to assist you in understanding and utilizing the ultimate asset. To that end,
            I&amp;E exists to equip you with powerful strategies, utilizing properly designed
            cash value life insurance contracts, to accomplish your specific defined goals
            such as recapturing your money, gaining money momentum, pursuing intentional
            wealth building, implementing tax and retirement planning, and delivering long
            term legacy creation.
          </p>
        </SalesProse>
      </SalesSection>
    </>
  );
}
