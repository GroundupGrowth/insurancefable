import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import { PrimaryCta, SecondaryCta } from '../../components/CtaButtons';
import { getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('iul-introduction');
  return pageMetadata(content);
}

// blog articles and off-build pages stay on WordPress until Phase 3
const BASE = 'https://www.insuranceandestates.com';

const intro = [
  {
    lead: 'Feeling uneasy about securing your financial future amid market ups and downs?',
    text: 'Indexed Universal Life (IUL) insurance offers a balanced solution to ease those worries. In 2024, IUL held a strong 24% share of the U.S. life insurance market, backed by $3.8 billion in premiums, showing its appeal to small business owners, professionals, and forward-thinkers. Unlike riskier investments, IUL protects you from market losses while growing your cash value with market indices — offering stability and growth in one package.',
  },
  {
    lead: 'What sets IUL apart is its flexibility to fit your life.',
    text: "With a 10% surge in policies sold in 2024, new features like volatility-controlled indices and simpler options make it easier to save securely — no finance degree needed. IUL isn't just insurance; it's a tool for retirement planning or estate strategies, providing tax-free growth as the economy looks up. While IULs can feel complex and costs may rise over time, the ability to adjust premiums or access cash tax-free makes them a reliable choice for long-term goals.",
  },
  {
    lead: 'Want to see if IUL is right for you?',
    text: "Start with real Trustpilot reviews to hear what others think, then watch our video on 2025's top IUL providers to see who's leading and why. For a deeper look, our articles break down IUL's benefits, like tax advantages, and its challenges, like return caps, so you can make an informed choice. Whether you're just exploring or ready to refine your plan, we're here to keep things clear and simple.",
  },
  {
    lead: 'Your financial journey deserves peace of mind.',
    text: "With IULs introducing streamlined products and smarter index options in 2025, now's the perfect time to address concerns about markets or retirement costs. Explore our resources, and let's build the confidence you need to plan for tomorrow.",
  },
];

const articles = [
  {
    title: 'Top 25 Highest Rated Life Insurance Companies (2026 Comdex Rankings)',
    href: `${BASE}/top-25-highest-rated-insurance-companies/`,
  },
  {
    title: 'What Is a LIRP? Life Insurance Retirement Plans Explained (2026 Guide)',
    href: `${BASE}/lirp/`,
  },
  {
    title: 'Best IUL Companies 2026: Complete Rankings & Benefits Guide',
    href: `${BASE}/indexed-universal-life-iul-insurance/`,
  },
];

export default async function IulIntroductionPage() {
  const content = await getPageContent('iul-introduction');
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {intro.map((block) => (
              <div key={block.lead} className="bg-white rounded-2xl p-8 md:p-10 border border-black/5">
                <h2
                  className="text-[#0D1B3D] text-xl md:text-2xl font-medium mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {block.lead}
                </h2>
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
            style={{ letterSpacing: '-0.04em' }}
          >
            Must Read IUL Articles
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

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto bg-[#0D1B3D] rounded-3xl px-8 py-16 md:px-16 text-center">
          <h2
            className="text-white text-3xl md:text-5xl font-medium leading-tight mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Would you like to see your own IUL illustration using your own numbers?
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Connect with an IUL specialist today.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <PrimaryCta href="/proclientguide/jasonh/" label="Connect with an Expert" />
            <SecondaryCta href="/start-your-journey/" label="Start your Journey" />
          </div>
        </div>
      </section>

      <LeadMagnetSection />
    </PageShell>
  );
}
