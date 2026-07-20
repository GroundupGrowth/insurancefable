import type { Metadata } from 'next';
import { Scale, Boxes, Laptop } from 'lucide-react';
import PageShell from '../../components/PageShell';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';

/* 1:1 clone of the live /annuities/ page (extraction/parsed/annuities.json +
   extraction/screens/src/annuities.jpeg). Lavender hero with the framed retiree
   photo, single "Annuities" life-block icon card, the gold "Compare Life
   Insurance Quotes" pill, the blue-grey "Protecting your family's financial
   future" panel with the teal circle shape divider and three tinted card--item
   blocks, then the (empty on live) Related Articles heading and the
   Generational Transfer band. Follows the same conventions as
   src/app/life-insurance/page.tsx. */

export const metadata: Metadata = {
  title: { absolute: 'Annuities – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    "Annuitites Helping you answer life's big questions. Regardless of your age or health status, we have options for you.  Disability Insurance Compare Life In",
  alternates: { canonical: '/annuities/' },
};

/* fas fa-arrow-right-long, as on the live buttons */
function ArrowRightLong({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" className={className} fill="currentColor">
      <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
    </svg>
  );
}

/* .life-blocks product icon card — one entry on this page */
const productBlocks = [
  {
    href: '/best-annuity-companies/',
    img: '/wp-content/uploads/time-is-money-270x200.webp',
    alt: 'Time Is Money.webp',
    label: 'Annuities',
    w: 270,
    h: 200,
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

export default function AnnuitiesPage() {
  return (
    <PageShell>
      {/* Hero — lavender band with the big rounded bottom-left corner */}
      <section className="bg-[#E6E3EC] rounded-bl-[120px] md:rounded-bl-[220px]">
        <div className="max-w-[1104px] mx-auto grid md:grid-cols-2 gap-10 items-center px-6 py-14 md:py-20">
          <div>
            <h3 className="text-[#52457A] text-[44px] md:text-[62px] font-normal tracking-[-2px] leading-[1.05]">
              Annuities
            </h3>
            <p className="text-[#5C5273] text-[17px] leading-[1.7] mt-4 max-w-[430px]">
              Helping you answer life&#39;s big questions. Regardless of your age or health status,
              we have options for you.&nbsp;
            </p>
            <p className="text-[#5C5273] text-[17px] leading-[1.7] mt-5 max-w-[430px]">
              Our customized annuity solutions provide the financial security and peace of mind you
              need for your retirement journey
            </p>
          </div>
          <div>
            <img
              src="/wp-content/uploads/annuities-600x500.webp"
              alt="Annuities"
              width={600}
              height={500}
              className="w-full max-w-[600px] h-auto mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Product icon card (.life-blocks) */}
      <div className="max-w-[1104px] mx-auto flex flex-wrap justify-center gap-6 px-4 py-16">
        {productBlocks.map((block) => (
          <a
            key={block.label}
            href={block.href}
            className="flex flex-col items-center justify-center bg-[#EEEEEE] rounded-[30px] px-8 py-6 min-h-[300px] w-[320px] max-w-full hover:shadow-md transition-shadow duration-200"
          >
            <img src={block.img} alt={block.alt} width={block.w} height={block.h} className="h-auto max-w-full" />
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
          className="inline-flex items-center gap-3 bg-[#FF6352] text-white text-[15px] font-medium tracking-[0.5px] rounded-[20px] px-6 py-2.5 hover:opacity-90 transition-opacity duration-200"
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

      {/* Trailing paragraph, as on live (repeated copy below the panel) */}
      <p className="max-w-[1104px] mx-auto px-6 pt-8 text-center text-[#363636] text-[15px] leading-[1.7]">
        Why are you looking to purchase a life insurance policy? What type of life insurance policy
        best addresses your unique goals?
      </p>

      {/* Related Articles — the live loop renders no posts on this page */}
      <section className="px-4 py-16">
        <h3 className="text-center text-[#262626] text-[24px] font-semibold">Related Articles</h3>
      </section>

      <GenerationalTransferBand />
    </PageShell>
  );
}
