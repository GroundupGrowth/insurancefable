import type { Metadata } from 'next';
import { ArrowLeft, Check } from 'lucide-react';
import PageShell from './PageShell';
import EmbedSlot from './EmbedSlot';
import { getEbooks } from '../lib/content';
import { ebookDefaults, ebookLandingPath, type Ebook } from '../data/ebooks';

/* Landing page for one eBook/guide, at its own route (e.g. /kingdom-money/).
   The catalog on /ebooks-and-guides/ links here; this page shows the book's
   cover and copy with its opt-in form displayed IMMEDIATELY — the GHL/
   LeadConnector form pasted at /admin → Books under embed_slots `ebook:<slug>`.
   Books without an embed yet fall back to the shared request form, so every
   landing page captures leads.

   Slug vs route: the route can differ from the slug (the-ultimate-asset lives
   at /the-ultimate-asset-ebook/, money-secrets-of-the-wealthy at /money-secrets/).
   Route files pass the SLUG, so the embed slot key is always correct. */

async function resolveEbook(slug: string): Promise<Ebook | undefined> {
  // Respect admin overrides (site_ebooks), fall back to code defaults.
  const catalog = await getEbooks();
  return catalog.find((book) => book.slug === slug) ?? ebookDefaults.find((b) => b.slug === slug);
}

const REQUEST_ANCHOR = '/ebooks-and-guides/#request-a-guide';

export async function ebookLandingMetadata(slug: string): Promise<Metadata> {
  const book = ebookDefaults.find((b) => b.slug === slug);
  const path = ebookLandingPath(slug);
  const title = book ? `${book.title} — Free Download` : 'Free Download';
  const description =
    book?.text ??
    'Request your free copy from Insurance & Estates — whole life and infinite banking strategies.';
  return {
    title: { absolute: `${title} – I&E | Whole Life & Infinite Banking Strategies` },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}

export default async function EbookLanding({ slug }: { slug: string }) {
  const book = await resolveEbook(slug);

  // A route can only exist for a known book, but guard anyway.
  if (!book) {
    return (
      <PageShell>
        <section className="px-6 py-24">
          <div className="max-w-[88rem] mx-auto">
            <a href="/ebooks-and-guides/" className="text-[#0D1B3D]/60 hover:text-[#0D1B3D]">
              ← Back to eBooks &amp; Guides
            </a>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="px-6 pt-10 pb-6">
        <div className="max-w-[88rem] mx-auto">
          <a
            href="/ebooks-and-guides/"
            className="inline-flex items-center gap-2 text-sm text-[#0D1B3D]/60 hover:text-[#0D1B3D] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            eBooks &amp; Guides
          </a>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: cover + copy */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[#0D1B3D]/60 text-sm mb-3">{book.eyebrow}</p>
            <h1
              className="text-[#0D1B3D] text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] mb-6"
              style={{ letterSpacing: '-0.04em' }}
            >
              {book.title}
            </h1>
            {book.text && (
              <p className="text-[#0D1B3D]/70 text-lg leading-relaxed mb-8 max-w-xl">{book.text}</p>
            )}

            {book.image && (
              <div className="bg-[#F5F5F5] rounded-2xl p-8 inline-flex items-center justify-center">
                <img
                  src={book.image.src}
                  alt={book.image.alt}
                  className="max-h-80 w-auto object-contain rounded-sm shadow-[0_16px_40px_rgba(13,27,61,0.25)]"
                />
              </div>
            )}

            <ul className="mt-8 space-y-3">
              {[
                'Instant access — delivered to your inbox',
                'No cost, no obligation',
                'Written by licensed estate-planning and insurance experts',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-[#0D1B3D]/70">
                  <Check className="w-5 h-5 shrink-0 text-[#0D1B3D]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: the opt-in form, shown immediately */}
          <div className="bg-white rounded-3xl border border-black/5 p-6 md:p-8">
            <h2
              className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-6"
              style={{ letterSpacing: '-0.02em' }}
            >
              Get your free copy
            </h2>
            <EmbedSlot slotKey={`ebook:${book.slug}`}>
              {/* Fallback until an opt-in embed is pasted at /admin → Books:
                  send the reader to the shared request form on the catalog. */}
              <p className="text-[#0D1B3D]/70 leading-relaxed mb-6">
                Request <span className="font-medium text-[#0D1B3D]">{book.title}</span> and
                we&rsquo;ll send it straight to your inbox.
              </p>
              <a
                href={REQUEST_ANCHOR}
                className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
              >
                Request This Book
                <span className="bg-white rounded-full p-2">
                  <ArrowLeft className="w-5 h-5 text-[#0D1B3D] rotate-180" />
                </span>
              </a>
            </EmbedSlot>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
