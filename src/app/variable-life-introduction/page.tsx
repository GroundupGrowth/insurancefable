import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import { PrimaryCta, SecondaryCta } from '../../components/CtaButtons';
import ArticleThumbCard, { type ArticleThumb } from '../../components/ArticleThumbCard';
import { getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('variable-life-introduction');
  return pageMetadata(content);
}

// blog articles and off-build pages stay on WordPress until Phase 3
// Linked articles are now hosted here at the root, so links are internal.
const BASE = '';

const articles: ArticleThumb[] = [
  {
    title: 'Variable Universal Life Insurance: Complete Guide to VUL (Pros, Cons & When It Makes Sense)',
    href: `${BASE}/top-10-pros-cons-variable-universal-life-insurance/`,
    image: 'Variable-Life-Insurance-1-300x220.jpg',
    alt: 'Variable universal life insurance explained',
  },
  {
    title: 'Best Universal Life Insurance Companies: IUL, VUL & GUL Compared (2026)',
    href: `${BASE}/best-universal-life-insurance-companies/`,
    image: 'best-universal-life-insurance-300x198.jpg',
    alt: 'Side-by-side comparison of IUL, VUL and GUL universal life insurance types',
  },
];

export default async function VariableLifeIntroductionPage() {
  const content = await getPageContent('variable-life-introduction');
  return (
    <PageShell>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.heroTitle}
        intro={content.heroIntro}
      >
        <PrimaryCta href="/proclientguide/jasonh/" label="Connect with an Expert" />
        <SecondaryCta href="/life-insurance-quotes/" label="Compare Quotes" />
      </PageHero>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
            style={{ letterSpacing: '-0.04em' }}
          >
            Must Read Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article) => (
              <ArticleThumbCard key={article.title} article={article} />
            ))}
          </div>
        </div>
      </section>

      <LeadMagnetSection />
    </PageShell>
  );
}
