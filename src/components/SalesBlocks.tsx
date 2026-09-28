import type { ReactNode } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

/* ---------------------------------------------------------------------------
   Sales-section building blocks (moved out of EbookLanding.tsx 2026-09-28 so
   client components such as the webinar editor preview can use them without
   pulling in the server data layer). Used by the per-route SalesSections.tsx files
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
  /* External CTAs (Amazon listings etc.) open in a new tab so the sales page
     stays open; in-page anchors and internal routes keep the same tab. */
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
