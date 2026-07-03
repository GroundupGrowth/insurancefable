import type { Metadata } from 'next';
import { ArrowRight, ExternalLink, Phone } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import EmbedSlot from '../../components/EmbedSlot';
import { getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('life-insurance-quotes');
  return pageMetadata(content);
}

// live quote engine stays on WordPress until it's rebuilt
const LIVE_QUOTES_URL = 'https://www.insuranceandestates.com/life-insurance-quotes/';

const policyTypes = [
  {
    eyebrow: 'Permanent coverage',
    title: 'Whole Life',
    text: 'Whole life insurance quotes will vary based on policy specifications. Your whole life policy can be focused on a death benefit, on cash value growth, or somewhere in between. You also have the option of choosing whole life to age 100 or age 65, or a limited pay whole life policy for 7, 10, 15 or 20 years.',
  },
  {
    eyebrow: 'Flexible design',
    title: 'Universal Life',
    text: 'Universal life insurance quotes will vary based on policy specifications. Your UL policy can be designed for death benefit protection, cash value growth, or somewhere in between. You also have the option of an increasing or level death benefit. Finally, depending on your goals and objectives, guaranteed universal life, indexed universal life or variable universal life may be chosen.',
  },
  {
    eyebrow: 'Pure protection',
    title: 'Term Life',
    text: 'Term life insurance quotes are relatively simple. A term policy can be designed so the death benefit remains level for 10, 15, 20, 25 or 30 years. Once the policy expires the term insurance premium will increase annually.',
  },
];

const quoteOptions = [
  {
    title: 'Whole Life',
    text: 'Guaranteed premiums, guaranteed growth, and cash value you control.',
  },
  {
    title: 'Term Life',
    text: 'The most coverage for the fewest dollars — level for 10 to 30 years.',
  },
  {
    title: 'Whole Life — No Exam',
    text: 'Permanent coverage without the medical exam, when speed matters.',
  },
];

export default async function LifeInsuranceQuotesPage() {
  const content = await getPageContent('life-insurance-quotes');
  return (
    <PageShell>
      <PageHero eyebrow={content.eyebrow} title={content.heroTitle} intro={content.heroIntro} />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {policyTypes.map((policy) => (
              <div key={policy.title} className="bg-white rounded-2xl p-7 border border-black/5">
                <p className="text-sm text-[#0D1B3D]/60 mb-2">{policy.eyebrow}</p>
                <h3
                  className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {policy.title}
                </h3>
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{policy.text}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap mt-10">
            <a
              href="/connect-with-our-experts/"
              className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              Connect with an Expert
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

      {/* Quote engine: paste the embed under page:life-insurance-quotes:quote-engine
          at /admin. Until then these cards link to the live quoting tool. */}
      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="bg-[#0D1B3D] rounded-3xl px-8 py-14 md:px-16 md:py-16">
            <p className="text-white/50 text-sm uppercase tracking-wide mb-2">Quote Engine</p>
            <h2
              className="text-white text-3xl md:text-5xl font-medium leading-tight mb-4"
              style={{ letterSpacing: '-0.03em' }}
            >
              Select your quote.
            </h2>

            <EmbedSlot
              slotKey="page:life-insurance-quotes:quote-engine"
              className="bg-white rounded-2xl p-2"
            >
              <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                Pick the coverage you want to price. Our quoting tool currently runs on
                insuranceandestates.com — each option below opens it there.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quoteOptions.map((option) => (
                  <a
                    key={option.title}
                    href={LIVE_QUOTES_URL}
                    className="group bg-white/5 hover:bg-white/10 rounded-2xl p-7 min-h-48 flex flex-col border border-white/10 transition-colors duration-200"
                  >
                    <h3
                      className="text-white text-xl md:text-2xl font-medium mb-3"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {option.title}
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed">{option.text}</p>
                    <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm text-white/60 group-hover:text-white transition-colors duration-200">
                      Start This Quote
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </a>
                ))}
              </div>
            </EmbedSlot>
          </div>
        </div>
      </section>

      <LeadMagnetSection />
    </PageShell>
  );
}
