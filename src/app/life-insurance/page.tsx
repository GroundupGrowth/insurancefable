import type { Metadata } from 'next';
import { ArrowRight, Phone } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import ArticleThumbCard, { type ArticleThumb } from '../../components/ArticleThumbCard';
import { getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('life-insurance');
  return pageMetadata(content);
}

/* Icons are the same product icons the live /life-insurance/ page pairs with
   each policy type, localized under /wp-content/uploads/. */
const products = [
  {
    eyebrow: 'The foundation',
    title: 'Whole Life',
    text: 'Guaranteed growth, guaranteed premiums, and cash value you control. The chassis of a Private Banking System.',
    href: '/whole-life-introduction/',
    icon: 'whole_life.webp',
    iconAlt: 'Whole life insurance icon — an open umbrella',
  },
  {
    eyebrow: 'The strategy',
    title: 'Infinite Banking',
    text: 'Use a high cash value policy to become your own source of financing — and recapture the interest you pay others.',
    href: '/infinite-banking-strategy/',
    icon: 'infinite_banking.webp',
    iconAlt: 'Infinite banking icon',
  },
  {
    eyebrow: 'Market-linked growth',
    title: 'IUL Insurance',
    text: 'Indexed Universal Life captures a share of market upside with a floor against losses. Powerful — when designed honestly.',
    href: '/iul-introduction/',
    icon: 'indexed_universal.webp',
    iconAlt: 'Indexed universal life insurance icon',
  },
  {
    eyebrow: 'Pure protection',
    title: 'Term Life',
    text: 'The most coverage for the fewest dollars. We structure convertible term so the door to permanent coverage stays open.',
    href: '/term-life-introduction/',
    icon: 'term_life.webp',
    iconAlt: 'Term life insurance icon',
  },
  {
    eyebrow: 'Investment-driven',
    title: 'VUL Insurance',
    text: 'Variable Universal Life puts your cash value in the market — full upside, full risk. Know exactly what you own.',
    href: '/variable-life-introduction/',
    icon: 'variable_universal.webp',
    iconAlt: 'Variable universal life insurance icon',
  },
];

const livingAssetBlocks = [
  {
    heading: 'Find out what your policy should actually do.',
    text: 'Most people are sold life insurance as a death benefit. We design it as a living asset — one that builds capital, stays liquid, and works for you today, not just someday.',
  },
  {
    heading: 'See if whole life is the right foundation.',
    text: 'Not everyone qualifies and not everyone is ready. We take the time to understand your situation before recommending anything — because the wrong policy is worse than no policy.',
  },
  {
    heading: "Term that converts when you're ready.",
    text: "If whole life isn't the right fit yet, we structure convertible term so the door stays open. When your income and goals align, you can move into permanent coverage without starting over.",
  },
];

// blog articles stay on WordPress until the article migration (Phase 3)
// Linked articles are now hosted here at the root, so links are internal.
const BASE = '';

const relatedArticles: ArticleThumb[] = [
  {
    title: 'Top 25 Highest Rated Life Insurance Companies (2026 Comdex Rankings)',
    href: `${BASE}/top-25-highest-rated-insurance-companies/`,
    image: 'life-insurance-company-ratings-1-300x200.jpg',
    alt: "Comparison table showing the top 25 highest rated life insurance companies in 2026 ranked by A.M. Best, S&P, Moody's, Fitch ratings and COMDEX scores",
  },
  {
    title: 'Types of Life Insurance: A Practical Guide to Choosing the Right Policy',
    href: `${BASE}/different-types-of-life-insurance-policies/`,
    image: 'Different-Types-of-Life-Insurance-Policies-150x113.jpg',
    alt: 'The different types of life insurance policies compared',
  },
  {
    title: 'Top 10 Best Life Insurance Companies (2026 Independent Rankings)',
    href: `${BASE}/top-10-best-life-insurance-companies/`,
    image: 'best-life-insurance-companies-1-150x100.jpg',
    alt: 'Comparison table ranking the top 10 best life insurance companies for 2026 by A.M. Best rating, Comdex score, and distribution model',
  },
  {
    title: 'Life Insurance Underwriting Standards: The Data Behind Best Rates',
    href: `${BASE}/life-insurance-underwriting/`,
    image: 'life-insurance-underwriting-1-150x100.jpg',
    alt: 'Life insurance underwriting tips',
  },
];

export default async function LifeInsurancePage() {
  const content = await getPageContent('life-insurance');
  return (
    <PageShell>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.heroTitle}
        intro={content.heroIntro}
      />

      <section className="px-6 pb-16">
        <div className="max-w-[88rem] mx-auto flex justify-center">
          <img
            src="/wp-content/uploads/life-insurance1.webp"
            alt="A young family sitting together in a field of wildflowers"
            width={494}
            height={494}
            className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover"
          />
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <a
                key={product.title}
                href={product.href}
                className="group bg-white rounded-2xl p-7 min-h-64 flex flex-col border border-black/5 hover:border-black/10 transition-colors duration-200"
              >
                <img
                  src={`/wp-content/uploads/${product.icon}`}
                  alt={product.iconAlt}
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 object-contain mb-5"
                />
                <p className="text-sm text-[#0D1B3D]/60 mb-2">{product.eyebrow}</p>
                <h3
                  className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {product.title}
                </h3>
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{product.text}</p>
                <span className="mt-auto pt-6 self-start inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full group-hover:bg-[#0D1B3D] group-hover:text-white transition-colors duration-200">
                  More Info
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}

            <div className="bg-[#0D1B3D] rounded-2xl p-7 min-h-64 flex flex-col">
              <p className="text-white/50 text-sm mb-2">Not sure where to start?</p>
              <h3
                className="text-white text-2xl md:text-3xl font-medium mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Find The Right Policy
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                Answer a few questions and we&rsquo;ll point you at the structure that fits your
                situation — no pitch, just a starting point.
              </p>
              <a
                href="/life-insurance-quotes/"
                className="mt-auto self-start inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#E5E7EB] transition-colors duration-200"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="max-w-2xl mb-12">
            <h2
              className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.05]"
              style={{ letterSpacing: '-0.04em' }}
            >
              Your life insurance should do more than pay out when you die.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {livingAssetBlocks.map((block) => (
              <div key={block.heading} className="bg-white rounded-2xl p-7 border border-black/5">
                <h3
                  className="text-[#0D1B3D] text-xl md:text-2xl font-medium mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {block.heading}
                </h3>
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{block.text}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap mt-10">
            <a
              href="/connect-with-our-experts/"
              className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              Connect With Our Experts
              <span className="bg-white rounded-full p-2">
                <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
              </span>
            </a>
            <a
              href="tel:1-877-787-7558"
              className="inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full border border-black/5 hover:bg-white/70 transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              877-787-7558
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
            style={{ letterSpacing: '-0.04em' }}
          >
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedArticles.map((article) => (
              <ArticleThumbCard key={article.title} article={article} />
            ))}
          </div>
        </div>
      </section>

      <LeadMagnetSection />
    </PageShell>
  );
}
