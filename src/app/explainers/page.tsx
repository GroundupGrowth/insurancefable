import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import CtaBand from '../../components/CtaBand';
import { JsonLd } from '../../lib/articleSchema';
import { SITE_URL } from '../../lib/content';
import { explainers } from '../../data/explainers';

/* Video explainer library (Xander, 2026-07-30): short simple-terms videos
   with full transcripts in the HTML. The transcripts are the point — they
   make every video readable by search engines and LLMs, and each entry
   cross-links the wiki terms and articles that go deeper. Videos are
   self-hosted (public/media/explainers/, transcoded from the "Videos"
   source folder — see scripts/build-explainers note in the data file). */

export const metadata: Metadata = {
  title: 'Life Insurance Explained in Simple Terms (Video Explainers)',
  description:
    'Short video explainers answering the most common life insurance questions in plain language: cash value, policy loans, dividends, term vs whole life, and more. Full transcripts included.',
  alternates: { canonical: '/explainers/' },
};

const MEDIA = '/media/explainers';

export default function ExplainersPage() {
  const videoJsonLds = explainers.map((entry) => ({
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
  }));

  return (
    <PageShell>
      {videoJsonLds.map((jsonLd, i) => (
        <JsonLd key={i} data={jsonLd} />
      ))}

      <PageHero
        eyebrow="Video Explainers"
        title="Life Insurance, Explained Simply"
        intro="Big questions, short answers. Each video explains one life insurance concept in plain language in about a minute, with the full transcript below it and links to the wiki terms and articles that go deeper."
      />

      {/* Jump list: one line per question, doubles as a table of contents */}
      <section className="px-6 pb-16">
        <div className="max-w-[54rem] mx-auto bg-white rounded-3xl border border-black/5 p-6 md:p-8">
          <p className="text-[#0D1B3D]/60 text-sm mb-4">On this page</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {explainers.map((entry) => (
              <li key={entry.slug}>
                <a
                  href={`#${entry.slug}`}
                  className="text-[#0D1B3D] text-sm underline decoration-[#0D1B3D]/20 underline-offset-2 hover:decoration-[#0D1B3D] transition-colors duration-150"
                >
                  {entry.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[80rem] mx-auto flex flex-col gap-6">
          {explainers.map((entry) => (
            <article
              key={entry.slug}
              id={entry.slug}
              className="bg-white rounded-3xl border border-black/5 p-6 md:p-10 scroll-mt-28"
            >
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
                  <h2
                    className="text-[#0D1B3D] text-2xl md:text-3xl font-medium leading-tight mb-3"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {entry.title}
                  </h2>
                  <p className="text-[#0D1B3D]/70 text-base leading-relaxed mb-6">{entry.summary}</p>

                  <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mb-2">
                    Transcript
                  </p>
                  <div className="text-[#0D1B3D]/80 text-sm leading-relaxed space-y-3">
                    {entry.transcript.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  {(entry.wiki.length > 0 || entry.articles.length > 0) && (
                    <div className="mt-6 pt-5 border-t border-black/5">
                      <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mb-3">
                        Go deeper
                      </p>
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
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Want this explained for your situation?"
        text="A quick call with one of our Pro Client Guides turns the concepts in these videos into real numbers for your income, your goals, and your timeline."
      />
    </PageShell>
  );
}
