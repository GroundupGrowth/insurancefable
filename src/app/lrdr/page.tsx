import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import PageShell from '../../components/PageShell';
import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesQuote,
} from '../../components/EbookLanding';

/* "Live Rich Die Rich" (Barry Brooksby) book landing page. Route: /lrdr/.
   Copy reproduced verbatim from extraction/parsed/lrdr.json (4 live sections;
   the footer is covered by PageShell). Live's two CTA buttons link to "#"
   (no target wired on live) — kept as-is. Noindexed on live. */

export const metadata: Metadata = {
  title: { absolute: 'LRDR – I&E | Whole Life & Infinite Banking Strategies' },
  robots: { index: false, follow: true },
  alternates: { canonical: '/lrdr/' },
};

const UPLOADS = '/wp-content/uploads';

function CtaButton({ light = false, children }: { light?: boolean; children: string }) {
  /* Live's buttons href="#" — no destination is wired on the live page. */
  return (
    <a
      href="#"
      className={`inline-flex items-center gap-3 font-medium pl-8 pr-2 py-2 rounded-full transition-colors duration-200 ${
        light ? 'bg-white text-[#0D1B3D] hover:bg-white/90' : 'bg-[#0D1B3D] text-white hover:bg-[#1C2E55]'
      }`}
    >
      {children}
      <span className={`rounded-full p-2 ${light ? 'bg-[#0D1B3D]' : 'bg-white'}`}>
        <ArrowLeft className={`w-5 h-5 rotate-180 ${light ? 'text-white' : 'text-[#0D1B3D]'}`} />
      </span>
    </a>
  );
}

export default function Page() {
  return (
    <PageShell>
      {/* Live section 1: hero. */}
      <SalesSection tone="navy">
        <h1
          className="text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight max-w-4xl mb-6"
          style={{ letterSpacing: '-0.03em' }}
        >
          Unlock the Secret to Financial Freedom: Live Rich NOW and Leave a Lasting Legacy
        </h1>
        <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mb-8">
          Discover how to grow your wealth tax-free, access your money penalty-free, and secure
          your family&rsquo;s future with the Infinite Banking Concept.
        </p>
        <SalesProse light>
          <p>
            Are you tired of watching your retirement savings fluctuate with every market swing?
          </p>
          <p>Worried about running out of money in your golden years?</p>
          <p>
            It&rsquo;s time to take control of your financial future with &ldquo;Live Rich Die
            Rich&rdquo; by Barry Brooksby.
          </p>
          <p>Traditional financial advice is failing millions of Americans:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Volatile markets threaten to erode your hard-earned savings</li>
            <li>Taxes eat away at your retirement income</li>
            <li>Low interest rates make it impossible to grow wealth safely</li>
            <li>The fear of outliving your money keeps you up at night</li>
          </ul>
          <p>
            &ldquo;Live Rich Die Rich&rdquo; reveals a powerful strategy that banks and
            corporations have used for decades to build and protect wealth. Now, you can use this
            same method to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Grow your wealth tax-free, guaranteed</li>
            <li>Access your money whenever you need it, without taxes or penalties</li>
            <li>Create 30-50% more spendable income in retirement</li>
            <li>Leave a tax-free legacy for your loved ones</li>
          </ul>
        </SalesProse>
        <div className="mt-8">
          <CtaButton light>YES! I Want to Live Rich AND Die Rich - Get My Copy Now!</CtaButton>
        </div>
      </SalesSection>

      {/* Live section 2: why this book. */}
      <SalesSection>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={`${UPLOADS}/book-cover-185x200.webp`}
            alt="Book Cover"
            className="w-44 h-auto rounded-2xl shrink-0"
          />
          <div>
            <SalesHeading>Why This Book?</SalesHeading>
            <SalesProse>
              <p>In this groundbreaking book, you&rsquo;ll learn:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <b>The Infinite Banking Concept:</b> How to become your own banker and recapture
                  the interest you&rsquo;re currently paying to others
                </li>
                <li>
                  Why your 401(k) might be sabotaging your retirement dreams (and what to do
                  instead)
                </li>
                <li>
                  How to use &ldquo;Human Life Value&rdquo; to maximize your wealth-building
                  potential
                </li>
                <li>
                  The &ldquo;permission slip&rdquo; strategy that allows you to enjoy your money
                  guilt-free &ndash; Add page number references for specific strategies (e.g.,
                  &ldquo;Learn the &lsquo;permission slip&rsquo; strategy on page 124&rdquo;)
                </li>
                <li>
                  Why whole life insurance, when structured correctly, can be your most powerful
                  financial asset
                </li>
                <li>How to create tax-free retirement income that lasts as long as you do</li>
                <li>The secret to tripling your real estate returns using life insurance</li>
              </ul>
            </SalesProse>
          </div>
        </div>
      </SalesSection>

      {/* Live section 3: about the author. */}
      <SalesSection tone="tint">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={`${UPLOADS}/Barry-1-2-163x200.webp`}
            alt="Barry 1.webp"
            className="w-40 h-auto rounded-2xl shrink-0"
          />
          <div>
            <SalesSubheading>About the Author</SalesSubheading>
            <SalesProse>
              <p>
                Barry has an extensive background in real estate investing and financial services
                and is an authorized Infinite Banking Practitioner. He&rsquo;s a co-author of the
                book, <em>Tax-Free Money for Long-Term Care!</em>, and is known as a financial
                coach and mentor to clients nationwide. Barry speaks on topics such as real estate
                investing, tax-free retirement, guaranteed income planning, Infinite Banking, and
                how to grow wealth and be your own bank.
              </p>
            </SalesProse>
          </div>
        </div>
      </SalesSection>

      {/* Live section 4: testimonials + objections + final CTA. */}
      <SalesSection>
        <SalesSubheading>
          Barry Brooksby has helped thousands of clients achieve financial freedom:
        </SalesSubheading>
        <div className="space-y-6 mb-10">
          <SalesQuote>
            &ldquo;Barry Brooksby is my go-to insurance agent and wealth coach. He&rsquo;s
            incredibly responsive and always on top of things. Barry helped me set up my premium
            life insurance, demonstrating his expertise in tailoring solutions to individual needs.
            His knowledge of concepts like Infinite Banking and high cash value whole life
            insurance sets him apart. Barry provides reliable, forward-thinking advice. I highly
            recommend Barry for anyone seeking a knowledgeable, efficient, and trustworthy
            insurance agent and wealth coach. His service has been exceptional throughout our
            partnership.&rdquo; - Christian
          </SalesQuote>
          <SalesQuote>
            &ldquo;The professionalism of Barry Brooksby and his staff is commendable. He and his
            team are friendly, thorough, and patient with any questions asked of them. They ensured
            the goals I wanted to accomplish and provided me with options to achieve my stated
            goals. Barry gave me a thorough understanding of those options, and I moved forward
            without feeling pressured. I will recommend Barry Brooksby to family, friends, and
            associates. Thank you for a great experience, Barry!&rdquo; - Andamo Tolson
          </SalesQuote>
          <SalesQuote>
            &ldquo;I have to say that Barry Brooksby is a class act. He is very professional and
            yet down to earth in the way he conducts himself. This approach led to a solution,
            specific to all our financial needs. He led us down a path that was a perfect fit for
            our point in life and what our objectives were looking forward. I would highly
            recommend Barry and his team for any financial services, assistance you may need. He is
            a trustworthy, honest professional who is focused on providing a best fit solution to
            all his clients. Happy to provide some feedback here. Best&rdquo; - Ray Kellogg
          </SalesQuote>
        </div>

        <SalesSubheading>
          While these success stories are inspiring, you might still have some doubts about this
          approach - let&rsquo;s address some common concerns:
        </SalesSubheading>
        <SalesProse>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <em>
                But I&rsquo;ve heard whole life insurance is a bad investment&hellip;&rdquo;
              </em>{' '}
              That&rsquo;s because most policies are structured incorrectly. &ldquo;Live Rich Die
              Rich&rdquo; shows you exactly how to design a policy for maximum cash value growth
              and tax-free income.
            </li>
            <li>
              <em>Isn&rsquo;t the stock market the best way to build wealth?&rdquo;</em> While the
              market can offer high returns, it also comes with high risk. Learn how to grow your
              wealth safely and consistently, without the rollercoaster ride.
            </li>
          </ul>
          <p>
            And the great news is you don&rsquo;t need to be a financial expert to implement these
            strategies. &ldquo;Live Rich Die Rich&rdquo; breaks down complex concepts into
            straightforward and easy-to-follow steps that anyone can apply.
          </p>
          <p>
            Don&rsquo;t let another day go by wondering if you&rsquo;ll have enough for retirement.
            Click the button below to get your copy of &ldquo;Live Rich Die Rich&rdquo; now and
            start your journey to true financial freedom!
          </p>
        </SalesProse>
        <div className="mt-8">
          <CtaButton>Get My Copy Now!</CtaButton>
        </div>
      </SalesSection>
    </PageShell>
  );
}
