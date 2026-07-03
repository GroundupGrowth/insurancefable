import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import { PrimaryCta, SecondaryCta } from '../../components/CtaButtons';
import { getPageContent } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('whole-life-introduction');
  return { title: content.title, description: content.description };
}

// blog articles and off-build pages stay on WordPress until Phase 3
const BASE = 'https://www.insuranceandestates.com';

const articles = [
  {
    title: 'Whole Life Insurance vs Roth IRA: Which Builds More Tax-Free Wealth?',
    href: `${BASE}/whole-life-vs-roth-ira/`,
  },
  {
    title: 'Whole Life Insurance Rates by Age: A 2026 Cost Guide',
    href: `${BASE}/whole-life-insurance-rates-age-chart/`,
  },
  {
    title: 'Top 10 Best Dividend Paying Whole Life Insurance Companies',
    href: `${BASE}/top-10-best-dividend-paying-whole-life-insurance-companies/`,
  },
];

export default async function WholeLifeIntroductionPage() {
  const content = await getPageContent('whole-life-introduction');
  return (
    <PageShell>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.heroTitle}
        intro={content.heroIntro}
      >
        <PrimaryCta
          href="/proclientguide/introduction/"
          label="Get Your Personalized Quote — Connect with an Expert"
        />
        <SecondaryCta href={`${BASE}/whole-life-insurance/`} label="Start Here" />
      </PageHero>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-black/5">
              <h2
                className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Take control of your financial future.
              </h2>
              <p className="text-[#0D1B3D]/70 text-base leading-relaxed">
                At I&amp;E, we empower you to take control of your financial future. High cash
                value whole life insurance provides protection and it&rsquo;s a powerful tool for
                stable, tax-advantaged wealth-building and retirement planning. Trusted by
                families and corporations, our customized strategies deliver peace of mind.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-10 border border-black/5">
              <h2
                className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Curious why banks and the wealthy choose whole life?
              </h2>
              <p className="text-[#0D1B3D]/70 text-base leading-relaxed mb-6">
                Watch our free webinar, Top 5 Benefits of High Cash Value Whole Life, for expert
                insights. Dive into our curated article library for in-depth guidance on infinite
                banking and whole life insurance. And when you are ready to move forward, schedule
                a call with one of our Pro Client Guides.
              </p>
              <a
                href={`${BASE}/category/whole-life-insurance/`}
                className="inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#0D1B3D] hover:text-white transition-colors duration-200"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>
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
            Must Read Whole Life Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {articles.map((article) => (
              <a
                key={article.title}
                href={article.href}
                className="group bg-white rounded-2xl p-7 flex flex-col min-h-48 border border-black/5 hover:border-black/10 transition-colors duration-200"
              >
                <h3 className="text-[#0D1B3D] text-lg font-medium leading-snug">
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
