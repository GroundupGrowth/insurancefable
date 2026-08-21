import type { Metadata } from 'next';
import { ArrowUpRight, Download, Mail } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';

/* /media/ — the press & media hub (client, 2026-08-21): one shareable link
   holding every media asset, so a host or producer gets sent a single URL and
   downloads what they need. Route note: public/media/* serves the actual
   files; this page owns the bare /media/ path — Next serves static files for
   exact matches only, so the two never collide.

   Adding an asset (e.g. Erik's one-pager when its content exists) is one
   entry in the arrays below. Never list a file that isn't in public/. */

export const metadata: Metadata = {
  title: 'Media & Press',
  description:
    'Press and media assets for Insurance & Estates: media one-pagers, headshots, and brand marks, ready to download. Booking contact included.',
  alternates: { canonical: '/media/' },
};

const BOOKING_EMAIL = 'jasonk@insuranceandestates.com';

/* Media packages: a landing page plus its downloadable one-pager. */
const kits = [
  {
    title: 'Generation Wealth',
    who: 'Barry Brooksby & Steve Gibbs, JD, AEP® — booked as a pair.',
    formats: ['Podcasts', 'YouTube', 'Speaking'],
    pageHref: '/generation-wealth/',
    pdfHref: '/media/generation-wealth-media-kit.pdf',
  },
  /* Erik's package goes here once his story/credentials are supplied —
     same shape: media page + generated one-pager. */
];

const headshots = [
  { name: 'Barry Brooksby', file: '/wp-content/uploads/Barry-1-1.webp' },
  { name: 'Steve Gibbs, JD, AEP®', file: '/wp-content/uploads/steven_gibbs.webp' },
  { name: 'Erik Hayton', file: '/wp-content/uploads/erik-hayton-.webp' },
  { name: 'Denise Boisvert', file: '/wp-content/uploads/Denise-1.webp' },
];

const brandAssets = [
  { name: 'I&E wordmark', file: '/wp-content/uploads/ie_logo_web.webp' },
  { name: 'I&E icon', file: '/wp-content/uploads/ie-logo-icon-small-1.webp' },
];

const downloadPill =
  'inline-flex items-center gap-2 bg-[#0D1B3D] text-white font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200';

export default function MediaPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Press &amp; media"
        title="Media"
        intro={
          <>
            Everything you need to feature our experts, on one link: media one-pagers,
            headshots, and brand marks — all downloadable. For anything not listed here,
            use the booking contact at the bottom.
          </>
        }
      />

      {/* Media packages */}
      <section className="px-6 pb-20">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-3xl md:text-4xl font-medium leading-tight mb-10"
            style={{ letterSpacing: '-0.03em' }}
          >
            Media packages
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {kits.map((kit) => (
              <div
                key={kit.title}
                className="bg-white rounded-2xl border border-black/5 p-8 md:p-10"
              >
                <h3
                  className="text-[#0D1B3D] text-2xl font-medium mb-2"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {kit.title}
                </h3>
                <p className="text-[#0D1B3D]/70 leading-relaxed mb-4">{kit.who}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {kit.formats.map((format) => (
                    <span
                      key={format}
                      className="bg-[#F5F5F5] text-[#0D1B3D] text-sm font-medium px-4 py-1.5 rounded-full"
                    >
                      {format}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <a href={kit.pdfHref} download className={downloadPill}>
                    <Download className="w-4 h-4" />
                    Download the one-pager
                  </a>
                  <a
                    href={kit.pageHref}
                    className="inline-flex items-center gap-1.5 text-[#0D1B3D]/70 text-sm font-medium hover:text-[#0D1B3D] transition-colors duration-200"
                  >
                    Full media page
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Headshots */}
      <section className="px-6 pb-20">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-3xl md:text-4xl font-medium leading-tight mb-10"
            style={{ letterSpacing: '-0.03em' }}
          >
            Headshots
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {headshots.map((person) => (
              <div
                key={person.name}
                className="bg-white rounded-2xl border border-black/5 p-6 flex flex-col items-center text-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.file}
                  alt={person.name}
                  width={112}
                  height={112}
                  className="w-28 h-28 rounded-full object-cover object-top mb-4"
                />
                <p className="text-[#0D1B3D] font-medium leading-snug mb-4">{person.name}</p>
                <a
                  href={person.file}
                  download
                  className="mt-auto inline-flex items-center gap-1.5 text-[#0D1B3D]/70 text-sm font-medium hover:text-[#0D1B3D] transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand assets */}
      <section className="px-6 pb-20">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-3xl md:text-4xl font-medium leading-tight mb-10"
            style={{ letterSpacing: '-0.03em' }}
          >
            Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brandAssets.map((asset) => (
              <div
                key={asset.name}
                className="bg-white rounded-2xl border border-black/5 p-6 flex flex-col items-center text-center"
              >
                <div className="h-28 flex items-center justify-center mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset.file} alt={asset.name} className="max-h-16 max-w-[10rem] w-auto" />
                </div>
                <p className="text-[#0D1B3D] font-medium leading-snug mb-4">{asset.name}</p>
                <a
                  href={asset.file}
                  download
                  className="mt-auto inline-flex items-center gap-1.5 text-[#0D1B3D]/70 text-sm font-medium hover:text-[#0D1B3D] transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="px-6 pb-16">
        <div className="max-w-[88rem] mx-auto bg-[#0D1B3D] rounded-3xl px-8 py-16 md:px-16 text-center">
          <h2
            className="text-white text-3xl md:text-5xl font-medium leading-tight mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Booking
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Interview and speaking requests, or an asset you don&rsquo;t see here.
          </p>
          <a
            href={`mailto:${BOOKING_EMAIL}`}
            className="inline-flex items-center gap-2.5 bg-white text-[#0D1B3D] font-medium px-7 py-3 rounded-full hover:bg-white/90 transition-colors duration-200"
          >
            <Mail className="w-4 h-4" />
            Book Now
          </a>
        </div>
      </section>
    </PageShell>
  );
}
