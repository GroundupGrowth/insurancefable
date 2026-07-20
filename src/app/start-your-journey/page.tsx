import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import JourneyLadder, { type JourneyLevel } from '../../components/JourneyLadder';
import { getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('start-your-journey');
  return pageMetadata(content);
}

// Live gives each card its own funnel page (/anti-banking-starter-guide/,
// /money-secrets/, /ibc-modules/, /the-ultimate-asset-ebook/, /generational-transfer/,
// /debt-free-plan/, /iul-retirement/, /kingdom-money/, /self-banking-blueprint/).
// None of those routes exist here yet — see docs/migration/phase-2-backlog.md — so
// every card routes to the on-site catalog rather than a 404.
const GUIDES_HREF = '/ebooks-and-guides/';

const UPLOADS = '/wp-content/uploads';

const levels: JourneyLevel[] = [
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
        image: `${UPLOADS}/Anti-Banking-Starter-Guide.webp`,
        alt: 'Anti Banking Starter Guide',
        href: GUIDES_HREF,
      },
      {
        title: 'The Playbook They Never Handed You',
        text: 'Most Christians plan for retirement. The wealthy plan for what comes after them.',
        cta: 'Download Here',
        image: `${UPLOADS}/Kingdom-Money-1.webp`,
        alt: 'Kingdom Money',
        href: GUIDES_HREF,
      },
      {
        title: 'Unlearn The Financial Myths',
        text: 'The habits keeping you dependent, and how to break them.',
        cta: 'Download Here',
        image: `${UPLOADS}/Money-Secrets-of-the-Wealthy.webp`,
        alt: 'Money Secrets of the Wealthy',
        href: GUIDES_HREF,
      },
      {
        title: 'How to Eliminate Debt and Build Wealth',
        text: "You don't have to wait until the debt is gone to start Building Wealth",
        cta: 'Download Here',
        image: `${UPLOADS}/Component-17.webp`,
        alt: 'Wealth Plan',
        href: GUIDES_HREF,
      },
      {
        title: 'The Guide to Tax Free Retirement Income',
        text: 'You’ve outgrown the “Honda Civic” of financial tools.',
        cta: 'Download Here',
        image: `${UPLOADS}/Component-10.webp`,
        alt: 'IUL Retirement',
        href: GUIDES_HREF,
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
        cta: 'Watch them here',
        image: `${UPLOADS}/10-Modules-on-Infinite-Banking-.webp`,
        alt: '10 Modules on Infinite Banking',
        href: GUIDES_HREF,
      },
      {
        title: 'Master the Mechanics',
        text: 'The exact structure behind a properly designed personal banking system.',
        cta: 'Download Here',
        image: `${UPLOADS}/The-Self-Banking-Blueprint.webp`,
        alt: 'The Self Banking Blueprint',
        href: GUIDES_HREF,
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
        image: `${UPLOADS}/The-Ultimate-Asset-2.webp`,
        alt: 'The Ultimate Asset',
        href: GUIDES_HREF,
      },
      {
        title: 'Why Most Family Wealth Disappears',
        text: "Fewer than 3% of failures trace back to bad documents. Here's the real reason.",
        cta: 'Download Here',
        image: `${UPLOADS}/The-Generational-Transfer.webp`,
        alt: 'The Generational Transfer',
        href: GUIDES_HREF,
      },
    ],
  },
];

export default async function StartYourJourneyPage() {
  const content = await getPageContent('start-your-journey');
  return (
    <PageShell>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.heroTitle}
        intro={content.heroIntro}
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

      <JourneyLadder levels={levels} />

      <LeadMagnetSection />
    </PageShell>
  );
}
