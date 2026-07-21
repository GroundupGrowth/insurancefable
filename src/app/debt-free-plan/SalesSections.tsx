import { ArrowLeft } from 'lucide-react';
import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesChecklist,
  SalesQuote,
  SalesCta,
} from '../../components/EbookLanding';

/* Live sales copy for /debt-free-plan/ — reproduced verbatim from
   extraction/parsed/debt-free-plan.json (sections 1-3; the LeadConnector
   opt-in form is covered by EbookLanding's form card, and the footer by
   PageShell). Live's "BOOK A STRATEGY CALL" button hotlinks the GHL booking
   widget — kept as an external link (new tab). */

const UPLOADS = '/wp-content/uploads';

export default function SalesSections() {
  return (
    <>
      {/* Live hero copy (section 1) — the copy around live's form. */}
      <SalesSection tone="navy">
        <p className="text-white/60 text-sm tracking-wide mb-2">
          By Denise Boisvert and Steven Gibbs, JD, AEP&reg;
        </p>
        <p className="text-white/60 text-sm tracking-wide mb-6">
          DOWNLOADED BY THOUSANDS OF ENTREPRENEURS, INVESTORS &amp; PROFESSIONALS
        </p>
        <p
          className="text-white text-2xl md:text-4xl font-medium leading-tight max-w-4xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          You Don&rsquo;t Have to Wait Until the Debt Is Gone to Start Building Wealth
        </p>
        <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-3xl mt-6">
          How to Eliminate Debt and Build Wealth at the Same Time.
        </p>
        <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-3xl mt-4">
          The money you&rsquo;re already spending on debt payments could be building your future at
          the same time. Most people never find out, because nobody shows them how.
        </p>
      </SalesSection>

      {/* Live section 2: the sales body. */}
      <SalesSection>
        <SalesHeading>
          The Advice You&rsquo;ve Been Following Is Costing You More Than You Know
        </SalesHeading>
        <SalesProse>
          <p>Pay off debt first. Invest later.</p>
          <p>
            It sounds responsible. But every month you follow that sequence, compound interest is
            working against you on one side of your balance sheet, and building nothing on the
            other.
          </p>
          <p>
            You&rsquo;re not behind because you lack discipline. You&rsquo;re behind because
            you&rsquo;re using a system designed to keep your money flowing toward banks, not
            toward you.
          </p>
          <p>There is a better system.</p>
        </SalesProse>

        <SalesSubheading>
          What If the Same Payment That&rsquo;s Keeping You in Debt Could Get You Out &mdash; and
          Build Wealth at the Same Time?
        </SalesSubheading>
        <SalesProse>
          <p>
            It can. That&rsquo;s exactly what the Purpose Driven Wealth Plan&trade; does.
          </p>
          <p>
            Real clients have used this strategy to eliminate six-figure credit card debt, pay off
            their homes years ahead of schedule, and put policies in place during that same window
            that compound into hundreds of thousands of dollars in tax-advantaged wealth by
            retirement.
          </p>
          <p>
            They did it without earning more, without cutting their lifestyle, and without waiting
            until the debt was gone to start. The same money already leaving their accounts started
            building a system that worked for them instead of against them.
          </p>
        </SalesProse>

        <SalesSubheading>The Different Zero</SalesSubheading>
        <SalesProse>
          <p>When the debt is gone, most people arrive at zero. But not all zeros are equal.</p>
          <p>
            One person pays off $30,000 in credit card debt the conventional way. They arrive at
            zero, and now they have to start building.
          </p>
          <p>
            Another person follows the Purpose Driven Wealth Plan&trade;. They arrive at zero in
            the same timeframe, with a seasoned whole life policy that has been compounding for
            four years, a leveraged death benefit protecting their family from day one, and a
            system that is already built and ready to accelerate.
          </p>
          <p>Same debt. Same timeline. Completely different destination.</p>
          <p>This free ebook shows you how to build the second zero.</p>
        </SalesProse>

        <SalesSubheading>Inside the Free Ebook You Will Discover</SalesSubheading>
        <SalesChecklist
          items={[
            <>
              Why the &ldquo;pay off debt first&rdquo; sequence keeps money flowing toward banks
              and away from you, and how to flip it
            </>,
            <>
              The three-step Redirect, Repay, Reuse strategy that stops compounding interest
              permanently, one balance at a time
            </>,
            <>
              How Jeff and Lisa eliminated $30,000 in credit card debt in four years and built a
              banking system that compounds for the rest of their lives
            </>,
            <>
              Why two people can pay off the same debt in the same timeframe and arrive at
              completely different financial destinations
            </>,
            <>
              What a properly structured whole life policy actually does, and why most agents never
              build one this way
            </>,
          ]}
        />

        <SalesSubheading>Presented By</SalesSubheading>
        <SalesProse>
          <p>
            <b>Denise Boisvert</b> &mdash; Licensed insurance professional and debt elimination
            strategist. Author of <em>Designing a Debt-Free Life with the Purpose Driven Wealth
            Plan&trade;</em>. 20+ years designing high cash value whole life policies for clients
            across all 50 states.
          </p>
          <p>
            <b>Steve Gibbs, Esq. AEP&reg;</b> &mdash; Co-Founder of Insurance &amp; Estates. Estate
            planning attorney with the Accredited Estate Planner designation. The legal
            architecture behind the plan.
          </p>
        </SalesProse>

        <SalesSubheading>What Readers Are Saying</SalesSubheading>
        <div className="space-y-6">
          <SalesQuote>
            &ldquo;I had a light bulb moment &mdash; using my high cash value insurance policy was
            actually a lower interest rate than my HELOC, and I could build wealth at the same
            time. This book is spot on and needed for every household in America.&rdquo; &mdash;
            Tyler A.
          </SalesQuote>
          <SalesQuote>
            &ldquo;I was tired of feeling buried by credit cards and worried about my mortgage. For
            the first time, I feel like I actually have a plan to not only pay off debt but also
            start building real long-term security.&rdquo; &mdash; Jacque P.
          </SalesQuote>
          <SalesQuote>
            &ldquo;Who knew you could become your own banker? You pay premiums in &mdash; which is
            like paying yourself. Then later you borrow from that account. You don&rsquo;t pay high
            interest. You pay yourself. I wish I understood this before now.&rdquo; &mdash; Marie
            R.
          </SalesQuote>
          <SalesQuote>
            &ldquo;Wow &mdash; it really made me rethink everything I knew about money. I loved the
            part about paying off credit card debt with that &lsquo;Redirect, Repay, Reuse&rsquo;
            strategy &mdash; actually feels doable. It&rsquo;s the first time I feel like I
            actually get it.&rdquo; &mdash; Sunghwan N.
          </SalesQuote>
        </div>

        <SalesSubheading>Ready to See Your Own Numbers?</SalesSubheading>
        <SalesProse>
          <p>
            A free strategy call with Denise is not a sales call. You bring your situation. She
            brings twenty years of experience and a policy illustration built around your specific
            numbers. You leave knowing exactly what this looks like for your life, your debt, your
            income, your timeline, your goals.
          </p>
          <p>No pressure. No obligation. Just clarity.</p>
        </SalesProse>
        <div className="mt-8">
          {/* Live's GHL booking link — external, new tab (SalesCta is same-tab). */}
          <a
            href="https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/deniseboisvert"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-medium pl-8 pr-2 py-2 rounded-full transition-colors duration-200 bg-[#0D1B3D] text-white hover:bg-[#1C2E55]"
          >
            BOOK A STRATEGY CALL WITH DENISE
            <span className="rounded-full p-2 bg-white">
              <ArrowLeft className="w-5 h-5 rotate-180 text-[#0D1B3D]" />
            </span>
          </a>
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
