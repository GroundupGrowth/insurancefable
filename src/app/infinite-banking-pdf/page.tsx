import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import EmbedSlot from '../../components/EmbedSlot';
import TrustpilotWidget from '../../components/TrustpilotWidget';
import {
  SalesSection,
  SalesHeading,
  SalesProse,
} from '../../components/EbookLanding';

/* Infinite banking PDF landing page. Route: /infinite-banking-pdf/. Copy
   reproduced verbatim from extraction/parsed/infinite-banking-pdf.json (one
   long live section, presented as the site's card bands; the footer is
   covered by PageShell). Live's opt-in form (a Gravity Form: Name, Phone,
   Email, Your age + disclaimer) is served by the embed pasted at /admin
   under `page:infinite-banking-pdf:form`; until then a visual replica renders
   as fallback. Internal article links are domain-stripped. Noindexed on live. */

export const metadata: Metadata = {
  title: { absolute: 'Infinite banking PDF – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    'Free Infinite Banking eBook View More Ebooks and Guides Trustpilot Infinite Banking Resources Hello, we at I&E are glad you took a moment to stop on by. You',
  robots: { index: false, follow: true },
  alternates: { canonical: '/infinite-banking-pdf/' },
};

const UPLOADS = '/wp-content/uploads';

const inputClass =
  'bg-[#F5F5F5] text-[#0D1B3D] placeholder-[#0D1B3D]/40 rounded-xl px-5 py-4 w-full border border-black/5 outline-none focus:border-[#0D1B3D]/30';

/* Live's article grid — internal links (domain-stripped) + localized thumbs. */
const ARTICLES: { title: string; href: string; image: string; alt: string }[] = [
  {
    title: 'Using Life Insurance as Your Own Bank [7 Steps]',
    href: '/be-your-own-bank/',
    image: `${UPLOADS}/Steps-to-Becoming-Your-Own-Banker-150x100-1.jpg`,
    alt: '',
  },
  {
    title:
      'Infinite Banking Concept® [Top 10 Most Frequently Asked Questions for Infinite Banking]',
    href: '/whole-life-infinite-banking-objections-faqs/',
    image: `${UPLOADS}/infinite-banking-FAQ-150x100.jpg`,
    alt: 'infinite banking frequently asked questions',
  },
  {
    title: 'Infinite Banking Wiki [Your Comprehensive Guide To IBC]',
    href: '/infinite-banking/',
    image: `${UPLOADS}/infinite-banking-wiki-150x84.jpg`,
    alt: 'infinite banking reviews',
  },
  {
    title:
      'Top 10 Pros and Cons of the Infinite Banking Concept 2023 Edition [How to Become Your Own Banker with Life Insurance]',
    href: '/pros-and-cons-of-the-infinite-banking-concept/',
    image: `${UPLOADS}/Infinite-Banking-150x100.jpg`,
    alt: 'Infinite Banking Concept Pros and Cons',
  },
  {
    title: 'How to Triple Your Real Estate Returns with Infinite Banking',
    href: '/using-life-insurance-to-buy-real-estate/',
    image: `${UPLOADS}/Real-Estate-Wealth-Building-Strategies-150x100.jpg`,
    alt: 'real estate infinite banking',
  },
  {
    title: 'Top 10 Best Infinite Banking Companies [High Cash Value Whole Life Insurance]',
    href: '/top-10-best-infinite-banking-companies/',
    image: `${UPLOADS}/IESLogoonlyreduced-150x86.png`,
    alt: 'Top 10 Best Infinite Banking Companies',
  },
  {
    title: 'Buy Term and Invest the Difference [Your Comprehensive Guide to BTID]',
    href: '/buy-term-invest-the-difference-btid/',
    image: `${UPLOADS}/buy-term-and-invest-the-difference-1-150x107.jpg`,
    alt: 'should you buy term or whole life insurance',
  },
  {
    title:
      'Life Insurance Creditor Protection By State [Is Your Cash Value and Death Benefit Covered?]',
    href: '/life-insurance-creditor-protection-by-state/',
    image: `${UPLOADS}/Life-Insurance-Creditor-Protection-by-state-150x100.jpg`,
    alt: 'life insurance protected from creditors',
  },
  {
    title: 'The Best Compound Interest Account for Maximum Growth and Control',
    href: '/compound-interest-growth/',
    image: `${UPLOADS}/compound-interest-150x100.jpg`,
    alt: '',
  },
];

export default function Page() {
  return (
    <PageShell>
      {/* Live hero. */}
      <SalesSection tone="navy">
        <h1
          className="text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4"
          style={{ letterSpacing: '-0.03em' }}
        >
          Infinite banking PDF
        </h1>
        <p
          className="text-white text-xl md:text-2xl font-medium leading-snug mb-4"
          style={{ letterSpacing: '-0.02em' }}
        >
          Free Infinite Banking eBook
        </p>
        <p className="text-white/70 leading-relaxed mb-8">
          View More{' '}
          <a
            href="/ebooks-and-guides/"
            className="text-white underline underline-offset-4 hover:text-white/80"
          >
            Ebooks and Guides
          </a>
        </p>
        <TrustpilotWidget theme="dark" />
      </SalesSection>

      {/* Infinite banking resources. */}
      <SalesSection>
        <SalesHeading>Infinite Banking Resources</SalesHeading>
        <SalesProse>
          <p>
            <b>The Problem:</b> A volatile stock market and potential losses, an unknown future due
            to lack of specific planning, the high likelihood of potential future tax increases,
            and the fear of not having enough money for retirement.
          </p>
          <p>
            <b>Free Infinite Banking Webinars</b>
          </p>
          <p>How to &ldquo;Become Your Own Banker&rdquo; with Whole Life</p>
          <p>Boost Your Real Estate Income with Infinite Banking</p>
        </SalesProse>
      </SalesSection>

      {/* The opt-in form. */}
      <SalesSection tone="tint">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-black/5 p-6 md:p-8">
            <h2
              className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-2"
              style={{ letterSpacing: '-0.02em' }}
            >
              Get Started on Your IBC Journey To Create Wealth, Freedom and Your Legacy
            </h2>
            <p className="text-[#0D1B3D]/50 text-xs mb-6">&quot;*&quot; indicates required fields</p>
            <EmbedSlot slotKey="page:infinite-banking-pdf:form">
              {/* Visual replica of live's Gravity Form until the GHL embed is
                  pasted at /admin under page:infinite-banking-pdf:form. */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Name*" className={inputClass} />
                  <input type="tel" placeholder="Phone*" className={inputClass} />
                  <input type="email" placeholder="Email*" className={inputClass} />
                  <input type="text" placeholder="Your age*" className={inputClass} />
                </div>
                <p className="text-[#0D1B3D]/50 text-xs leading-relaxed">
                  By pressing the Submit button, you agree to use InsuranceandEstates&rsquo;{' '}
                  <a href="/privacytou/" className="underline hover:text-[#0D1B3D]">
                    privacy policy and terms
                  </a>
                  . InsuranceandEstates may contact you at the number you entered on this webpage
                  using our automatic dialing system to market our life insurance products.
                  Alternatively, you can contact us at{' '}
                  <a href="tel:1-877-787-7558" className="underline hover:text-[#0D1B3D]">
                    877-787-7558
                  </a>
                  .
                </p>
                <label className="flex items-start gap-3 text-sm text-[#0D1B3D]/70 leading-relaxed">
                  <input type="checkbox" className="mt-1 shrink-0" />
                  <span>I read the disclaimer above.* Yes</span>
                </label>
                <button
                  type="button"
                  className="bg-[#0D1B3D] text-white font-medium px-8 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 self-start"
                >
                  Submit
                </button>
              </div>
            </EmbedSlot>
          </div>
        </div>
      </SalesSection>

      {/* Infinite banking articles. */}
      <SalesSection>
        <SalesHeading>Infinite Banking Articles</SalesHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <a
              key={article.href}
              href={article.href}
              className="group bg-[#F5F5F5] rounded-3xl border border-black/5 p-6 flex items-start gap-4 hover:bg-[#EDEDED] transition-colors duration-200"
            >
              <img
                src={article.image}
                alt={article.alt}
                className="w-24 h-auto rounded-xl shrink-0 object-cover"
              />
              <span className="text-[#0D1B3D] font-medium leading-snug group-hover:underline underline-offset-4">
                {article.title}
              </span>
            </a>
          ))}
        </div>
        <SalesProse>
          <p className="mt-8">
            View More{' '}
            <a
              href="/blog/#infinite-banking-concept"
              className="text-[#0D1B3D] underline underline-offset-4 hover:text-[#0D1B3D]/70"
            >
              Infinite Banking Articles
            </a>
          </p>
        </SalesProse>
      </SalesSection>
    </PageShell>
  );
}
