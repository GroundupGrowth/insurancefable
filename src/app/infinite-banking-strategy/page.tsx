import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import { PrimaryCta, SecondaryCta } from '../../components/CtaButtons';
import ArticleThumbCard, { type ArticleThumb } from '../../components/ArticleThumbCard';
import { getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('infinite-banking-strategy');
  return pageMetadata(content);
}

// blog articles and off-build pages stay on WordPress until Phase 3
// Linked articles are now hosted here at the root, so links are internal.
const BASE = '';

const resources = [
  {
    eyebrow: 'Start here',
    title: 'New to Infinite Banking?',
    text: 'Kingdom Money explains why conventional financial wisdom fails — and what wealthy families have always done differently.',
    cta: 'Get Kingdom Money',
    href: '/ebooks-and-guides/',
    cover: 'kingdom-money-217x300.webp',
    coverAlt: 'Kingdom Money book cover',
  },
  {
    eyebrow: 'Go deeper',
    title: 'Ready to See How It Works?',
    text: 'You understand the concept. The Self Banking Blueprint walks you through policy design, deployment, and the infrastructure behind it.',
    cta: 'Get the Blueprint',
    href: '/ebooks-and-guides/',
    cover: 'icon-THE-SELF-BANKING-BLUEPRINT-Book-Cover-219x300.webp',
    coverAlt: 'The Self Banking Blueprint book cover',
  },
];

const articles: ArticleThumb[] = [
  {
    title: 'Buy Term and Invest the Difference: Why BTID Fails and What Works Better',
    href: `${BASE}/buy-term-invest-the-difference-btid/`,
    image: 'BTID-buy-term-invest-difference-150x150.webp',
    alt: 'Buy term and invest the difference compared with a permanent policy',
  },
  {
    title: 'Best Infinite Banking Companies for 2026: Expert Rankings & Analysis',
    href: `${BASE}/top-10-best-infinite-banking-companies/`,
    image: 'infinite-banking-companies-150x150.webp',
    alt: 'The best infinite banking companies ranked',
  },
  {
    title: 'The Pros and Cons of Infinite Banking: An Honest Evaluation',
    href: `${BASE}/pros-and-cons-of-the-infinite-banking-concept/`,
    image: 'infinite-banking-pros-cons-150x150.webp',
    alt: 'The pros and cons of the infinite banking concept',
  },
  {
    title: 'What Is the Best Compound Interest Account for 2026?',
    href: `${BASE}/compound-interest-growth/`,
    image: 'compound-interest-150x100.jpg',
    alt: 'Compound interest growing over time',
  },
  {
    title: 'Infinite Banking with Whole Life Insurance: 18 Common Objections & FAQs',
    href: `${BASE}/whole-life-infinite-banking-objections-faqs/`,
    image: 'infinite-banking-whole-life-insurance-150x144.jpg',
    alt: 'Be your own banker with whole life insurance',
  },
  {
    title: 'Life Insurance Creditor Protection: State-by-State Guide to Protecting Your Cash Value',
    href: `${BASE}/life-insurance-creditor-protection-by-state/`,
    image: 'life-insurance-creditor-protection-150x150.webp',
    alt: 'Life insurance creditor protection state by state',
  },
];

export default async function InfiniteBankingStrategyPage() {
  const content = await getPageContent('infinite-banking-strategy');
  return (
    <PageShell>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.heroTitle}
        intro={content.heroIntro}
      >
        <PrimaryCta href={`${BASE}/infinite-banking/`} label="Infinite Banking" />
        <SecondaryCta href="/start-your-journey/" label="Start your Journey" />
      </PageHero>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="max-w-2xl mb-12">
            <h2
              className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.05] mb-4"
              style={{ letterSpacing: '-0.04em' }}
            >
              Free Resources to Start Your Journey
            </h2>
            <p className="text-[#0D1B3D]/60 text-base md:text-lg leading-relaxed">
              Choose your starting point based on where you are right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                className="group bg-white rounded-2xl p-7 min-h-64 flex flex-col border border-black/5 hover:border-black/10 transition-colors duration-200"
              >
                <div className="flex gap-6">
                  <img
                    src={`/wp-content/uploads/${resource.cover}`}
                    alt={resource.coverAlt}
                    width={110}
                    height={152}
                    loading="lazy"
                    decoding="async"
                    className="w-[110px] h-[152px] object-contain shrink-0 rounded-lg"
                  />
                  <div>
                    <p className="text-sm text-[#0D1B3D]/60 mb-2">{resource.eyebrow}</p>
                    <h3
                      className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-4"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {resource.title}
                    </h3>
                    <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{resource.text}</p>
                  </div>
                </div>
                <span className="mt-auto pt-6 self-start inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full group-hover:bg-[#0D1B3D] group-hover:text-white transition-colors duration-200">
                  {resource.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
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
            Must Read IBC Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <ArticleThumbCard key={article.title} article={article} />
            ))}
          </div>

          <div className="mt-10">
            <a
              href="/blog/#infinite-banking-concept"
              className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              View More Infinite Banking Articles
              <span className="bg-white rounded-full p-2">
                <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <LeadMagnetSection />
    </PageShell>
  );
}
