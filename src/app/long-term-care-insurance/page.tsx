import type { Metadata } from 'next';
import { Scale, Boxes, Laptop } from 'lucide-react';
import PageShell from '../../components/PageShell';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';

/* 1:1 clone of the live /long-term-care-insurance/ page
   (extraction/parsed/long-term-care-insurance.json +
   extraction/screens/src/long-term-care-insurance.jpeg). Light-blue hero, two
   .life-blocks icon cards, gold "Compare Life Insurance Quotes" pill, the
   blue-grey "Protecting your family's financial future" panel with the teal
   circle shape divider and three tinted card--item blocks, the Related Articles
   post-card grid, and the Generational Transfer band. Follows the same
   conventions as src/app/life-insurance/page.tsx. */

export const metadata: Metadata = {
  title: {
    absolute: 'Long Term Care Insurance – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    "Long Term Care Helping you answer life's big questions. Regardless of your age or health status, we have options for you.  Long Term Care Insurance Life In",
  alternates: { canonical: '/long-term-care-insurance/' },
};

/* fas fa-arrow-right-long, as on the live buttons */
function ArrowRightLong({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" className={className} fill="currentColor">
      <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
    </svg>
  );
}

/* .life-blocks product icon cards */
const productBlocks = [
  {
    href: '/best-long-term-care-insurance-companies/',
    img: '/wp-content/uploads/long-term-care-med-1-153x200.webp',
    alt: 'Long Term Care Med 1.webp',
    label: 'Long Term Care Insurance',
    w: 153,
    h: 200,
  },
  {
    href: '/long-term-care-rider-vs-chronic-illness-rider/',
    img: '/wp-content/uploads/Life-Insurance-policy-med-1-300x188.webp',
    alt: 'Life Insurance Policy Med 1.webp',
    label: 'Life Insurance with LTC/Chronic Illness Rider',
    w: 300,
    h: 188,
  },
];

/* .card--item blocks. Icons on live are Font Awesome solid
   (fa-scale-unbalanced / fa-cubes-stacked / fa-house-laptop) — approximated
   with the nearest lucide glyphs. Tints sampled from the live screenshot. */
const howItWorks = [
  {
    Icon: Scale,
    bg: '#E0ECE8',
    heading: 'Determine what’s most important to you.',
    text: 'Why are you looking to purchase a life insurance policy? What type of life insurance policy best addresses your unique goals?',
  },
  {
    Icon: Boxes,
    bg: '#F9D6D0',
    heading: 'Shop multiple options simultaneously!',
    text: 'Don’t settle for just one quote or one policy choice; take your time and have your agent review the different life insurance companies with you before you make any decisions.',
  },
  {
    Icon: Laptop,
    bg: '#F0F5B5',
    heading: 'Apply from the comfort of home.',
    text: 'Once you’ve determined what type of insurance is right for you, applying for coverage has never been easier. In fact, you may even be able to complete the entire application process over the phone!',
  },
];

const relatedArticles = [
  {
    href: '/filial-responsibility-laws-am-i-responsible-for-my-parents-medical-bills/',
    img: '/wp-content/uploads/filial-responsibility-laws-150x100.jpg',
    alt: 'filial responsibility states',
    title:
      'Filial Responsibility [Why You Could Be Held Responsible for Your Parent’s Medical Bills]',
  },
  {
    href: '/long-term-care-rider-vs-chronic-illness-rider/',
    img: '/wp-content/uploads/Long-Term-Care-Rider-vs-Chronic-Illness-Rider-150x100.jpg',
    alt: 'Comparison table of long-term care rider vs chronic illness rider showing differences in eligibility, benefits, consumer protections, and tax treatment',
    title: 'Long Term Care Rider vs. Chronic Illness Rider: Which Actually Protects You?',
  },
  {
    href: '/best-long-term-care-insurance-companies/',
    img: '/wp-content/uploads/long-term-care-insurance-companies-150x100.jpg',
    alt: 'Comparison of standalone, hybrid, and life insurance approaches to long-term care coverage with top carriers for each',
    title: 'Best Long-Term Care Insurance Companies: 3 Approaches Compared (2026)',
  },
  {
    href: '/asset-based-long-term-care/',
    img: '/wp-content/uploads/asset-based-long-term-care-insurance-150x100.jpg',
    alt: 'reviewing asset-based long-term care insurance options with financial advisor, comparing hybrid LTC policies for retirement planning',
    title: 'Asset-Based Long-Term Care Insurance: Hybrid LTC Pros, Cons & 2026 Guide',
  },
  {
    href: '/top-10-best-life-insurance-companies/',
    img: '/wp-content/uploads/best-life-insurance-companies-1-150x100.jpg',
    alt: 'Comparison table ranking the top 10 best life insurance companies for 2026 by A.M. Best rating, Comdex score, and distribution model including Penn Mutual, MassMutual, and Northwestern Mutual',
    title: 'Top 10 Best Life Insurance Companies (2026 Independent Rankings)',
  },
];

export default function LongTermCareInsurancePage() {
  return (
    <PageShell>
      {/* Hero — light blue band with the big rounded bottom-left corner */}
      <section className="bg-[#EBF3F5] rounded-bl-[120px] md:rounded-bl-[220px]">
        <div className="max-w-[1104px] mx-auto grid md:grid-cols-2 gap-10 items-center px-6 py-14 md:py-20">
          <div>
            <h3 className="text-[#154670] text-[44px] md:text-[62px] font-normal tracking-[-2px] leading-[1.05]">
              Long Term Care
            </h3>
            <p className="text-[#2A5F86] text-[17px] leading-[1.7] mt-4 max-w-[430px]">
              Helping you answer life&#39;s big questions. Regardless of your age or health status,
              we have options for you.&nbsp;
            </p>
            <p className="text-[#2A5F86] text-[17px] leading-[1.7] mt-5 max-w-[430px]">
              Our comprehensive long-term care insurance plans provide essential protection against
              future healthcare costs while preserving your assets and independence.
            </p>
          </div>
          <div>
            <img
              src="/wp-content/uploads/life-insurance.webp"
              alt="Life Insurance"
              width={646}
              height={500}
              className="w-full max-w-[646px] h-auto mx-auto"
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
            className="flex flex-col items-center justify-center bg-[#EEEEEE] rounded-[30px] px-8 py-6 min-h-[300px] w-[280px] max-w-full hover:shadow-md transition-shadow duration-200"
          >
            <img
              src={block.img}
              alt={block.alt}
              width={block.w}
              height={block.h}
              className="h-auto max-w-full"
            />
            <p className="text-[#FF6352] text-[18px] font-medium leading-[22px] text-center mt-4">
              {block.label}
            </p>
          </a>
        ))}
      </div>

      {/* Primary CTA pill (bricks-button lg bricks-background-primary) */}
      <div className="text-center pb-14">
        <a
          href="/life-insurance-quotes/"
          className="inline-flex items-center gap-3 bg-[#FFC758] text-[#FF6352] text-[15px] font-medium tracking-[0.5px] rounded-[20px] px-6 py-2.5 hover:opacity-90 transition-opacity duration-200"
        >
          Compare Life Insurance Quotes
          <ArrowRightLong className="w-4 h-4" />
        </a>
      </div>

      {/* Blue-grey panel with the teal circle shape divider */}
      <section className="px-4">
        <div className="relative overflow-hidden max-w-[1104px] mx-auto bg-[#BBC5CE] rounded-[32px] px-8 py-12 md:p-[60px]">
          <div
            className="absolute top-[3%] left-[3%] w-[600px] h-[600px] rounded-full bg-[rgba(0,142,159,0.24)]"
            aria-hidden
          />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <h2 className="text-[#262626] text-[34px] md:text-[52px] font-medium leading-[1.2]">
              Protecting your family&rsquo;s financial future is easier than you might think!
            </h2>
            <div className="flex flex-col gap-5">
              {howItWorks.map(({ Icon, ...card }) => (
                <div
                  key={card.heading}
                  className="rounded-[24px] p-7 flex items-start gap-5 text-[#010031]"
                  style={{ backgroundColor: card.bg }}
                >
                  <Icon className="w-11 h-11 shrink-0 text-[#0F0F1E]" strokeWidth={2} aria-hidden />
                  <div>
                    <h4 className="text-[17px] font-bold">{card.heading}</h4>
                    <p className="text-[14px] leading-[1.6] mt-2">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative text-center text-[24px] md:text-[28px] py-10 mt-2">
            <div className="text-[#4A5560]">Give us a call today!</div>
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
