import type { Metadata } from 'next';
import type { ReactNode } from 'react';
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
   Route files pass the SLUG, so the embed slot key is always correct.

   Sales copy: live runs full sales pages at these URLs. Each route folder holds
   a SalesSections.tsx with that page's live copy reproduced verbatim (from
   extraction/parsed/<slug>.json), restyled to the site's design language and
   passed here as children — rendered BELOW the hero + opt-in form block, which
   stays untouched. The shared building blocks (SalesSection etc.) are exported
   from this file. Live's in-page CTA buttons anchor to the form card
   (#get-your-copy) instead of hotlinking the LeadConnector form URL. */

async function resolveEbook(slug: string): Promise<Ebook | undefined> {
  // Respect admin overrides (site_ebooks), fall back to code defaults.
  const catalog = await getEbooks();
  return catalog.find((book) => book.slug === slug) ?? ebookDefaults.find((b) => b.slug === slug);
}

const REQUEST_ANCHOR = '/ebooks-and-guides/#request-a-guide';

export async function ebookLandingMetadata(
  slug: string,
  /* Live <title>/meta description overrides (from extraction/parsed/<slug>.json)
     — where live differs from the generated default, the page passes the live
     values and they are matched exactly (title absolute). */
  live?: { title?: string; description?: string },
): Promise<Metadata> {
  const book = ebookDefaults.find((b) => b.slug === slug);
  const path = ebookLandingPath(slug);
  const fallbackTitle = book ? `${book.title} — Free Download` : 'Free Download';
  const absoluteTitle =
    live?.title ?? `${fallbackTitle} – I&E | Whole Life & Infinite Banking Strategies`;
  const description =
    live?.description ??
    book?.text ??
    'Request your free copy from Insurance & Estates — whole life and infinite banking strategies.';
  return {
    title: { absolute: absoluteTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: live?.title ?? fallbackTitle,
      description,
      url: path,
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}

export default async function EbookLanding({
  slug,
  children,
}: {
  slug: string;
  /** Per-book sales sections (live copy), rendered below the hero + form block. */
  children?: ReactNode;
}) {
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

          {/* Right: the opt-in form, shown immediately. The id is the anchor
              target for the sales sections' CTA buttons below. */}
          <div
            id="get-your-copy"
            className="bg-white rounded-3xl border border-black/5 p-6 md:p-8 scroll-mt-32"
          >
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

      {children}
    </PageShell>
  );
}

/* ---------------------------------------------------------------------------
   Sales-section building blocks. Used by the per-route SalesSections.tsx files
   to present live copy (verbatim) in the site's design language: navy
   #0D1B3D headings, white cards, rounded-3xl, generous padding. */

/** One full-width section band; `tone` picks the card treatment. */
export function SalesSection({
  tone = 'white',
  children,
}: {
  tone?: 'white' | 'navy' | 'tint' | 'plain';
  children: ReactNode;
}) {
  const card =
    tone === 'navy'
      ? 'bg-[#0D1B3D] rounded-3xl px-8 py-14 md:px-16 md:py-16'
      : tone === 'tint'
        ? 'bg-[#F5F5F5] rounded-3xl border border-black/5 px-8 py-14 md:px-16 md:py-16'
        : tone === 'white'
          ? 'bg-white rounded-3xl border border-black/5 px-8 py-14 md:px-16 md:py-16'
          : '';
  return (
    <section className="px-6 pb-8 last:pb-24">
      <div className="max-w-[88rem] mx-auto">{card ? <div className={card}>{children}</div> : children}</div>
    </section>
  );
}

export function SalesHeading({ light = false, children }: { light?: boolean; children: ReactNode }) {
  return (
    <h2
      className={`${light ? 'text-white' : 'text-[#0D1B3D]'} text-3xl md:text-4xl font-medium leading-tight mb-6 max-w-4xl`}
      style={{ letterSpacing: '-0.03em' }}
    >
      {children}
    </h2>
  );
}

export function SalesSubheading({
  light = false,
  children,
}: {
  light?: boolean;
  children: ReactNode;
}) {
  return (
    <h3
      className={`${light ? 'text-white' : 'text-[#0D1B3D]'} text-xl md:text-2xl font-medium leading-snug mt-10 mb-4 first:mt-0 max-w-4xl`}
      style={{ letterSpacing: '-0.02em' }}
    >
      {children}
    </h3>
  );
}

/** Body copy container: spaces paragraphs, styles <strong>/<b>/<em> inline. */
export function SalesProse({ light = false, children }: { light?: boolean; children: ReactNode }) {
  const color = light
    ? 'text-white/70 [&_strong]:text-white [&_b]:text-white'
    : 'text-[#0D1B3D]/70 [&_strong]:text-[#0D1B3D] [&_b]:text-[#0D1B3D]';
  return (
    <div
      className={`${color} leading-relaxed space-y-4 max-w-3xl [&_strong]:font-medium [&_b]:font-medium`}
    >
      {children}
    </div>
  );
}

/** Bullet list rendered with the site's Check-icon idiom. */
export function SalesChecklist({ light = false, items }: { light?: boolean; items: ReactNode[] }) {
  return (
    <ul className="space-y-3 max-w-3xl my-6">
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex items-start gap-3 leading-relaxed ${
            light
              ? 'text-white/70 [&_strong]:text-white [&_b]:text-white'
              : 'text-[#0D1B3D]/70 [&_strong]:text-[#0D1B3D] [&_b]:text-[#0D1B3D]'
          } [&_strong]:font-medium [&_b]:font-medium`}
        >
          <Check className={`w-5 h-5 shrink-0 mt-0.5 ${light ? 'text-white' : 'text-[#0D1B3D]'}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Testimonial / pull quote. */
export function SalesQuote({ light = false, children }: { light?: boolean; children: ReactNode }) {
  return (
    <blockquote
      className={`border-l-2 pl-5 italic leading-relaxed max-w-3xl ${
        light ? 'border-white/25 text-white/70' : 'border-[#0D1B3D]/15 text-[#0D1B3D]/70'
      }`}
    >
      {children}
    </blockquote>
  );
}

/** Pill CTA in the site's button idiom; defaults to anchoring the opt-in form. */
export function SalesCta({
  href = '#get-your-copy',
  light = false,
  children,
}: {
  href?: string;
  light?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-3 font-medium pl-8 pr-2 py-2 rounded-full transition-colors duration-200 ${
        light
          ? 'bg-white text-[#0D1B3D] hover:bg-white/90'
          : 'bg-[#0D1B3D] text-white hover:bg-[#1C2E55]'
      }`}
    >
      {children}
      <span className={`rounded-full p-2 ${light ? 'bg-[#0D1B3D]' : 'bg-white'}`}>
        <ArrowLeft className={`w-5 h-5 rotate-180 ${light ? 'text-white' : 'text-[#0D1B3D]'}`} />
      </span>
    </a>
  );
}
