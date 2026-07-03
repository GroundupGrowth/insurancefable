import type { Metadata } from 'next';
import { ArrowRight, Phone } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';

export const metadata: Metadata = {
  title: 'Annuities',
  description:
    'Customized annuity solutions that provide the financial security and peace of mind you need for your retirement journey.',
};

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

export default function AnnuitiesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Products"
        title="Annuities"
        intro="Helping you answer life's big questions. Regardless of your age or health status, we have options for you. Our customized annuity solutions provide the financial security and peace of mind you need for your retirement journey."
      >
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
      </PageHero>

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
              href="tel:1-877-787-7558"
              className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              Give us a call today — 877-787-7558
              <span className="bg-white rounded-full p-2">
                <Phone className="w-5 h-5 text-[#0D1B3D]" />
              </span>
            </a>
            <a
              href="/life-insurance-quotes/"
              className="inline-flex items-center bg-white text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full border border-black/5 hover:bg-white/70 transition-colors duration-200"
            >
              Compare Quotes
            </a>
          </div>
        </div>
      </section>

      <LeadMagnetSection />
    </PageShell>
  );
}
