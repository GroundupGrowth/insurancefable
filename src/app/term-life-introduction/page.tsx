import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import { PrimaryCta, SecondaryCta } from '../../components/CtaButtons';
import { getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('term-life-introduction');
  return pageMetadata(content);
}

// blog articles and off-build pages stay on WordPress until Phase 3
const BASE = 'https://www.insuranceandestates.com';

const problems = [
  'A volatile stock market and potential losses',
  'An unknown future due to lack of specific planning',
  'The high likelihood of potential future tax increases',
  'The fear of not having enough money for retirement',
];

const articles = [
  {
    title: 'Buy Term and Invest the Difference: Why BTID Fails and What Works Better',
    href: `${BASE}/buy-term-invest-the-difference-btid/`,
  },
  {
    title: "Best Convertible Term Life Insurance Companies (2026): Ranked by What You're Actually Converting Into",
    href: `${BASE}/best-convertible-term-life-insurance-companies/`,
  },
];

export default async function TermLifeIntroductionPage() {
  const content = await getPageContent('term-life-introduction');
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
          <div className="bg-[#0D1B3D] rounded-3xl px-8 py-14 md:px-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-white/50 text-sm uppercase tracking-wide mb-2">The problem</p>
                <h2
                  className="text-white text-3xl md:text-5xl font-medium leading-tight"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  The status quo advice leaves you exposed.
                </h2>
              </div>
              <ul className="flex flex-col justify-center gap-4">
                {problems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3 text-white/70 text-base md:text-lg leading-relaxed">
                    <ArrowRight className="w-5 h-5 shrink-0 mt-1 text-white/40" />
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
            style={{ letterSpacing: '-0.04em' }}
          >
            Term Life Insurance Knowledge Center
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
