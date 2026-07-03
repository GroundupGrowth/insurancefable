import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import { PrimaryCta, SecondaryCta } from '../../components/CtaButtons';
import { getPageContent } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('variable-life-introduction');
  return { title: content.title, description: content.description };
}

// blog articles and off-build pages stay on WordPress until Phase 3
const BASE = 'https://www.insuranceandestates.com';

const articles = [
  {
    title: 'Variable Universal Life Insurance: Complete Guide to VUL (Pros, Cons & When It Makes Sense)',
    href: `${BASE}/top-10-pros-cons-variable-universal-life-insurance/`,
  },
  {
    title: 'Best Universal Life Insurance Companies: IUL, VUL & GUL Compared (2026)',
    href: `${BASE}/best-universal-life-insurance-companies/`,
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
              <a
                key={article.title}
                href={article.href}
                className="group bg-white rounded-2xl p-7 flex flex-col min-h-48 border border-black/5 hover:border-black/10 transition-colors duration-200"
              >
                <h3 className="text-[#0D1B3D] text-lg md:text-xl font-medium leading-snug">
                  {article.title}
                </h3>
                <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm text-[#0D1B3D]/60 group-hover:text-[#0D1B3D] transition-colors duration-200">
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <LeadMagnetSection />
    </PageShell>
  );
}
