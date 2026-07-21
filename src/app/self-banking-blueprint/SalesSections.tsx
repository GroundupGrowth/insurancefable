import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesChecklist,
  SalesQuote,
  SalesCta,
} from '../../components/EbookLanding';

/* Live sales copy for /self-banking-blueprint/ — reproduced verbatim from
   extraction/parsed/self-banking-blueprint.json (all 6 live content sections;
   the 7th is the site footer, covered by PageShell). Live's hero form and the
   repeated form in the final CTA are covered by the single opt-in form card at
   the top of EbookLanding; CTA buttons anchor to it. */

const UPLOADS = '/wp-content/uploads';

export default function SalesSections() {
  return (
    <>
      {/* Live section 1 (hero copy): headline + Steve's story. */}
      <SalesSection tone="navy">
        <p
          className="text-white text-2xl md:text-4xl font-medium leading-tight max-w-4xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          Let Me Share The Secrets of The Self Banking Blueprint
        </p>
      </SalesSection>

      <SalesSection>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={`${UPLOADS}/steve-3.webp`}
            alt="Steve"
            className="w-28 h-28 rounded-2xl object-cover shrink-0"
          />
          <div>
            <SalesSubheading>
              <em>How I Accidentally Discovered What the Wealthy Have Known for Decades</em>
            </SalesSubheading>
            <SalesProse>
              <p>I wasn&rsquo;t looking for it.</p>
              <p>
                I was hosting a financial seminar &mdash; as an estates and trusts attorney,
                I&rsquo;d built my career helping wealthy families protect what they&rsquo;d built.
                I thought I understood money.
              </p>
              <p>
                Then a colleague pulled me aside and mentioned something almost offhandedly. A
                strategy. One I&rsquo;d never encountered in law school, in practice, or in any
                conversation with any financial advisor I&rsquo;d ever worked with.
              </p>
              <p>
                <strong>
                  I went home and started digging. What I found quietly rearranged everything I
                  thought I knew.
                </strong>
              </p>
            </SalesProse>
          </div>
        </div>

        <SalesSubheading>Here&rsquo;s what stopped me cold:</SalesSubheading>
        <SalesProse>
          <p>
            This wasn&rsquo;t new. It wasn&rsquo;t a trend or a loophole. The wealthiest American
            families had been using this approach for generations &mdash; banks use a version of
            it, corporations use it, and almost nobody in the mainstream financial world talks
            about it.
          </p>
          <p>Not because it&rsquo;s illegal. Not because it&rsquo;s complicated.</p>
          <p>
            <strong>
              Because the people who benefit most from you not knowing about it are the same ones
              giving you financial advice.
            </strong>
          </p>
        </SalesProse>
      </SalesSection>

      {/* Live section 1 (below the form): welcome + what you'll learn. */}
      <SalesSection>
        <SalesHeading>Welcome to Your Financial Transformation</SalesHeading>
        <SalesProse>
          <p>
            Are you tired of the traditional system holding you back? Do you want to take control
            of your financial future? The &ldquo;Self Banking Blueprint&rdquo; by Steven J. Gibbs
            is your ultimate guide to financial freedom and empowerment.
          </p>
        </SalesProse>
        <SalesSubheading>What You Will Learn:</SalesSubheading>
        <SalesChecklist
          items={[
            <>
              <strong>Behind the Banking Curtain</strong>: Unveil the realities of the self-banking
              system and how it impacts your wealth.
            </>,
            <>
              <strong>Money Secrets of the Wealthy</strong>: Learn the strategies that the rich use
              to grow and protect their money.
            </>,
            <>
              <strong>Whole Life &ndash; The Safe Bucket Alternative</strong>: Discover the power of
              whole life insurance as a secure and profitable asset.
            </>,
            <>
              <strong>Self-Banking Policy Design</strong>: Understand how to structure your own
              self-banking system for maximum benefit.
            </>,
          ]}
        />
        <div className="mt-8">
          <SalesCta>Get You Free Copy</SalesCta>
        </div>
      </SalesSection>

      {/* Live section 2 */}
      <SalesSection>
        <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-10 items-start">
          <div className="bg-[#F5F5F5] rounded-2xl p-6 inline-flex items-center justify-center">
            <img
              src={`${UPLOADS}/Self-Banking-Blueprint-Cover-270x300.webp`}
              alt="Self Banking Blueprint Cover"
              className="max-h-64 w-auto object-contain rounded-sm shadow-[0_16px_40px_rgba(13,27,61,0.25)]"
            />
          </div>
          <div>
            <SalesSubheading>Why This Ebook?</SalesSubheading>
            <SalesProse>
              <p>
                Steve Gibbs, co-founder of Insurance and Estate Strategies LLC, brings years of
                experience in law, estate planning, and financial consultancy to provide you with
                actionable insights and proven strategies. This is not just another financial
                book&mdash;it&rsquo;s a blueprint for creating a sustainable, self-sufficient
                financial future.
              </p>
            </SalesProse>
            <SalesSubheading>Who Should Read This?</SalesSubheading>
            <SalesChecklist
              items={[
                <>
                  <strong>Aspiring Entrepreneurs</strong>: Learn how to fund your business ventures
                  without relying on traditional banks.
                </>,
                <>
                  <strong>Investors</strong>: Discover alternative asset strategies to diversify and
                  protect your portfolio.
                </>,
                <>
                  <strong>Anyone Seeking Financial Independence</strong>: Gain the knowledge and
                  tools to break free from the constraints of the traditional financial system.
                </>,
              ]}
            />
            <SalesSubheading>Benefits of Reading:</SalesSubheading>
            <ol className="list-decimal pl-5 space-y-3 max-w-3xl text-[#0D1B3D]/70 leading-relaxed [&_strong]:text-[#0D1B3D] [&_strong]:font-medium">
              <li>
                <strong>Empowerment</strong>: Take control of your financial destiny with practical
                and proven strategies.
              </li>
              <li>
                <strong>Knowledge</strong>: Understand the intricacies of the self-banking system
                and how to navigate it effectively.
              </li>
              <li>
                <strong>Security</strong>: Learn how to create a safe and profitable financial
                foundation for you and your family.
              </li>
            </ol>
          </div>
        </div>
      </SalesSection>

      {/* Live section 3 */}
      <SalesSection tone="tint">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={`${UPLOADS}/steven_gibbs-153x200.webp`}
            alt="Steven Gibbs"
            className="w-32 h-auto rounded-2xl object-cover shrink-0"
          />
          <div>
            <SalesSubheading>About the Author</SalesSubheading>
            <SalesProse>
              <p>
                Steve Gibbs is a seasoned entrepreneurial lawyer and life insurance expert. As the
                founder and CEO of Insurance and Estate Strategies LLC, Steve&rsquo;s mission is to
                educate and empower individuals to take control of their financial futures. Steve
                has helped countless individuals and families achieve financial independence
                through his practical guidance and innovative strategies.
              </p>
            </SalesProse>
          </div>
        </div>
      </SalesSection>

      {/* Live section 4 */}
      <SalesSection>
        <SalesHeading>Testimonials</SalesHeading>
        <div className="space-y-6">
          <SalesQuote>
            &quot;This ebook completely changed my perspective on money and banking. It&rsquo;s a
            must-read for anyone serious about financial independence.&quot;
            <br />- John D.
          </SalesQuote>
          <SalesQuote>
            &quot;Steve Gibbs&rsquo; insights are invaluable. The strategies outlined in this book
            have set me on the path to true financial freedom.&quot;
            <br />- Sarah M.
          </SalesQuote>
          <SalesQuote>
            &quot;The Self Banking Blueprint is a field guide for independent thinkers who want to
            take back control of their money intentionally.&quot;
            <br />- Josh G.
          </SalesQuote>
        </div>
      </SalesSection>

      {/* Live section 5 */}
      <SalesSection>
        <SalesHeading>What the Self Banking Blueprint covers:</SalesHeading>
        <SalesProse>
          <p>
            <strong>How it actually works</strong> &mdash; no jargon, no sales pitch. Just the
            mechanics, explained the way I wished someone had explained them to me.
          </p>
          <p>
            <strong>Who it&rsquo;s built for</strong> &mdash; this isn&rsquo;t exclusively for the
            wealthy. Average earners use this. The entry point is lower than you think.
          </p>
          <p>
            <strong>The legal layer nobody talks about</strong> &mdash; as an attorney, the asset
            protection dimension is what hit me hardest. It&rsquo;s built into the structure in
            ways most financial products can&rsquo;t touch.
          </p>
          <p>
            <strong>The mistakes that kill the strategy before it starts</strong> &mdash; policy
            design matters enormously. Most people who &ldquo;tried this and it didn&rsquo;t
            work&rdquo; were sold the wrong structure.
          </p>
          <p>
            <strong>Real cases</strong> &mdash; clients who implemented this and what actually
            happened over time.
          </p>
        </SalesProse>
        <SalesSubheading>Why I wrote it:</SalesSubheading>
        <SalesProse>
          <p>
            Twenty years of sitting across from families who did everything right &mdash; saved,
            invested, planned &mdash; and still watched wealth erode through taxes, litigation,
            market timing, and bad transfers.
          </p>
          <p>
            <strong>This book is the thing I wish I&rsquo;d had on page one of my career.</strong>
          </p>
          <p>
            It won&rsquo;t tell you everything. It&rsquo;s a starting point. But if something about
            the conventional financial path has ever felt slightly off to you &mdash; like
            you&rsquo;re following rules written by someone who doesn&rsquo;t share your interests
            &mdash; <strong>this is worth an hour of your time.</strong>
          </p>
        </SalesProse>
      </SalesSection>

      {/* Live section 6 (final CTA) */}
      <SalesSection tone="navy">
        <div className="flex flex-col items-center text-center">
          <img
            src={`${UPLOADS}/The-Self-Banking-Blueprint-2020-Cover-Update-V3-128x200.jpg`}
            alt="The Self Banking Blueprint 2020 Cover Update V3"
            className="w-32 h-auto rounded-sm shadow-[0_16px_40px_rgba(0,0,0,0.35)] mb-6"
          />
          <p className="text-white/60 text-sm mb-3">The Ultimate Free Download</p>
          <p
            className="text-white text-3xl md:text-5xl font-medium leading-tight mb-8"
            style={{ letterSpacing: '-0.03em' }}
          >
            Get Your FREE Copy Now!
          </p>
          <SalesCta light>Get Your FREE Copy Now!</SalesCta>
        </div>
      </SalesSection>
    </>
  );
}
