import type { Metadata } from 'next';
import { ArrowRight, Phone } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import ArticleThumbCard, { type ArticleThumb } from '../../components/ArticleThumbCard';
import { getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('long-term-care-insurance');
  return pageMetadata(content);
}

// blog articles stay on WordPress until the article migration (Phase 3)
// Linked articles are now hosted here at the root, so links are internal.
const BASE = '';

const options = [
  {
    eyebrow: 'Traditional coverage',
    title: 'Long Term Care Insurance',
    text: 'Dedicated coverage for the cost of extended care — compare the leading long-term care insurance companies and approaches.',
    href: `${BASE}/best-long-term-care-insurance-companies/`,
    icon: 'long-term-care-med-1-153x200.webp',
    iconAlt: 'Illustration of a carer standing beside an older person',
  },
  {
    eyebrow: 'Hybrid approach',
    title: 'Life Insurance with LTC/Chronic Illness Rider',
    text: 'Pair a life insurance policy with a long-term care or chronic illness rider — protection for care costs without use-it-or-lose-it premiums.',
    href: `${BASE}/long-term-care-rider-vs-chronic-illness-rider/`,
    icon: 'Life-Insurance-policy-med-1-300x188.webp',
    iconAlt: 'Illustration of a family sheltered by an umbrella beside a carer supporting an older person',
  },
];

const howItWorks = [
  {
    heading: "Determine what's most important to you.",
    text: 'Why are you looking to purchase a life insurance policy? What type of life insurance policy best addresses your unique goals?',
  },
  {
    heading: 'Shop multiple options simultaneously.',
    text: "Don't settle for just one quote or one policy choice; take your time and have your agent review the different life insurance companies with you before you make any decisions.",
  },
  {
    heading: 'Apply from the comfort of home.',
    text: "Once you've determined what type of insurance is right for you, applying for coverage has never been easier. In fact, you may even be able to complete the entire application process over the phone.",
  },
];

const relatedArticles: ArticleThumb[] = [
  {
    title: "Filial Responsibility [Why You Could Be Held Responsible for Your Parent's Medical Bills]",
    href: `${BASE}/filial-responsibility-laws-am-i-responsible-for-my-parents-medical-bills/`,
    image: 'filial-responsibility-laws-150x100.jpg',
    alt: 'Map of filial responsibility states',
  },
  {
    title: 'Long Term Care Rider vs. Chronic Illness Rider: Which Actually Protects You?',
    href: `${BASE}/long-term-care-rider-vs-chronic-illness-rider/`,
    image: 'Long-Term-Care-Rider-vs-Chronic-Illness-Rider-150x100.jpg',
    alt: 'Comparison table of long-term care rider vs chronic illness rider showing differences in eligibility, benefits, consumer protections, and tax treatment',
  },
  {
    title: 'Best Long-Term Care Insurance Companies: 3 Approaches Compared (2026)',
    href: `${BASE}/best-long-term-care-insurance-companies/`,
    image: 'long-term-care-insurance-companies-150x100.jpg',
    alt: 'Comparison of standalone, hybrid, and life insurance approaches to long-term care coverage with top carriers for each',
  },
  {
    title: 'Asset-Based Long-Term Care Insurance: Hybrid LTC Pros, Cons & 2026 Guide',
    href: `${BASE}/asset-based-long-term-care/`,
    image: 'asset-based-long-term-care-insurance-150x100.jpg',
    alt: 'Reviewing asset-based long-term care insurance options with a financial advisor',
  },
  {
    title: 'Top 10 Best Life Insurance Companies (2026 Independent Rankings)',
    href: `${BASE}/top-10-best-life-insurance-companies/`,
    image: 'best-life-insurance-companies-1-150x100.jpg',
    alt: 'Comparison table ranking the top 10 best life insurance companies for 2026 by A.M. Best rating, Comdex score, and distribution model',
  },
];

export default async function LongTermCareInsurancePage() {
  const content = await getPageContent('long-term-care-insurance');
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
            src="/media/bank.webp"
            alt="A classical bank building with ornate columns, surrounded by blue flowers"
            width={1600}
            height={1073}
            className="w-full max-w-2xl h-auto rounded-2xl"
          />
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {options.map((option) => (
              <a
                key={option.title}
                href={option.href}
                className="group bg-white rounded-2xl p-7 min-h-64 flex flex-col border border-black/5 hover:border-black/10 transition-colors duration-200"
              >
                <img
                  src={`/wp-content/uploads/${option.icon}`}
                  alt={option.iconAlt}
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 object-contain mb-5"
                />
                <p className="text-sm text-[#0D1B3D]/60 mb-2">{option.eyebrow}</p>
                <h3
                  className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {option.title}
                </h3>
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{option.text}</p>
                <span className="mt-auto pt-6 self-start inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full group-hover:bg-[#0D1B3D] group-hover:text-white transition-colors duration-200">
                  More Info
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}

            <div className="bg-[#0D1B3D] rounded-2xl p-7 min-h-64 flex flex-col">
              <p className="text-white/50 text-sm mb-2">Ready to compare?</p>
              <h3
                className="text-white text-2xl md:text-3xl font-medium mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Compare Life Insurance Quotes
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                See your options side by side — no pitch, just the numbers you need to make a
                confident decision.
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
              Protecting your family&rsquo;s financial future is easier than you might think.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {howItWorks.map((block) => (
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
              Give us a call today — 877-787-7558
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
