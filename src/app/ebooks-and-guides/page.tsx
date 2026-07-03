import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import GuideRequestForm from './GuideRequestForm';

export const metadata: Metadata = {
  title: 'eBooks and Guides',
  description:
    'Wealth protection strategies trusted by thousands — free eBooks and guides written by estate planning attorneys and IBC practitioners who use them themselves.',
};

// eBook landing pages stay on WordPress until they're migrated
const BASE = 'https://www.insuranceandestates.com';

const featuredBooks = [
  {
    eyebrow: 'The Ultimate Free Download',
    title: 'The Self Banking Blueprint',
    text: 'A Modern Approach to the Infinite Banking Concept.',
    href: `${BASE}/self-banking-blueprint/`,
  },
  {
    eyebrow: 'Featured eBook',
    title: 'Kingdom Money',
    text: 'What wealthy families have quietly done for 100 years, and why your advisor never mentioned it.',
    href: `${BASE}/kingdom-money/`,
  },
  {
    eyebrow: 'Featured eBook',
    title: 'The Generational Transfer',
    text: 'Why Most Family Wealth Disappears and How to Stop It.',
    href: `${BASE}/generational-transfer/`,
  },
  {
    eyebrow: 'Volume Based Infinite Banking',
    title: 'The Ultimate Asset®',
    text: 'Nash proved the concept. This is the system that scales it.',
    href: `${BASE}/the-ultimate-asset-ebook/`,
  },
  {
    eyebrow: 'Featured eBook',
    title: 'The Intentional Wealth Effect',
    text: "Recapture your earnings and build wealth on purpose — principles inspired by Nelson Nash's Infinite Banking Concept.",
    href: `${BASE}/intentional-wealth-effect/`,
  },
];

const freeEbooks = [
  'Money Secrets of the Wealthy',
  "Estate Planner's Tactical Guide",
  'Financial Planning Has Failed',
];

const freeGuides = [
  '5 Important Estate Planning Steps',
  'Estate Planning Tactical Checklist',
  'Life Insurance Essentials Report',
];

export default function EbooksAndGuidesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Wealth Protection Strategies Trusted by Thousands"
        title="eBooks and Guides"
        intro="The financial system was designed for one generation — yours. Consume it, deplete it, pass on the debt. What it was never designed to do is transfer. These guides exist because that design is a choice, not a law. Every resource on this page was written by estate planning attorneys and IBC practitioners who use these strategies themselves. Browse the collection. Start where it resonates."
      />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
            style={{ letterSpacing: '-0.04em' }}
          >
            Featured eBooks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredBooks.map((book) => (
              <a
                key={book.title}
                href={book.href}
                className="group bg-white rounded-2xl p-7 min-h-64 flex flex-col border border-black/5 hover:border-black/10 transition-colors duration-200"
              >
                <p className="text-sm text-[#0D1B3D]/60 mb-2">{book.eyebrow}</p>
                <h3
                  className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {book.title}
                </h3>
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{book.text}</p>
                <span className="mt-auto pt-6 self-start inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full group-hover:bg-[#0D1B3D] group-hover:text-white transition-colors duration-200">
                  Get the Book
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}

            <div className="bg-[#0D1B3D] rounded-2xl p-7 min-h-64 flex flex-col">
              <p className="text-white/50 text-sm mb-2">Not sure where to start?</p>
              <h3
                className="text-white text-2xl md:text-3xl font-medium mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Follow the Curriculum
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                We&rsquo;ve ordered every guide from beginner to advanced so you can
                stop guessing at the sequence.
              </p>
              <a
                href="/start-your-journey/"
                className="mt-auto self-start inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#E5E7EB] transition-colors duration-200"
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
            style={{ letterSpacing: '-0.04em' }}
          >
            Free eBooks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {freeEbooks.map((title) => (
              <a
                key={title}
                href="#request-a-guide"
                className="group bg-white rounded-2xl p-7 flex flex-col min-h-48 border border-black/5 hover:border-black/10 transition-colors duration-200"
              >
                <p className="text-sm text-[#0D1B3D]/60 mb-2">Free eBook</p>
                <h3
                  className="text-[#0D1B3D] text-xl md:text-2xl font-medium leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {title}
                </h3>
                <span className="mt-auto pt-6 self-start inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full group-hover:bg-[#0D1B3D] group-hover:text-white transition-colors duration-200">
                  Request This eBook
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
            style={{ letterSpacing: '-0.04em' }}
          >
            Free Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {freeGuides.map((title) => (
              <a
                key={title}
                href="#request-a-guide"
                className="group bg-white rounded-2xl p-7 flex flex-col min-h-48 border border-black/5 hover:border-black/10 transition-colors duration-200"
              >
                <p className="text-sm text-[#0D1B3D]/60 mb-2">Free Guide</p>
                <h3
                  className="text-[#0D1B3D] text-xl md:text-2xl font-medium leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {title}
                </h3>
                <span className="mt-auto pt-6 self-start inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full group-hover:bg-[#0D1B3D] group-hover:text-white transition-colors duration-200">
                  Request This Guide
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <GuideRequestForm />

      <LeadMagnetSection />
    </PageShell>
  );
}
