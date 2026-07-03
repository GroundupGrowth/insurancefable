import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';

export const metadata: Metadata = {
  title: 'Start Your Journey',
  description:
    'Conventional financial advice was built for the people managing your money, not the people earning it. This curriculum is where the unlearning starts.',
};

// guide landing pages stay on WordPress until they're migrated
const BASE = 'https://www.insuranceandestates.com';

const levels = [
  {
    step: '01',
    title: 'Beginner Guides',
    intro:
      "Most people don't know what they don't know. The conventional playbook — max your 401(k), pay off debt, diversify — sounds reasonable until you realize it was written by the same institutions that profit when you follow it. These guides are where the unlearning starts — and where most people realize they were never playing their own game.",
    guides: [
      {
        title: 'New to IBC? Start Here',
        text: "Stop financing your bank's empire and start building your own.",
        cta: 'Download Here',
        href: `${BASE}/anti-banking-starter-guide/`,
      },
      {
        title: 'The Playbook They Never Handed You',
        text: 'Most Christians plan for retirement. The wealthy plan for what comes after them.',
        cta: 'Download Here',
        href: `${BASE}/kingdom-money/`,
      },
      {
        title: 'Unlearn The Financial Myths',
        text: 'The habits keeping you dependent, and how to break them.',
        cta: 'Download Here',
        href: `${BASE}/money-secrets/`,
      },
      {
        title: 'How to Eliminate Debt and Build Wealth',
        text: "You don't have to wait until the debt is gone to start building wealth.",
        cta: 'Download Here',
        href: `${BASE}/debt-free-plan/`,
      },
      {
        title: 'The Guide to Tax Free Retirement Income',
        text: "You've outgrown the 'Honda Civic' of financial tools.",
        cta: 'Download Here',
        href: `${BASE}/iul-retirement/`,
      },
    ],
  },
  {
    step: '02',
    title: 'Intermediate Guides',
    intro:
      'Understanding the principles is step one. Deploying them is where it gets real. These resources walk you through the actual design and mechanics of building your own financial infrastructure — a working system you control.',
    guides: [
      {
        title: 'Design and Deploy',
        text: 'Step-by-step video training to build your financial infrastructure correctly.',
        cta: 'Watch Them Here',
        href: `${BASE}/ibc-modules/`,
      },
      {
        title: 'Master the Mechanics',
        text: 'The exact structure behind a properly designed personal banking system.',
        cta: 'Download Here',
        href: `${BASE}/self-banking-blueprint/`,
      },
    ],
  },
  {
    step: '03',
    title: 'Advanced Guides',
    intro:
      'This is where you stop managing money and start transferring it. These resources are for people who are done building for themselves and ready to build for what comes after them — the structures that make sure what you built doesn\'t disappear in a generation.',
    guides: [
      {
        title: 'How the Whole System Works',
        text: 'Multiply your assets using whole life as your financial infrastructure.',
        cta: 'Download Here',
        href: `${BASE}/the-ultimate-asset-ebook/`,
      },
      {
        title: 'Why Most Family Wealth Disappears',
        text: "Fewer than 3% of failures trace back to bad documents. Here's the real reason.",
        cta: 'Download Here',
        href: `${BASE}/generational-transfer/`,
      },
    ],
  },
];

export default function StartYourJourneyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="The Curriculum"
        title="Build Your Own System. Start Here."
        intro="Something isn't adding up. You followed the advice. You saved. You invested. You did the responsible thing. And yet the math still doesn't work the way they said it would."
      />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="bg-[#0D1B3D] rounded-3xl px-8 py-14 md:px-16 md:py-16">
            <p
              className="text-white text-2xl md:text-4xl font-medium leading-tight max-w-4xl"
              style={{ letterSpacing: '-0.03em' }}
            >
              That&rsquo;s not a personal failure — that&rsquo;s a design feature.
            </p>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-3xl mt-6">
              Conventional financial advice was built for the people managing your money, not
              the people earning it. This curriculum exists because the wealthy have always
              operated by a different set of rules. Not secret rules. Just ones nobody bothered
              to explain.
            </p>
          </div>
        </div>
      </section>

      {levels.map((level) => (
        <section key={level.step} className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <div className="max-w-2xl mb-10">
              <p className="text-[#0D1B3D]/50 text-sm mb-2">{level.step}</p>
              <h2
                className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.05] mb-5"
                style={{ letterSpacing: '-0.04em' }}
              >
                {level.title}
              </h2>
              <p className="text-[#0D1B3D]/60 text-base md:text-lg leading-relaxed">
                {level.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {level.guides.map((guide) => (
                <a
                  key={guide.title}
                  href={guide.href}
                  className="group bg-white rounded-2xl p-7 min-h-56 flex flex-col border border-black/5 hover:border-black/10 transition-colors duration-200"
                >
                  <h3
                    className="text-[#0D1B3D] text-xl md:text-2xl font-medium mb-3"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {guide.title}
                  </h3>
                  <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{guide.text}</p>
                  <span className="mt-auto pt-6 self-start inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full group-hover:bg-[#0D1B3D] group-hover:text-white transition-colors duration-200">
                    {guide.cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}

      <LeadMagnetSection />
    </PageShell>
  );
}
