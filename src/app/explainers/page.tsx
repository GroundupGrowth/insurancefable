import type { Metadata } from 'next';
import { Play } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import CtaBand from '../../components/CtaBand';
import { JsonLd } from '../../lib/articleSchema';
import { SITE_URL } from '../../lib/content';
import { explainers, explainerCategories } from '../../data/explainers';

/* Video explainer hub (Xander, 2026-07-30): every explainer has its own URL
   at /explainers/<slug>/ (one question, one page — the transcript there is
   what search engines and LLMs read); this page is the grouped index. */

export const metadata: Metadata = {
  title: 'Life Insurance Explained in Simple Terms (Video Explainers)',
  description:
    'Short video explainers answering the most common life insurance questions in plain language: cash value, policy loans, dividends, term vs whole life, taxes, and more. Full transcripts included.',
  alternates: { canonical: '/explainers/' },
};

const MEDIA = '/media/explainers';

export default function ExplainersPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Life Insurance Video Explainers',
    itemListElement: explainers.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.title,
      url: `${SITE_URL}/explainers/${entry.slug}/`,
    })),
  };

  return (
    <PageShell>
      <JsonLd data={itemListJsonLd} />

      <PageHero
        eyebrow="Video Explainers"
        title="Life Insurance, Explained Simply"
        intro="Big questions, short answers. Each video explains one life insurance concept in plain language in about a minute, with the full transcript and links to the wiki terms and articles that go deeper."
      />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto flex flex-col gap-16">
          {explainerCategories.map((category) => {
            const entries = explainers.filter((entry) => entry.category === category.key);
            if (entries.length === 0) return null;
            return (
              <div key={category.key}>
                <h2
                  className="text-[#0D1B3D] text-3xl md:text-4xl font-medium mb-8"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {category.label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {entries.map((entry) => (
                    <a
                      key={entry.slug}
                      href={`/explainers/${entry.slug}/`}
                      className="group bg-white rounded-2xl border border-black/5 hover:border-black/15 transition-colors duration-200 p-4 flex flex-col"
                    >
                      <span className="relative block aspect-[9/16] rounded-xl overflow-hidden bg-[#0D1B3D] mb-4">
                        <img
                          src={`${MEDIA}/${entry.slug}.jpg`}
                          alt={entry.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-11 h-11 rounded-full bg-white/85 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors duration-200">
                            <Play className="w-5 h-5 fill-current text-[#0D1B3D] ml-0.5" />
                          </span>
                        </span>
                        <span className="absolute bottom-2 right-2 bg-[#0D1B3D]/80 text-white text-xs px-2 py-0.5 rounded-full">
                          {Math.floor(entry.seconds / 60)}:{String(entry.seconds % 60).padStart(2, '0')}
                        </span>
                      </span>
                      <h3
                        className="text-[#0D1B3D] text-base font-medium leading-snug mb-2"
                        style={{ letterSpacing: '-0.01em' }}
                      >
                        {entry.title}
                      </h3>
                      <p className="text-[#0D1B3D]/60 text-sm leading-relaxed line-clamp-3">
                        {entry.summary}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBand
        title="Want this explained for your situation?"
        text="A quick call with one of our Pro Client Guides turns the concepts in these videos into real numbers for your income, your goals, and your timeline."
      />
    </PageShell>
  );
}
