import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';
import GuideRequestForm from './GuideRequestForm';

/* 1:1 clone of the live /ebooks-and-guides/ page
   (extraction/parsed/ebooks-and-guides.json + screenshot).
   Live section order: green wave hero, "Wealth Protection Strategies Trusted
   by Thousands" intro, 5 featured full-width book banners (each a link to its
   landing page), the "Free eBooks" and "Free Guides" grids with a Free Access
   request form per book, then the Generational Transfer band.
   Featured banner backgrounds are sampled from the screenshot except the
   Intentional Wealth Effect card (#BBC5CE = live .bg-blue-grey-dark). */

export const metadata: Metadata = {
  title: {
    absolute: 'eBooks and Guides – I&E | Whole Life & Infinite Banking Strategies',
  },
  // Live meta description verbatim
  description: 'Free eBooks Free Guides Return to Resources Page',
  alternates: { canonical: '/ebooks-and-guides/' },
};

/* Exact live shape divider wave — fill #dff4dc on this page */
function HeroWave() {
  return (
    <div className="absolute inset-x-0 top-0 h-[400px] overflow-hidden pointer-events-none" aria-hidden>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 133"
        className="absolute left-1/2 top-0 h-full w-[220%]"
        style={{ fill: '#dff4dc', transform: 'translateX(-50%) rotate(180deg)' }}
      >
        <path
          fillRule="evenodd"
          d="M0,134 C66,66 121,33 165,35 C231,38 233,82 369,81 C505,80 495,2 589,1 C683,7.99360578e-15 695,49 795,49 C895,49 899,6 994,6 C1057.33333,6 1126,48.6666667 1200,134 L0,134 Z"
          transform="translate(0 -1)"
        />
      </svg>
    </div>
  );
}

/* Grid books — covers + per-book Free Access request flow, verbatim from live */
const freeEbooks = [
  {
    title: 'Money Secrets of the Wealthy',
    img: '/wp-content/uploads/money-secrets-of-the-wealthy_sm-128x200.jpg',
    alt: 'Money secrets of the wealthy sm',
  },
  {
    title: "Estate Planner's Tactical Guide",
    img: '/wp-content/uploads/Estate-Planners-Tactical-Guide-Book-Cover-2020-128x200.jpg',
    alt: "Estate Planner's Tactical Guide Book Cover",
  },
  {
    title: 'Financial Planning Has Failed',
    img: '/wp-content/uploads/financial-planning-has-failed-cover-167x200.jpg',
    alt: 'Financial planning has failed cover',
  },
];

const freeGuides = [
  {
    title: '5 Important Estate Planning Steps',
    img: '/wp-content/uploads/5ImportantEstatePlanningSteps-167x200.jpg',
    alt: '5ImportantEstatePlanningSteps',
  },
  {
    title: 'Estate Planning Tactical Checklist',
    img: '/wp-content/uploads/EstatePlanningTacticalChecklist-167x200.jpg',
    alt: 'EstatePlanningTacticalChecklist',
  },
  {
    title: 'Life Insurance Essentials Report',
    img: '/wp-content/uploads/Life-Insurance-Essentials-Report-small-copy-165x200.jpg',
    alt: 'Life Insurance Essentials Report',
  },
];

function FreeAccessGrid({
  heading,
  books,
}: {
  heading: string;
  books: { title: string; img: string; alt: string }[];
}) {
  return (
    <section className="px-6 py-8">
      <div className="max-w-[1100px] mx-auto bg-[rgba(228,241,247,0.69)] rounded-[2rem] px-8 md:px-16 py-14 md:py-16">
        <h2 className="text-[#262626] font-medium text-[30px] md:text-[38px] text-center">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-12 items-start">
          {books.map((book) => (
            <div key={book.title} className="flex flex-col items-center">
              <img src={book.img} alt={book.alt} className="h-[200px] w-auto" />
              <div className="w-full max-w-[220px] mt-5">
                <GuideRequestForm title={book.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EbooksAndGuidesPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative">
        <HeroWave />
        <div className="relative max-w-[900px] mx-auto px-6 pt-16 md:pt-20 pb-8 text-center">
          <h3 className="text-[#262626] font-medium text-[38px] md:text-[50px] leading-[1.2]">
            eBooks and Guides
          </h3>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 pt-10 pb-4">
        <div className="max-w-[760px] mx-auto text-center">
          <h3 className="text-[#262626] font-medium text-[28px] md:text-[36px] leading-[1.3]">
            Wealth Protection Strategies Trusted by Thousands
          </h3>
          <p className="text-[#363636] text-[15px] leading-[1.7] mt-5">
            The financial system was designed for one generation &mdash; yours.
            Consume it, deplete it, pass on the debt. What it was never designed to
            do is transfer. These guides exist because that design is a choice, not
            a law. Every resource on this page was written by estate planning
            attorneys and IBC practitioners who use these strategies themselves. We
            built the most complete Infinite Banking library on the web because the
            information should be free. Browse the collection. Start where it
            resonates.
          </p>
        </div>
      </section>

      {/* Featured book banners — each links to its live landing page */}
      <section className="px-6 pt-8 pb-4">
        <div className="max-w-[980px] mx-auto">
          {/* Kingdom Money */}
          <a href="/kingdom-money/" className="block bg-[#D5CEC0] rounded-2xl px-8 md:px-14 py-10">
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-[#26456E] font-bold text-[30px] md:text-[38px] leading-tight">
                  Kingdom Money
                </h3>
                <p className="text-[#363636] text-[14px] leading-[1.6] mt-3 max-w-[420px] mx-auto md:mx-0">
                  What wealthy families have quietly done for 100 years, and why your
                  advisor never mentioned it.
                </p>
              </div>
              <img
                src="/wp-content/uploads/kingdom-money-145x200.webp"
                alt="Kingdom money"
                className="h-[200px] w-auto rounded-md mx-auto"
              />
            </div>
          </a>

          {/* The Self Banking Blueprint */}
          <a
            href="/self-banking-blueprint/"
            className="block bg-[#2A6493] rounded-2xl px-8 md:px-14 py-10 mt-8"
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div className="text-center md:text-left text-white">
                <p className="text-[14px]">
                  The Ultimate <strong>FREE</strong> Download
                </p>
                <h3 className="font-bold text-[30px] md:text-[38px] leading-tight mt-2">
                  The Self Banking Blueprint
                </h3>
                <p className="text-[14px] leading-[1.6] mt-3">
                  A Modern Approach To The Infinite Banking Concept
                </p>
              </div>
              <img
                src="/wp-content/uploads/THE-SELF-BANKING-BLUEPRINT-Book-Cover-125x200.webp"
                alt="THE SELF BANKING BLUEPRINT Book Cover"
                className="h-[200px] w-auto rounded-md mx-auto"
              />
            </div>
          </a>

          {/* The Generational Transfer */}
          <a
            href="/generational-transfer/"
            className="block bg-[#F0E092] rounded-2xl px-8 md:px-14 py-10 mt-8"
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-[#E2574C] font-bold text-[30px] md:text-[38px] leading-tight">
                  The Generational Transfer
                </h3>
                <p className="text-[#363636] text-[14px] font-semibold leading-[1.6] mt-3">
                  Why Most Family Wealth Disappears and How to Stop It.
                </p>
              </div>
              <img
                src="/wp-content/uploads/generational-transfer-cover-146x200.webp"
                alt="Generational transfer cover"
                className="h-[200px] w-auto rounded-md mx-auto"
              />
            </div>
          </a>

          {/* The Ultimate Asset® */}
          <a
            href="/the-ultimate-asset-ebook/"
            className="block bg-[#BFE0E2] rounded-2xl px-8 md:px-14 py-10 mt-8"
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-[#26456E] font-bold text-[30px] md:text-[38px] leading-tight">
                  The Ultimate Asset&reg;
                </h3>
                <p className="text-[#E8963D] text-[18px] mt-2">
                  Volume Based Infinite Banking
                </p>
                <p className="text-[#262626] text-[14px] font-semibold leading-[1.6] mt-2">
                  Nash proved the concept. This is the system that scales it.
                </p>
              </div>
              <img
                src="/wp-content/uploads/Ultimate-Asset-Cover-Silver-133x200.webp"
                alt="Ultimate asset cover silver"
                className="h-[200px] w-auto rounded-md mx-auto"
              />
            </div>
          </a>

          {/* The Intentional Wealth Effect — live .bg-blue-grey-dark */}
          <a
            href="/intentional-wealth-effect/"
            className="block bg-[#BBC5CE] rounded-2xl px-8 md:px-14 py-10 mt-8"
          >
            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-[#FF6352] text-[24px] md:text-[28px] leading-tight">
                  Get Your Copy of
                </h3>
                <h2 className="text-[#FF6352] font-bold text-[30px] md:text-[38px] leading-tight mt-1">
                  The Intentional Wealth Effect
                </h2>
              </div>
              <img
                src="/wp-content/uploads/The-Intentional-Wealth-Effect-Marketing-Page-Graphic-2-600x362.webp"
                alt="The Intentional Wealth Effect Marketing Page Graphic (2)"
                className="w-full max-w-[480px] h-auto mx-auto"
              />
            </div>
          </a>
        </div>
      </section>

      <FreeAccessGrid heading="Free eBooks" books={freeEbooks} />
      <FreeAccessGrid heading="Free Guides" books={freeGuides} />

      <GenerationalTransferBand />
    </PageShell>
  );
}
