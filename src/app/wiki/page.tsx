import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import CtaBand from '../../components/CtaBand';
import { getWikiTerms } from '../../lib/wiki';
import { SITE_URL } from '../../lib/content';

export const revalidate = 300;

const TITLE = 'Insurance & Estates Wiki – Plain-English Insurance Definitions';
const DESCRIPTION =
  'Every whole life insurance, infinite banking, and estate planning term explained in plain English — no jargon, no sales pitch, just clear definitions.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/wiki/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/wiki/',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

export default async function WikiIndexPage() {
  const terms = await getWikiTerms();

  // A–Z groups, in order
  const groups = new Map<string, typeof terms>();
  for (const term of terms) {
    const letter = term.term[0]?.toUpperCase() ?? '#';
    const key = /[A-Z]/.test(letter) ? letter : '#';
    groups.set(key, [...(groups.get(key) ?? []), term]);
  }

  const termSetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Insurance & Estates Wiki',
    description: DESCRIPTION,
    url: `${SITE_URL}/wiki/`,
    hasDefinedTerm: terms.map((term) => ({
      '@type': 'DefinedTerm',
      name: term.term,
      description: term.short,
      url: `${SITE_URL}/wiki/${term.slug}/`,
    })),
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termSetJsonLd) }}
      />
      <PageHero
        eyebrow="The I&E Wiki"
        title="Insurance, explained in plain English."
        intro="The industry hides behind jargon. Here is every term that matters — whole life, infinite banking, estate planning — explained the way we'd explain it across the table."
      />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto flex flex-col gap-12">
          {[...groups.entries()].map(([letter, group]) => (
            <div key={letter}>
              <p
                className="text-[#0D1B3D]/30 text-2xl font-medium mb-4"
                style={{ letterSpacing: '-0.03em' }}
              >
                {letter}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.map((term) => (
                  <a
                    key={term.slug}
                    href={`/wiki/${term.slug}/`}
                    className="group bg-white rounded-2xl p-7 border border-black/5 hover:border-black/15 transition-colors duration-200 flex flex-col"
                  >
                    <h2
                      className="text-[#0D1B3D] text-xl md:text-2xl font-medium mb-3 leading-snug"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {term.term}
                    </h2>
                    <p className="text-[#0D1B3D]/60 text-sm leading-relaxed">{term.short}</p>
                    <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-medium text-[#0D1B3D]/50 group-hover:text-[#0D1B3D] transition-colors duration-200">
                      Read the full definition
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Understand it? Now put it to work."
        text="Definitions are the start. A Fit Call maps these concepts onto your actual numbers — and shows you whether the strategy fits."
      />
    </PageShell>
  );
}
