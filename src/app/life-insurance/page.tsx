import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';

/* 1:1 clone of the live /life-insurance/ page (extraction/parsed/life-insurance.json
   + extraction/screens/src/life-insurance.jpeg). Soft-green hero with the ringed
   circular family photo, five product icon cards, yellow "Find The Right Policy"
   pill, blue-grey feature card section with the teal circle shape divider, and
   the Related Articles post-card grid — Generational Transfer band at the end,
   as on live. */

export const metadata: Metadata = {
  title: { absolute: 'Life Insurance – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    "Life Insurance Helping you answer life's big questions. Regardless of your age or health status, we have options for you. Whole Life Insurance Infinite Banking",
  alternates: { canonical: '/life-insurance/' },
};

/* fas fa-arrow-right-long, as on the live buttons */
function ArrowRightLong({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" className={className} fill="currentColor">
      <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
    </svg>
  );
}

/* .life-blocks product icon cards, verbatim from the parsed JSON.
   NOTE: whole_life.webp is not present locally (missing from the localized
   uploads) — the live path is still referenced. */
const productBlocks = [
  { href: '/whole-life-introduction/', img: '/wp-content/uploads/whole_life.webp', alt: 'Whole Life.webp', label: 'Whole Life', w: 130, h: 125 },
  { href: '/infinite-banking-strategy/', img: '/wp-content/uploads/infinite_banking.webp', alt: 'Infinite Banking.webp', label: 'Infinite Banking', w: 123, h: 125 },
  { href: '/iul-introduction/', img: '/wp-content/uploads/indexed_universal.webp', alt: 'Indexed Universal.webp', label: 'IUL Insurance', w: 127, h: 125 },
  { href: '/term-life-introduction/', img: '/wp-content/uploads/term_life.webp', alt: 'Term Life.webp', label: 'Term Life', w: 127, h: 125 },
  { href: '/variable-life-introduction/', img: '/wp-content/uploads/variable_universal.webp', alt: 'Variable Universal.webp', label: 'VUL Insurance', w: 127, h: 125 },
];

/* Feature cards ("card--item") — live tints sampled from the screenshot; the
   3rd (visible on live capture) is the muted blue. */
const featureCards = [
  {
    bg: '#CADFE5',
    heading: 'Find out what your policy should actually do.',
    text: 'Most people are sold life insurance as a death benefit. We design it as a living asset — one that builds capital, stays liquid, and works for you today, not just someday.',
  },
  {
    bg: '#E5EFF2',
    heading: 'See if whole life is the right foundation.',
    text: 'Not everyone qualifies and not everyone is ready. We take the time to understand your situation before recommending anything — because the wrong policy is worse than no policy.',
  },
  {
    bg: '#A9C6DE',
    heading: "Term that converts when you're ready.",
    text: "If whole life isn't the right fit yet, we structure convertible term so the door stays open. When your income and goals align, you can move into permanent coverage without starting over.",
  },
];

const relatedArticles = [
  {
    href: '/top-25-highest-rated-insurance-companies/',
    img: '/wp-content/uploads/life-insurance-company-ratings-1-150x100.jpg',
    alt: "Comparison table showing the top 25 highest rated life insurance companies in 2026 ranked by A.M. Best, S&P, Moody's, Fitch ratings and COMDEX scores with Best For designations",
    title: 'Top 25 Highest Rated Life Insurance Companies (2026 Comdex Rankings)',
  },
  {
    href: '/different-types-of-life-insurance-policies/',
    img: '/wp-content/uploads/Different-Types-of-Life-Insurance-Policies-150x113.jpg',
    alt: 'Best Life Insurance Policy',
    title: 'Types of Life Insurance: A Practical Guide to Choosing the Right Policy',
  },
  {
    href: '/top-10-best-life-insurance-companies/',
    img: '/wp-content/uploads/best-life-insurance-companies-1-150x100.jpg',
    alt: 'Comparison table ranking the top 10 best life insurance companies for 2026 by A.M. Best rating, Comdex score, and distribution model including Penn Mutual, MassMutual, and Northwestern Mutual',
    title: 'Top 10 Best Life Insurance Companies (2026 Independent Rankings)',
  },
  {
    href: '/life-insurance-underwriting/',
    img: '/wp-content/uploads/life-insurance-underwriting-1-150x100.jpg',
    alt: 'underwriting life insurance tips',
    title: 'Life Insurance Underwriting Standards: The Data Behind Best Rates',
  },
];

export default function LifeInsurancePage() {
  return (
    <PageShell>
      {/* Hero — soft green band with big rounded bottom-left corner */}
      <section className="bg-[#E0EBE0] rounded-bl-[120px] md:rounded-bl-[220px]">
        <div className="max-w-[1104px] mx-auto grid md:grid-cols-2 gap-10 items-center px-6 py-14 md:py-20">
          <div>
            <h3 className="text-[#31634A] text-[44px] md:text-[62px] font-normal tracking-[-2px] leading-[1.05]">
              Life Insurance
            </h3>
            <p className="text-[#42604F] text-[17px] leading-[1.7] mt-4 max-w-[430px]">
              Most people come here looking for life insurance. A few leave understanding
              it&#39;s the most powerful financial asset they&#39;ve never been told about.
            </p>
          </div>
          <div>
            <img
              src="/wp-content/uploads/life-insurance1.webp"
              alt="Life Insurance1"
              width={494}
              height={494}
              className="rounded-full border-[10px] border-[#4E9E7D] w-[420px] max-w-full h-auto mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Product icon cards (.life-blocks) */}
      <div className="max-w-[1104px] mx-auto flex flex-wrap justify-center gap-6 px-4 py-16">
        {productBlocks.map((block) => (
          <a
            key={block.label}
            href={block.href}
            className="flex flex-col items-center justify-center bg-[#EEEEEE] rounded-[30px] px-8 py-6 min-h-[300px] w-[200px] max-w-full hover:shadow-md transition-shadow duration-200"
          >
            <img src={block.img} alt={block.alt} width={block.w} height={block.h} className="h-auto" />
            <p className="text-[#FF6352] text-[18px] font-medium leading-[22px] text-center mt-4">
              {block.label}
            </p>
          </a>
        ))}
      </div>

      {/* Primary CTA pill */}
      <div className="text-center pb-14">
        <a
          href="/life-insurance-quotes/"
          className="inline-flex items-center gap-3 bg-[#FFD65A] text-[#BE6B15] text-[15px] font-medium tracking-[0.5px] rounded-[20px] px-6 py-2.5 hover:opacity-90 transition-opacity duration-200"
        >
          Find The Right Policy
          <ArrowRightLong className="w-4 h-4" />
        </a>
      </div>

      {/* Blue-grey feature section with teal circle shape divider */}
      <section className="px-4">
        <div className="relative overflow-hidden max-w-[1104px] mx-auto bg-[#BBC5CE] rounded-[32px] px-8 py-12 md:p-[60px]">
          <div
            className="absolute top-[3%] left-[3%] w-[600px] h-[600px] rounded-full bg-[rgba(0,142,159,0.25)]"
            aria-hidden
          />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <h2 className="text-[#262626] text-[34px] md:text-[52px] font-medium leading-[1.35]">
              Your life insurance should do more than pay out when you die.
            </h2>
            <div className="flex flex-col gap-6">
              {featureCards.map((card) => (
                <div
                  key={card.heading}
                  className="rounded-[32px] p-10 flex flex-col gap-4 text-[#010031]"
                  style={{ backgroundColor: card.bg }}
                >
                  <h4 className="text-[17px] font-bold">{card.heading}</h4>
                  <p className="text-[15px] leading-[1.7]">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative text-center font-semibold text-[24px] md:text-[28px] py-10 mt-2">
            <div>
              <a href="/connect-with-our-experts/" className="text-[#FF6352] hover:underline">
                Connect With Our Experts
              </a>
            </div>
            <a href="tel:877-787-7558" className="text-[#FF6352] hover:underline">
              877-787-7558
            </a>
          </div>
        </div>
      </section>

      {/* Related Articles post-card grid */}
      <section className="px-4 py-16">
        <h3 className="text-center text-[#262626] text-[24px] font-semibold">Related Articles</h3>
        <div className="max-w-[1104px] mx-auto flex flex-wrap justify-center gap-5 mt-10">
          {relatedArticles.map((article) => (
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

      <GenerationalTransferBand />
    </PageShell>
  );
}
