import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import EbookCard from '../../components/EbookCard';
import GuideRequestForm from './GuideRequestForm';

export const metadata: Metadata = {
  title: 'eBooks and Guides',
  description:
    'Wealth protection strategies trusted by thousands — free eBooks and guides written by estate planning attorneys and IBC practitioners who use them themselves.',
};

// eBook landing pages stay on WordPress until they're migrated
const BASE = 'https://www.insuranceandestates.com';

/* Each book/guide has an embed slot (ebook:<slug>) manageable at /admin.
   When an opt-in embed is saved there, the card opens it inline; until then
   it falls back to the WordPress landing page or the generic request form. */
const featuredBooks = [
  {
    slug: 'self-banking-blueprint',
    eyebrow: 'The Ultimate Free Download',
    title: 'The Self Banking Blueprint',
    text: 'A Modern Approach to the Infinite Banking Concept.',
    href: `${BASE}/self-banking-blueprint/`,
  },
  {
    slug: 'kingdom-money',
    eyebrow: 'Featured eBook',
    title: 'Kingdom Money',
    text: 'What wealthy families have quietly done for 100 years, and why your advisor never mentioned it.',
    href: `${BASE}/kingdom-money/`,
  },
  {
    slug: 'generational-transfer',
    eyebrow: 'Featured eBook',
    title: 'The Generational Transfer',
    text: 'Why Most Family Wealth Disappears and How to Stop It.',
    href: `${BASE}/generational-transfer/`,
  },
  {
    slug: 'the-ultimate-asset',
    eyebrow: 'Volume Based Infinite Banking',
    title: 'The Ultimate Asset®',
    text: 'Nash proved the concept. This is the system that scales it.',
    href: `${BASE}/the-ultimate-asset-ebook/`,
  },
  {
    slug: 'intentional-wealth-effect',
    eyebrow: 'Featured eBook',
    title: 'The Intentional Wealth Effect',
    text: "Recapture your earnings and build wealth on purpose — principles inspired by Nelson Nash's Infinite Banking Concept.",
    href: `${BASE}/intentional-wealth-effect/`,
  },
];

const freeEbooks = [
  { slug: 'money-secrets-of-the-wealthy', title: 'Money Secrets of the Wealthy' },
  { slug: 'estate-planners-tactical-guide', title: "Estate Planner's Tactical Guide" },
  { slug: 'financial-planning-has-failed', title: 'Financial Planning Has Failed' },
];

const freeGuides = [
  { slug: '5-important-estate-planning-steps', title: '5 Important Estate Planning Steps' },
  { slug: 'estate-planning-tactical-checklist', title: 'Estate Planning Tactical Checklist' },
  { slug: 'life-insurance-essentials-report', title: 'Life Insurance Essentials Report' },
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
              <EbookCard
                key={book.slug}
                slotKey={`ebook:${book.slug}`}
                eyebrow={book.eyebrow}
                title={book.title}
                text={book.text}
                fallbackHref={book.href}
                ctaLabel="Get the Book"
              />
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
            {freeEbooks.map((book) => (
              <EbookCard
                key={book.slug}
                slotKey={`ebook:${book.slug}`}
                eyebrow="Free eBook"
                title={book.title}
                fallbackHref="#request-a-guide"
                ctaLabel="Request This eBook"
              />
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
            {freeGuides.map((guide) => (
              <EbookCard
                key={guide.slug}
                slotKey={`ebook:${guide.slug}`}
                eyebrow="Free Guide"
                title={guide.title}
                fallbackHref="#request-a-guide"
                ctaLabel="Request This Guide"
              />
            ))}
          </div>
        </div>
      </section>

      <GuideRequestForm />

      <LeadMagnetSection />
    </PageShell>
  );
}
