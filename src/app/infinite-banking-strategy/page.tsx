import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import TrustpilotBox from '../../components/TrustpilotBox';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';
import IbcLeadForm from './IbcLeadForm';

/* 1:1 clone of the live /infinite-banking-strategy/ page
   (extraction/parsed/infinite-banking-strategy.json +
   extraction/screens/src/infinite-banking-strategy.jpeg). White hero with the
   centered h1 and lead paragraph, the Trustpilot mini box beside the Gravity
   Form 27 replica, the blue "Free Resources to Start Your Journey" panel with
   the two book covers and green CTAs, the "Must Read IBC Articles" post-card
   grid, the "View More Infinite Banking Articles" line, and the Generational
   Transfer band. Follows the same conventions as
   src/app/life-insurance/page.tsx. */

export const metadata: Metadata = {
  title: {
    absolute: 'Something Is Wrong. You Feel It. – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    "You followed the rules. You're still not free. Infinite Banking is the financial infrastructure wealthy families have used for over a century. Let us show you h",
  alternates: { canonical: '/infinite-banking-strategy/' },
};

/* Live inline styles: background #5ba052, white bold text, 5px radius */
const greenCta =
  'inline-block bg-[#5BA052] text-white font-bold rounded-[5px] px-[30px] py-3 mt-2.5 hover:opacity-90 transition-opacity duration-200';

const mustReadArticles = [
  {
    href: '/buy-term-invest-the-difference-btid/',
    img: '/wp-content/uploads/BTID-buy-term-invest-difference-150x150.webp',
    alt: 'Btid buy term invest difference image',
    title: 'Buy Term and Invest the Difference: Why BTID Fails and What Works Better',
  },
  {
    href: '/top-10-best-infinite-banking-companies/',
    img: '/wp-content/uploads/infinite-banking-companies-150x150.webp',
    alt: 'best Infinite banking companies',
    title: 'Best Infinite Banking Companies for 2026: Expert Rankings & Analysis',
  },
  {
    href: '/pros-and-cons-of-the-infinite-banking-concept/',
    img: '/wp-content/uploads/infinite-banking-pros-cons-150x150.webp',
    alt: 'Infinite banking concept pros cons',
    title: 'The Pros and Cons of Infinite Banking: An Honest Evaluation',
  },
  {
    href: '/compound-interest-growth/',
    img: '/wp-content/uploads/compound-interest-150x100.jpg',
    alt: 'Compound interest',
    title: 'What Is the Best Compound Interest Account for 2026?',
  },
  {
    href: '/whole-life-infinite-banking-objections-faqs/',
    img: '/wp-content/uploads/infinite-banking-whole-life-insurance-150x144.jpg',
    alt: 'be your own banker',
    title: 'Infinite Banking with Whole Life Insurance: 18 Common Objections & FAQs',
  },
  {
    href: '/life-insurance-creditor-protection-by-state/',
    img: '/wp-content/uploads/life-insurance-creditor-protection-150x150.webp',
    alt: 'Life insurance creditor protection state by state',
    title: 'Life Insurance Creditor Protection: State-by-State Guide to Protecting Your Cash Value',
  },
];

export default function InfiniteBankingStrategyPage() {
  return (
    <PageShell>
      <section className="px-4 pt-14">
        <div className="max-w-[1104px] mx-auto">
          <h1 className="text-center text-[#262626] text-[34px] md:text-[44px] font-medium leading-[1.2]">
            Something Is Wrong. You Feel It.
          </h1>

          <p className="text-center text-[#363636] text-[1.1em] leading-[1.7] max-w-[700px] mx-auto mt-6 mb-[30px]">
            You followed the rules. You&rsquo;re still not free.
            <br />
            <a
              href="/infinite-banking/"
              target="_blank"
              rel="noopener"
              className="text-[#FF6352] hover:underline"
            >
              Infinite Banking
            </a>{' '}
            is the financial infrastructure wealthy families have used for over a century. Let us
            show you how it works.
          </p>

          {/* su-row: Trustpilot mini box | Gravity Form 27 */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="flex justify-center md:justify-start">
              <TrustpilotBox />
            </div>
            <IbcLeadForm />
          </div>
        </div>
      </section>

      {/* Blue "Free Resources" panel — live inline background #185f9a */}
      <section className="px-4 pt-[60px]">
        <div className="max-w-[1104px] mx-auto bg-[#185F9A] rounded-[32px] px-8 py-12 md:p-[60px]">
          <h2 className="text-center text-white text-[30px] md:text-[38px] font-medium mb-[5px]">
            Free Resources to Start Your Journey
          </h2>
          <p className="text-center text-[#ccc] text-[15px] leading-[1.7] mb-[30px]">
            Choose your starting point based on where you are right now.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="text-center text-white">
              <a href="/kingdom-money/">
                <img
                  src="/wp-content/uploads/kingdom-money-217x300.webp"
                  alt="Kingdom money"
                  width={217}
                  height={300}
                  className="mx-auto h-auto w-[217px] max-w-full"
                />
              </a>
              <h3 className="text-white text-[28px] md:text-[34px] font-normal leading-[1.2] mt-6">
                New to Infinite Banking?
              </h3>
              <p className="text-[#ddd] text-[15px] leading-[1.7] mt-4">
                <em>Kingdom Money</em> explains why conventional financial wisdom fails — and what
                wealthy families have always done differently.
              </p>
              <p className="mt-4">
                <a href="/kingdom-money/" className={greenCta}>
                  Get Kingdom Money →
                </a>
              </p>
            </div>

            <div className="text-center text-white">
              <a href="/self-banking-blueprint/">
                <img
                  src="/wp-content/uploads/icon-THE-SELF-BANKING-BLUEPRINT-Book-Cover-219x300.webp"
                  alt="Icon THE SELF BANKING BLUEPRINT Book Cover"
                  width={219}
                  height={300}
                  className="mx-auto h-auto w-[219px] max-w-full"
                />
              </a>
              <h3 className="text-white text-[28px] md:text-[34px] font-normal leading-[1.2] mt-6">
                Ready to See How It Works?
              </h3>
              <p className="text-[#ddd] text-[15px] leading-[1.7] mt-4">
                You understand the concept. <em>The Self Banking Blueprint</em> walks you through
                policy design, deployment, and the infrastructure behind it.
              </p>
              <p className="mt-4">
                {/* Live triggers Popup Maker popup #8461; linked to the blueprint page instead. */}
                <a href="/self-banking-blueprint/" className={greenCta}>
                  Get the Blueprint →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Must Read IBC Articles post-card grid */}
      <section className="px-4 pt-[60px]">
        <h3 className="text-center text-[#262626] text-[24px] font-semibold">
          Must Read IBC Articles
        </h3>
        <div className="max-w-[1104px] mx-auto flex flex-wrap justify-center gap-5 mt-10">
          {mustReadArticles.map((article) => (
            <div
              key={article.href}
              className="flex items-center gap-6 w-full md:w-[48%] bg-[#EAF2F4] rounded-[16px] p-8"
            >
              <a href={article.href} className="shrink-0">
                <img
                  src={article.img}
                  alt={article.alt}
                  width={150}
                  className="h-auto border-4 border-white shadow-md"
                />
              </a>
              <h3 className="text-[18px] font-bold leading-snug">
                <a href={article.href} className="text-[#FF6352] hover:underline">
                  {article.title}
                </a>
              </h3>
            </div>
          ))}
        </div>
      </section>

      <h2 className="text-center text-[#262626] text-[17px] leading-[1.7] font-semibold pt-10 pb-[60px] px-4">
        View More{' '}
        {/* Live links /category/infinite-banking-concept/; this repo has no /category/
            route — category links resolve to the blog index jump anchor. */}
        <a href="/blog/#infinite-banking-concept" className="text-[#FF6352] hover:underline">
          Infinite Banking Articles
        </a>
      </h2>

      <GenerationalTransferBand />
    </PageShell>
  );
}
