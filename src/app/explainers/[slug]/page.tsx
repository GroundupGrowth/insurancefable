import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PageShell from '../../../components/PageShell';
import CtaBand from '../../../components/CtaBand';
import { JsonLd } from '../../../lib/articleSchema';
import { SITE_URL } from '../../../lib/content';
import { explainers, explainerCategories } from '../../../data/explainers';

/* One explainer per URL: the video, its full transcript (the part search
   engines and LLMs read), and the wiki/article links that go deeper. The
   /explainers/ hub links here. */

const MEDIA = '/media/explainers';

export function generateStaticParams() {
  return explainers.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = explainers.find((candidate) => candidate.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.title} (1-Minute Video Explainer)`,
    description: entry.summary,
    alternates: { canonical: `/explainers/${entry.slug}/` },
    openGraph: {
      title: entry.title,
      description: entry.summary,
      url: `/explainers/${entry.slug}/`,
      type: 'video.other',
      images: [{ url: `${MEDIA}/${entry.slug}.jpg` }],
    },
  };
}

export default async function ExplainerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = explainers.find((candidate) => candidate.slug === slug);
  if (!entry) notFound();

  const categoryLabel = explainerCategories.find((c) => c.key === entry.category)?.label;
  const related = explainers
    .filter((candidate) => candidate.slug !== entry.slug && candidate.category === entry.category)
    .slice(0, 4);

  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: entry.title,
    description: entry.summary,
    thumbnailUrl: `${SITE_URL}${MEDIA}/${entry.slug}.jpg`,
    contentUrl: `${SITE_URL}${MEDIA}/${entry.slug}.mp4`,
    uploadDate: '2026-07-30',
    duration: `PT${entry.seconds}S`,
    transcript: entry.transcript,
    publisher: { '@type': 'Organization', name: 'Insurance & Estates', url: `${SITE_URL}/` },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Video Explainers', item: `${SITE_URL}/explainers/` },
      { '@type': 'ListItem', position: 3, name: entry.title, item: `${SITE_URL}/explainers/${entry.slug}/` },
    ],
  };

  return (
    <PageShell>
      <JsonLd data={videoJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="px-6 pt-10 pb-12">
        <div className="max-w-[64rem] mx-auto flex flex-col items-start">
          <a
            href="/explainers/"
            className="inline-flex items-center gap-2 text-[#0D1B3D]/50 hover:text-[#0D1B3D] text-sm font-medium mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            All Video Explainers
          </a>
          {categoryLabel && <p className="text-[#0D1B3D]/60 text-sm mb-3">{categoryLabel}</p>}
          <h1
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.08] mb-4"
            style={{ letterSpacing: '-0.04em' }}
          >
            {entry.title}
          </h1>
          {/* The one-sentence answer first — for readers and for AI citation */}
          <p className="text-[#0D1B3D]/70 text-lg leading-relaxed max-w-[46rem]">{entry.summary}</p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[64rem] mx-auto bg-white rounded-3xl border border-black/5 p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] gap-8 items-start">
            <video
              controls
              playsInline
              preload="none"
              poster={`${MEDIA}/${entry.slug}.jpg`}
              className="w-full max-w-[20rem] mx-auto md:mx-0 aspect-[9/16] rounded-2xl bg-[#0D1B3D] object-cover"
            >
              <source src={`${MEDIA}/${entry.slug}.mp4`} type="video/mp4" />
            </video>

            <div>
              <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mb-2">Transcript</p>
              <div className="text-[#0D1B3D]/80 text-base leading-relaxed space-y-3">
                {entry.transcript.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {(entry.wiki.length > 0 || entry.articles.length > 0) && (
                <div className="mt-6 pt-5 border-t border-black/5">
                  <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mb-3">Go deeper</p>
                  <div className="flex flex-wrap gap-2">
                    {entry.wiki.map((term) => (
                      <a
                        key={term.slug}
                        href={`/wiki/${term.slug}/`}
                        className="inline-flex items-center bg-[#F5F5F5] text-[#0D1B3D] text-sm px-4 py-1.5 rounded-full border border-black/5 hover:bg-[#0D1B3D] hover:text-white transition-colors duration-200"
                      >
                        Wiki: {term.label}
                      </a>
                    ))}
                    {entry.articles.map((article) => (
                      <a
                        key={article.href}
                        href={article.href}
                        className="inline-flex items-center bg-[#F5F5F5] text-[#0D1B3D] text-sm px-4 py-1.5 rounded-full border border-black/5 hover:bg-[#0D1B3D] hover:text-white transition-colors duration-200"
                      >
                        {article.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[64rem] mx-auto">
            <h2
              className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-6"
              style={{ letterSpacing: '-0.03em' }}
            >
              More quick answers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((candidate) => (
                <a
                  key={candidate.slug}
                  href={`/explainers/${candidate.slug}/`}
                  className="group bg-white rounded-2xl p-6 border border-black/5 hover:border-black/15 transition-colors duration-200 flex flex-col"
                >
                  <h3
                    className="text-[#0D1B3D] text-lg font-medium mb-2"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {candidate.title}
                  </h3>
                  <p className="text-[#0D1B3D]/60 text-sm leading-relaxed line-clamp-2">
                    {candidate.summary}
                  </p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-medium text-[#0D1B3D]/50 group-hover:text-[#0D1B3D] transition-colors duration-200">
                    Watch
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Want this explained for your situation?"
        text="A quick call with one of our Pro Client Guides turns the concepts in these videos into real numbers for your income, your goals, and your timeline."
      />
    </PageShell>
  );
}
