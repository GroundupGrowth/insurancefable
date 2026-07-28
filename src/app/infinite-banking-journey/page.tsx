import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import LeadFormPopup from './LeadFormPopup';
import TrustpilotWidget from '../../components/TrustpilotWidget';
import YouTubeEmbed from '../../components/YouTubeEmbed';
import ArticleThumbCard, { type ArticleThumb } from '../../components/ArticleThumbCard';
import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesChecklist,
  SalesQuote,
} from '../../components/EbookLanding';

/* Infinite Banking journey landing page. Route: /infinite-banking-journey/.

   Content history (important): live REPLACED this page's original content with
   a short "Stop Banking for Them" version some time before our capture, and our
   first build mirrored that short version. Xander wants the ORIGINAL page
   (webinars, resources, personas — captured in the 2026-01-14 Wayback snapshot
   and pasted by him verbatim on 2026-07-28), so this file now restores that
   content below the hero he already refined (popup CTA + Trustpilot stars).
   Body copy is verbatim from the old page — don't "improve" it.

   The hero opt-in is a real GHL form opened in a popup (see LeadFormPopup.tsx).
   Noindexed on live. */

export const metadata: Metadata = {
  title: {
    absolute:
      'Stop Banking for Them. Start Banking for Yourself. – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    'The system is designed to keep you in the middle. We show you the exit. Your numbers are waiting. Let’s look at them. Trustpilot " * " indicates',
  robots: { index: false, follow: true },
  alternates: { canonical: '/infinite-banking-journey/' },
};

function StartHereButton({ light = false }: { light?: boolean }) {
  return (
    <a
      href="/start-your-journey/"
      className={`inline-flex items-center gap-3 font-medium pl-8 pr-2 py-2 rounded-full transition-colors duration-200 ${
        light ? 'bg-white text-[#0D1B3D] hover:bg-white/90' : 'bg-[#0D1B3D] text-white hover:bg-[#1C2E55]'
      }`}
    >
      Start Here
      <span className={`rounded-full p-2 ${light ? 'bg-[#0D1B3D]' : 'bg-white'}`}>
        <ArrowLeft className={`w-5 h-5 rotate-180 ${light ? 'text-white' : 'text-[#0D1B3D]'}`} />
      </span>
    </a>
  );
}

/* The old page's "Must Read IBC Articles" list, titles verbatim. Three hrefs
   are the canonical targets of the slugs the old page linked (301s here):
   using-life-insurance-as-your-own-bank -> /be-your-own-bank/,
   whole-life-ibc-objections-faqs -> /whole-life-insurance-pros-cons/,
   how-to-triple-your-real-estate-returns... -> /using-life-insurance-to-buy-real-estate/. */
const articles: ArticleThumb[] = [
  {
    title: 'Buy Term and Invest the Difference (BTID) vs Whole Life [2025 Update]',
    href: '/buy-term-invest-the-difference-btid/',
    image: 'BTID-buy-term-invest-difference-150x150.webp',
    alt: 'Buy term and invest the difference compared with whole life',
  },
  {
    title: 'Best Infinite Banking Companies 2025: Expert Analysis & Complete Guide',
    href: '/top-10-best-infinite-banking-companies/',
    image: 'infinite-banking-companies-150x150.webp',
    alt: 'Best infinite banking companies',
  },
  {
    title: 'Top 10 Pros and Cons of Infinite Banking [2025 Updated Guide]',
    href: '/pros-and-cons-of-the-infinite-banking-concept/',
    image: 'infinite-banking-pros-cons-150x150.webp',
    alt: 'Infinite banking concept pros and cons',
  },
  {
    title: 'Using Life Insurance as Your Own Bank: 7 Steps to Financial Freedom [2025 Guide]',
    href: '/be-your-own-bank/',
    image: 'Steps-to-Becoming-Your-Own-Banker-150x100-1.jpg',
    alt: 'Steps to becoming your own banker',
  },
  {
    title: 'What is the Best Compound Interest Account for 2025? [5.25% Tax-Free vs 4.66% Taxable]',
    href: '/compound-interest-growth/',
    image: 'compound-interest-150x100.jpg',
    alt: 'Compound interest growth',
  },
  {
    title: 'Infinite Banking with Whole Life Insurance: 18 Common Objections & FAQs',
    href: '/whole-life-insurance-pros-cons/',
    image: 'infinite-banking-whole-life-insurance-150x144.jpg',
    alt: 'Be your own banker with whole life insurance',
  },
  {
    title: 'Life Insurance Creditor Protection: State-by-State Guide to Protecting Your Cash Value',
    href: '/life-insurance-creditor-protection-by-state/',
    image: 'life-insurance-creditor-protection-150x150.webp',
    alt: 'Life insurance creditor protection state by state',
  },
  {
    title: 'How to Triple Your Real Estate Returns with Infinite Banking',
    href: '/using-life-insurance-to-buy-real-estate/',
    image: 'Real-Estate-Wealth-Building-Strategies-150x100.jpg',
    alt: 'Real estate infinite banking',
  },
];

export default function Page() {
  return (
    <PageShell>
      {/* Hero: headlines, the popup CTA, Trustpilot stars under the button
          (Xander, 2026-07-28). */}
      <SalesSection tone="navy">
        <h1
          className="text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6"
          style={{ letterSpacing: '-0.03em' }}
        >
          Stop Banking for Them. Start Banking for Yourself.
        </h1>
        <p
          className="text-white text-xl md:text-2xl font-medium leading-snug mb-6"
          style={{ letterSpacing: '-0.02em' }}
        >
          The system is designed to keep you in the middle. We show you the exit.
        </p>
        <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8">
          Your numbers are waiting. Let&rsquo;s look at them.
        </p>
        <div className="mb-6">
          <LeadFormPopup />
        </div>
        {/* The Mini TrustBox centers itself inside its 100%-wide iframe; the
            narrow wrapper keeps the stars left-aligned under the button. */}
        <div className="max-w-[300px]">
          <TrustpilotWidget theme="dark" />
        </div>
      </SalesSection>

      {/* Old page section 1: Infinite Banking Resources (verbatim). The video
          sat beside the old hero form; it opens the section here. */}
      <SalesSection>
        <SalesHeading>Infinite Banking Resources</SalesHeading>
        <SalesSubheading>
          Are you tired of watching your hard-earned wealth fluctuate with each market swing? Of
          feeling that knot in your stomach whenever economic chaos dominates the headlines?
        </SalesSubheading>
        <div className="max-w-3xl mb-10">
          <YouTubeEmbed
            id="scuNU5ei_TQ"
            title="Family Banking With Whole Life Explained: Start Building Wealth Today"
          />
        </div>
        <SalesProse>
          <p>
            John, a successful real estate investor, felt that same anxiety. He had followed
            traditional wisdom&mdash;diversified investments, market exposure, and diligent saving.
            Yet when an unexpected opportunity to purchase a deeply discounted property arose
            during a market downturn, his &ldquo;liquid&rdquo; investments were either tied up or
            had lost significant value.
          </p>
        </SalesProse>
        <div className="my-6 max-w-3xl">
          <SalesQuote>
            &ldquo;What transformed my wealth-building strategy wasn&rsquo;t my market
            investments&mdash;it was having access to guaranteed, growing cash that I could
            immediately deploy without selling assets at a loss or going through bank approvals.
            For the first time, I felt in control of my financial destiny rather than at the mercy
            of economic forces or lender decisions.&rdquo;
          </SalesQuote>
        </div>
        <SalesProse>
          <p>
            Consider this question: If traditional financial advice actually worked, why are so
            few people truly wealthy?
          </p>
          <p>
            It&rsquo;s time to discover a revolutionary approach to wealth building: The Infinite
            Banking Concept using high cash value whole life insurance.
          </p>
        </SalesProse>

        <SalesSubheading>Imagine having a financial foundation that:</SalesSubheading>
        <SalesChecklist
          items={[
            <>Grows predictably, regardless of market conditions</>,
            <>Provides tax-free growth and access to your money</>,
            <>Allows you to be your own bank, funding your own purchases and investments</>,
            <>Multiplies your assets by letting you use your money in two places at once</>,
          ]}
        />
        <SalesProse>
          <p>
            One client, a seasoned investor with significant holdings in stocks, real estate, and
            even cryptocurrency, shared a powerful insight: Despite his diverse portfolio of
            growth assets, nothing provided the sense of control and financial confidence that his
            cash value insurance did. While he continues to invest in the market, he considers his
            cash value his financial &ldquo;home base&rdquo; &ndash; the foundation that allows
            him to pursue other opportunities with peace of mind.
          </p>
          <p>
            Many of our clients express similar sentiments &ndash; that without guarantees, market
            investments often feel like mere numbers on a page, subject to forces beyond their
            control. The psychological comfort and peace-of-mind of having a guaranteed foundation
            can&rsquo;t be measured in yield percentages alone.
          </p>
          <p>
            Infinite Banking with properly designed High Cash Value Whole Life Insurance is a
            powerful financial strategy that replaces traditional banking and becomes the
            cornerstone of your wealth-building journey.
          </p>
        </SalesProse>

        <SalesSubheading>
          With a properly structured high cash value whole life policy, you can:
        </SalesSubheading>
        <SalesProse>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Create a guaranteed, growing pool of capital you control</li>
            <li>Borrow against your policy to invest in other assets, multiplying your wealth</li>
            <li>
              Recapture the interest you&rsquo;d normally pay to banks, accelerating your
              financial growth
            </li>
            <li>Protect your assets from market volatility and potential creditors</li>
            <li>Build a legacy that can benefit generations to come</li>
          </ol>
          <p>
            Unlike conventional financial advice that leaves you at the mercy of market swings,
            this strategy puts you in the driver&rsquo;s seat of your financial future. It&rsquo;s
            about more than just saving or investing &ndash; it&rsquo;s about creating a personal
            banking system that works for you 24/7.
          </p>
          <p>
            Join a community of forward-thinking individuals who have discovered the power of
            being their own bankers.
          </p>
          <p>
            Our expert coaching and support will guide you through every step of implementing this
            transformative strategy.
          </p>
        </SalesProse>
      </SalesSection>

      {/* Old page section 2: the 4-step framework + infographic. */}
      <SalesSection tone="navy">
        <SalesHeading light>The 4-Step Framework (see graphic below)</SalesHeading>
        <SalesProse light>
          <p>
            <b>Step 1:</b> Fund a Whole Life Insurance Policy
          </p>
          <p>
            <b>Step 2:</b> Locate Cash Flow Assets
          </p>
          <p>
            <b>Step 3:</b> Repay Your Policy Loan
          </p>
          <p>
            <b>Step 4:</b> Buy More Life Insurance
          </p>
        </SalesProse>
        <div className="mt-8 bg-white rounded-3xl p-4 md:p-6 max-w-4xl">
          <img
            src="/wp-content/uploads/infinite-banking-infographic-5.webp"
            alt="Infinite Banking framework infographic: fund your policy, borrow against your cash value, invest, recapture your money and repeat"
            width={1000}
            height={563}
            loading="lazy"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="mt-8">
          <StartHereButton light />
        </div>
      </SalesSection>

      {/* Old page section 3: Who Is This For (verbatim personas). */}
      <SalesSection>
        <SalesHeading>Who Is This For?</SalesHeading>
        <SalesSubheading>The Strategic Self Banking Approach Is Perfect For:</SalesSubheading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {[
            {
              title: 'The Financial Independent Thinker',
              text: 'You question conventional wisdom and aren’t satisfied with cookie-cutter financial advice. You understand that following the crowd rarely leads to exceptional results.',
            },
            {
              title: 'The Business Owner or Entrepreneur',
              text: 'You’ve built your business by taking calculated risks and maintaining control. You want your personal finances to reflect the same principles of ownership and leverage that drive your business success.',
            },
            {
              title: 'The Smart Professional',
              text: 'You’ve worked too hard to gamble your future in the market. You’re looking for a systematic approach to wealth building that doesn’t hinge on market timing or Wall Street’s latest products.',
            },
            {
              title: 'The Legacy Builder',
              text: 'You’re thinking beyond your own retirement—you want to create lasting financial impact for your family across generations. You understand that true wealth is about more than just accumulating assets.',
            },
            {
              title: 'The Control Seeker',
              text: 'You value having direct control over your financial destiny rather than outsourcing it to financial institutions whose interests rarely align with yours.',
            },
            {
              title: 'The Practical Wealth Creator',
              text: 'You prefer consistent, predictable growth over the emotional rollercoaster of market speculation. You’re willing to trade flashy returns for a system that builds sustainable wealth.',
            },
          ].map((persona) => (
            <div key={persona.title} className="bg-white rounded-2xl border border-black/5 p-6 md:p-8">
              <h3
                className="text-[#0D1B3D] text-xl font-medium mb-3"
                style={{ letterSpacing: '-0.02em' }}
              >
                {persona.title}
              </h3>
              <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{persona.text}</p>
            </div>
          ))}
        </div>

        <SalesSubheading>This May Not Be For You If:</SalesSubheading>
        <SalesProse>
          <ul className="list-disc pl-6 space-y-2">
            <li>You&rsquo;re looking for get-rich-quick schemes or overnight success</li>
            <li>You prefer to delegate all financial decisions to advisors</li>
            <li>
              You&rsquo;re fully committed to conventional retirement planning through 401(k)s and
              IRAs
            </li>
            <li>You&rsquo;re not interested in creating long-term family wealth</li>
            <li>You believe that Wall Street has your best interests at heart</li>
          </ul>
          <p>
            If you&rsquo;re ready to take the road less traveled and build wealth on your own
            terms, Strategic Self Banking might be exactly what you&rsquo;ve been searching for.
          </p>
          <p>
            Scroll down and you&rsquo;ll discover an extensive array of resources that cover every
            aspect of infinite banking. We&rsquo;re committed to being your reliable guide on this
            individual journey toward financial freedom.
          </p>
          <p>
            Your adventure starts by empowering yourself with knowledge, revealing a unique
            pathway for you to delve into. This includes engaging webinars, a complimentary
            e-book, and numerous articles all related to infinite banking
          </p>
          <p>
            We&rsquo;re here to assist and support you at every step. Offering complimentary
            strategy sessions, we work alongside you to craft a personalized roadmap for your
            journey, tailored to your specific financial situation. Let us help you navigate this
            path with your unique goals, using your own numbers.
          </p>
        </SalesProse>
      </SalesSection>

      {/* Client testimonials (unchanged). */}
      <SalesSection>
        <SalesHeading>What Our Clients Are Saying</SalesHeading>
        <div className="space-y-6">
          <SalesQuote>
            &ldquo;Our advisor is the perfect advisor for properly structured whole life policies
            with decades experience and a wealth of knowledge.&rdquo; &mdash; Keith T.
          </SalesQuote>
          <SalesQuote>
            &ldquo;Very trustworthy. The team was very efficient with processes, very
            knowledgeable, yet still relatable in ensuring I felt comfortable with my understanding
            of how my life insurance &lsquo;vehicle&rsquo; operates. I have a partner that I can
            trust and not just a one-time deal.&rdquo; &mdash; Ashley T.
          </SalesQuote>
          <SalesQuote>
            &ldquo;I was amazed by their knowledge of IBC and WL. When it was time to consider a
            second policy, it was easy to reach out and let them know what I was looking for. They
            were quick to respond, provide the time and knowledge on another policy, and how to
            best structure it.&rdquo; &mdash; Michael M.
          </SalesQuote>
          <SalesQuote>
            &ldquo;They provide more than just the necessary. They go above and beyond to help
            their customers understand, and that&rsquo;s very important to me. They exhibit a level
            of patience not often encountered in business these days.&rdquo; &mdash; Buddy H.
          </SalesQuote>
          <SalesQuote>
            &ldquo;We compared options to quotes from agents who work directly for big name life
            insurance companies, and the policy put together for us was far superior in terms of
            projected growth. This was the best option for a high cash value whole life
            policy.&rdquo; &mdash; Jamal
          </SalesQuote>
        </div>
        <div className="mt-10">
          <StartHereButton />
        </div>
      </SalesSection>

      {/* Old page section 4: the free webinars. */}
      <SalesSection tone="navy">
        <SalesHeading light>Free Infinite Banking Webinars</SalesHeading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          <div>
            <h3
              className="text-white text-xl md:text-2xl font-medium leading-snug mb-5"
              style={{ letterSpacing: '-0.02em' }}
            >
              Infinite Banking: &ldquo;Become Your Own Banker&rdquo; with Whole Life
            </h3>
            <YouTubeEmbed
              id="7xGv9_WNtmg"
              title="What is Infinite Banking? Nelson Nash's Become Your Own Banker Explained"
            />
          </div>
          <div>
            <h3
              className="text-white text-xl md:text-2xl font-medium leading-snug mb-5"
              style={{ letterSpacing: '-0.02em' }}
            >
              Boost Your Real Estate Income with Infinite Banking
            </h3>
            <YouTubeEmbed
              id="QFU_2bFCc18"
              title="The Cash Flow Multiplier: Real Estate Investing Meets Infinite Banking"
            />
          </div>
        </div>
      </SalesSection>

      {/* Old page section 5: the free ebooks. */}
      <SalesSection>
        <SalesHeading>Free Infinite Banking eBooks</SalesHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mt-4">
          {[
            {
              title: 'Free Infinite Banking eBook',
              text: 'The Self Banking Blueprint. A modern approach to the Infinite Banking Concept.',
              href: '/self-banking-blueprint/',
              image: '/wp-content/uploads/THE-SELF-BANKING-BLUEPRINT-Book-Cover-188x300.webp',
              alt: 'The Self Banking Blueprint book cover',
            },
            {
              title: 'Free Money Secrets of the Wealthy eBook',
              text: 'What the wealthy know about money that everyone else was never taught.',
              href: '/money-secrets/',
              image: '/wp-content/uploads/money-secrets-ebook-custom.jpg',
              alt: 'Money Secrets of the Wealthy ebook cover',
            },
          ].map((book) => (
            <a
              key={book.href}
              href={book.href}
              className="group bg-white rounded-2xl border border-black/5 hover:border-black/10 transition-colors duration-200 p-6 md:p-8 flex gap-6 items-center"
            >
              <img
                src={book.image}
                alt={book.alt}
                loading="lazy"
                className="w-24 h-auto shrink-0 rounded-sm shadow-[0_10px_28px_rgba(13,27,61,0.22)] group-hover:-translate-y-1 transition-transform duration-200"
              />
              <div>
                <h3
                  className="text-[#0D1B3D] text-xl font-medium mb-2 leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {book.title}
                </h3>
                <p className="text-[#0D1B3D]/70 text-sm leading-relaxed mb-3">{book.text}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#0D1B3D]/60 group-hover:text-[#0D1B3D] transition-colors duration-200">
                  Get the eBook
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </SalesSection>

      {/* Old page section 6: Must Read IBC Articles. */}
      <SalesSection>
        <SalesHeading>Must Read IBC Articles</SalesHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {articles.map((article) => (
            <ArticleThumbCard key={article.title} article={article} />
          ))}
        </div>
        <div className="mt-10">
          <a
            href="/blog/"
            className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
          >
            View More Infinite Banking Articles
            <span className="bg-white rounded-full p-2">
              <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
            </span>
          </a>
        </div>
      </SalesSection>
    </PageShell>
  );
}
