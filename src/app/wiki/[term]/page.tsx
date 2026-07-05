import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PageShell from '../../../components/PageShell';
import CtaBand from '../../../components/CtaBand';
import WikiBody from '../../../components/WikiBody';
import { getWikiTerm, getWikiTermNames, getWikiTerms } from '../../../lib/wiki';
import { SITE_URL } from '../../../lib/content';
import { wikiTermDefaults } from '../../../data/wiki';

/* One wiki term. Default terms prerender; terms added at /admin → Wiki are
   served on demand (dynamicParams) and cached by ISR. */

export const revalidate = 300;

export function generateStaticParams() {
  return wikiTermDefaults.map(({ slug }) => ({ term: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ term: string }>;
}): Promise<Metadata> {
  const { term: slug } = await params;
  const term = await getWikiTerm(slug);
  if (!term) return {};
  const title = term.seoTitle ?? `What Is ${term.term}? Definition & How It Works`;
  const description = term.seoDescription ?? term.short;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/wiki/${term.slug}/` },
    openGraph: {
      title,
      description,
      url: `/wiki/${term.slug}/`,
      type: 'article',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}

export default async function WikiTermPage({ params }: { params: Promise<{ term: string }> }) {
  const { term: slug } = await params;
  const [term, names] = await Promise.all([getWikiTerm(slug), getWikiTermNames()]);
  if (!term) notFound();
  const allTerms = await getWikiTerms();
  const related = term.related
    .map((relatedSlug) => allTerms.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate));

  const definedTermJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.short,
    url: `${SITE_URL}/wiki/${term.slug}/`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Insurance & Estates Wiki',
      url: `${SITE_URL}/wiki/`,
    },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />

      {/* Term hero */}
      <section className="px-6 pt-10 pb-12">
        <div className="max-w-[54rem] mx-auto flex flex-col items-start">
          <a
            href="/wiki/"
            className="inline-flex items-center gap-2 text-[#0D1B3D]/50 hover:text-[#0D1B3D] text-sm font-medium mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            The I&amp;E Wiki
          </a>
          <h1
            className="text-[#0D1B3D] text-4xl md:text-6xl font-medium leading-[1.05] mb-6"
            style={{ letterSpacing: '-0.04em' }}
          >
            {term.term}
          </h1>
          {/* The definitive one-sentence answer, first — for readers and for AI citation */}
          <p className="text-[#0D1B3D]/70 text-lg md:text-xl leading-relaxed">{term.short}</p>
        </div>
      </section>

      {/* Full explanation */}
      <section className="px-6 pb-16">
        <div className="max-w-[54rem] mx-auto bg-white rounded-3xl border border-black/5 p-6 md:p-12">
          <WikiBody body={term.body} names={names} />
        </div>
      </section>

      {/* Related terms */}
      {related.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[54rem] mx-auto">
            <h2
              className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-6"
              style={{ letterSpacing: '-0.03em' }}
            >
              Related terms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((relatedTerm) => (
                <a
                  key={relatedTerm.slug}
                  href={`/wiki/${relatedTerm.slug}/`}
                  className="group bg-white rounded-2xl p-6 border border-black/5 hover:border-black/15 transition-colors duration-200 flex flex-col"
                >
                  <h3
                    className="text-[#0D1B3D] text-lg font-medium mb-2"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {relatedTerm.term}
                  </h3>
                  <p className="text-[#0D1B3D]/60 text-sm leading-relaxed line-clamp-2">
                    {relatedTerm.short}
                  </p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-medium text-[#0D1B3D]/50 group-hover:text-[#0D1B3D] transition-colors duration-200">
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={`See how ${term.term.toLowerCase()} fits your situation.`}
        text="A Fit Call is a conversation, not a pitch. Bring your questions — leave knowing whether the strategy fits your numbers."
      />
    </PageShell>
  );
}
