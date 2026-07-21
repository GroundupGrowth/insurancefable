import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesChecklist,
  SalesCta,
} from '../../components/EbookLanding';

/* Live sales copy for /generational-transfer/ — reproduced verbatim from
   extraction/parsed/generational-transfer.json (sections 1-3; section 4 is the
   site footer, covered by PageShell). Live's hero form and the repeated form
   in the final CTA are covered by the opt-in form card at the top of
   EbookLanding; CTA buttons anchor to it.

   Note: live's author photo in section 2 (Steve-Gibbs-Esq-Founder-CEO_bg.webp)
   is not localized under public/wp-content/uploads/; the local steve-3.webp
   portrait stands in — swap once the original is downloaded. */

const UPLOADS = '/wp-content/uploads';

export default function SalesSections() {
  return (
    <>
      {/* Live section 1 (hero copy below the title/byline). */}
      <SalesSection tone="navy">
        <p className="text-white/60 text-sm mb-3">By Steven Gibbs, JD, AEP&reg;</p>
        <SalesHeading light>The Achiever&rsquo;s Blind Spot</SalesHeading>
        <SalesProse light>
          <p>
            You spent decades on offense. Building. Risking. Winning. And you left your defense to
            a stack of documents in a drawer.
          </p>
          <p>
            My name is Steven Gibbs. After nearly two decades as an estate planning attorney,
            I&rsquo;ve sat across the table from thousands of families and watched the same pattern
            destroy wealth that took a lifetime to build: exposed assets, no succession plan, no
            liquidity at death, and heirs who weren&rsquo;t ready for what they were about to
            receive.
          </p>
          <p>
            70% of wealthy families lose everything by the second generation. Fewer than 3% of
            those failures are caused by bad documents. The rest is broken communication,
            unprepared heirs, and financial tools that were designed for consumption &mdash; not
            transfer.
          </p>
        </SalesProse>
      </SalesSection>

      {/* Live section 2 */}
      <SalesSection>
        <p className="text-[#0D1B3D]/60 text-sm tracking-wide mb-6">
          <strong>DOWNLOADED BY THOUSANDS OF ENTREPRENEURS, INVESTORS &amp; PROFESSIONALS</strong>
        </p>
        <SalesSubheading>
          This book is the guide I wish every client had read before they walked into my office.
          This is 20+ years of working with families distilled down into an easy to read guide.
        </SalesSubheading>

        <SalesSubheading>Inside This FREE Guide, You&rsquo;ll Discover:</SalesSubheading>
        <SalesProse>
          <p>
            &#10003; <strong>Chapter 1: Risk in a Litigious Society</strong> &mdash; Why the moment
            you succeed, you become a target &mdash; and the legal minefields most achievers never
            see coming
          </p>
          <p>
            &#10003; <strong>Chapter 2: Tactics for Protecting Assets</strong> &mdash; From LLCs
            and irrevocable trusts to marital agreements and offshore structures &mdash; and why
            timing determines whether any of it holds up in court
          </p>
          <p>
            &#10003; <strong>Chapter 3: Estate Planning Essentials</strong> &mdash; The documents
            your family cannot function without, why DIY plans produce the same chaos as no plan at
            all, and how to avoid the probate trap
          </p>
          <p>
            &#10003; <strong>Chapter 4: The Power of Life Insurance</strong> &mdash; What the
            largest banks in America know about whole life insurance that the retail financial
            industry will never tell you
          </p>
          <p>
            &#10003; <strong>Chapter 5: Wealth Transfer &mdash; The Missing Piece</strong> &mdash;
            Why most estate plans address where the money goes but ignore whether your family can
            survive receiving it. The <strong>10 Questions</strong> every family should answer
            before drafting a single document.
          </p>
        </SalesProse>
      </SalesSection>

      {/* Live section 2 (continued): Steve's story. */}
      <SalesSection tone="tint">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={`${UPLOADS}/steve-3.webp`}
            alt="Steve Gibbs Esq Founder Ceo Bg"
            className="w-32 h-32 rounded-2xl object-cover shrink-0"
          />
          <SalesProse>
            <p>I&rsquo;m Steven Gibbs, but most people just call me Steve&hellip;</p>
            <p>
              I grew up in a fairly normal, middle class family and yet rose through the ranks to
              work with some of the wealthiest Americans as a trusts and estates attorney.
            </p>
            <p>
              I needed to write this book and coined the term &ldquo;Self Banking Blueprint&rdquo;
              to introduce mainstream Americans to a long standing and yet little known approach to
              better protect, build and use money.
            </p>
            <p>
              I literally stumbled upon this approach which I call &ldquo;SBB&rdquo; for short,
              when a colleague randomly decided to mention it to me at a seminar that I was
              hosting.
            </p>
            <p>
              <b>
                That chance discovery eventually transformed my financial life and has since
                impacted the lives of so many of my clients.
              </b>
            </p>
            <p>
              What I discovered was a time tested, financial approach that has been utilized by the
              wealthiest Americans for decades &ndash; a little known way (though commonly
              understood in their circles) to protect money and use it more effectively.
            </p>
            <p>
              I learned that these advantages can be accessed by average earners (and everyone in
              between) to reverse money stagnation and gain powerful financial momentum.
            </p>
            <p>
              So I invite you to come on a short journey with me into the Self Banking Blueprint
              and consider a new way of thinking about money and wealth.
            </p>
          </SalesProse>
        </div>

        <SalesSubheading>The 4 Core Benefits You&rsquo;ll Gain:</SalesSubheading>
        <SalesProse>
          <p>
            &#10003; Predictable, Tax-Free Growth: Watch your money grow steadily without taxes
            eating away at your wealth
          </p>
          <p>
            &#10003; Unparalleled Money Momentum: Experience true, continuous compound growth that
            traditional methods can&rsquo;t match
          </p>
          <p>
            &#10003; Liquid Cash On Demand: Access your money while it continues working hard for
            you
          </p>
          <p>
            &#10003; Rock-Solid Foundation: Build the cornerstone asset that fuels all your other
            investments
          </p>
        </SalesProse>

        <SalesSubheading>Inside The Self Banking Blueprint, You&rsquo;ll Discover:</SalesSubheading>
        <SalesChecklist
          items={[
            <>The exact strategies America&rsquo;s wealthy use to protect and grow their wealth</>,
            <>A step-by-step implementation guide, regardless of your current income</>,
            <>Real case studies showing this system in action</>,
            <>How to avoid the common mistakes most people make with their money</>,
          ]}
        />
        <SalesProse>
          <p>
            And within these pages, you&rsquo;ll find my detailed personal story. You&rsquo;ll
            learn more about my discovery process and see why this approach resonated with me as a
            legal and financial expert.
          </p>
          <p>
            I&rsquo;m confident you&rsquo;ll enjoy hearing more about this from a unique
            &ldquo;legal professional&rsquo;s&rdquo; perspective.
          </p>
          <p>
            And I hope this will be a first step to inspire you on an amazing new wealth building
            journey that can truly change your life.
          </p>
          <p>
            <strong>TRUSTED BY THOUSANDS:</strong> Join the thousands of entrepreneurs, investors,
            and professionals have already downloaded The Self Banking Blueprint to transform their
            financial future. Download your copy today!
          </p>
        </SalesProse>
      </SalesSection>

      {/* Live section 3 (final CTA) */}
      <SalesSection tone="navy">
        <div className="flex flex-col items-center text-center">
          <img
            src={`${UPLOADS}/The-Self-Banking-Blueprint-2020-Cover-Update-V3-128x200.jpg`}
            alt="The Self Banking Blueprint 2020 Cover Update V3"
            className="w-32 h-auto rounded-sm shadow-[0_16px_40px_rgba(0,0,0,0.35)] mb-6"
          />
          <p className="text-white/60 text-sm mb-3">The Ultimate Free Download</p>
          <p
            className="text-white text-3xl md:text-5xl font-medium leading-tight mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Get Access Now
          </p>
          <p className="text-white/70 leading-relaxed max-w-xl mb-8">
            Join the thousands of readers who have already transformed their approach to wealth
            protection. Grab your free copy today!
          </p>
          <SalesCta light>Get Access Now</SalesCta>
        </div>
      </SalesSection>
    </>
  );
}
