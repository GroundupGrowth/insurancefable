import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import EbookCard from '../../components/EbookCard';
import GuideRequestForm from './GuideRequestForm';
import { getEbooks, getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('ebooks-and-guides');
  return pageMetadata(content);
}

/* The catalog is managed in /admin → Books (site_ebooks in Supabase, code
   defaults in src/data/ebooks.ts until first save). Each book's opt-in embed
   lives in embed_slots under ebook:<slug>; when one is pasted, the card opens
   it inline instead of linking out. */

export default async function EbooksAndGuidesPage() {
  const content = await getPageContent('ebooks-and-guides');
  const ebooks = await getEbooks();
  const featuredBooks = ebooks.filter((book) => book.category === 'featured');
  const freeEbooks = ebooks.filter((book) => book.category === 'free-ebook');
  const freeGuides = ebooks.filter((book) => book.category === 'free-guide');
  return (
    <PageShell>
      <PageHero eyebrow={content.eyebrow} title={content.heroTitle} intro={content.heroIntro} />

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
                eyebrow={book.eyebrow}
                title={book.title}
                text={book.text}
                fallbackHref={book.href}
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
                eyebrow={guide.eyebrow}
                title={guide.title}
                text={guide.text}
                fallbackHref={guide.href}
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
