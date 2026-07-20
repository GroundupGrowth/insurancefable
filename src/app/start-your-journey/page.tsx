import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import PageShell from '../../components/PageShell';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';

/* 1:1 clone of the live /start-your-journey/ page
   (extraction/parsed/start-your-journey.json + screenshot).
   Live section order: "Build Your Own System. Start Here." hero,
   Beginner / Intermediate / Advanced guide card sections, closing
   "Connect with an Expert" pill, Generational Transfer band.
   No video embeds on live (grep for youtube.com/embed came back empty). */

export const metadata: Metadata = {
  title: {
    absolute: 'Start Your Journey – I&E | Whole Life & Infinite Banking Strategies',
  },
  alternates: { canonical: '/start-your-journey/' },
};

interface GuideCard {
  titleLines: string[];
  subtitle: string;
  img: string;
  alt: string;
  href: string;
  cta: string;
  ctaIcon: 'download' | 'none';
}

const beginnerGuides: GuideCard[] = [
  {
    titleLines: ['New to IBC?', 'Start Here'],
    subtitle: "Stop financing your bank's empire and start building your own.",
    img: '/wp-content/uploads/Anti-Banking-Starter-Guide.webp',
    alt: 'Anti Banking Starter Guide',
    href: '/anti-banking-starter-guide/',
    cta: 'Download Here',
    ctaIcon: 'download',
  },
  {
    titleLines: ['The Playbook They Never Handed You'],
    subtitle:
      'Most Christians plan for retirement. The wealthy plan for what comes after them.',
    img: '/wp-content/uploads/Kingdom-Money-1.webp',
    alt: 'Kingdom Money',
    href: '/kingdom-money/',
    cta: 'Download Here',
    ctaIcon: 'download',
  },
  {
    titleLines: ['Unlearn The Financial Myths'],
    subtitle: 'The habits keeping you dependent, and how to break them.',
    img: '/wp-content/uploads/Money-Secrets-of-the-Wealthy.webp',
    alt: 'Money Secrets of the Wealthy',
    href: '/money-secrets/',
    cta: 'Download Here',
    ctaIcon: 'download',
  },
  {
    titleLines: ['How to Eliminate Debt and Build Wealth'],
    subtitle: "You don't have to wait until the debt is gone to start Building Wealth",
    img: '/wp-content/uploads/Component-17.webp',
    alt: 'Wealth Plan',
    href: '/debt-free-plan/',
    cta: 'Download Here',
    ctaIcon: 'download',
  },
  {
    titleLines: ['The Guide to Tax Free Retirement Income'],
    subtitle: 'You’ve outgrown the "Honda Civic" of financial tools.',
    img: '/wp-content/uploads/Component-10.webp',
    alt: 'IUL retirment',
    href: '/iul-retirement/',
    cta: 'Download Here',
    ctaIcon: 'download',
  },
];

const intermediateGuides: GuideCard[] = [
  {
    titleLines: ['Design and Deploy'],
    subtitle:
      'Step-by-step video training to build your financial infrastructure correctly.',
    img: '/wp-content/uploads/10-Modules-on-Infinite-Banking-.webp',
    alt: '10 Modules on Infinite Banking',
    href: '/ibc-modules/',
    cta: 'Watch them here',
    ctaIcon: 'none',
  },
  {
    titleLines: ['Master the Mechanics'],
    subtitle:
      'The exact structure behind a properly designed personal banking system.',
    img: '/wp-content/uploads/The-Self-Banking-Blueprint.webp',
    alt: 'The Self Banking Blueprint',
    href: '/self-banking-blueprint/',
    cta: 'Download Here',
    ctaIcon: 'download',
  },
];

const advancedGuides: GuideCard[] = [
  {
    titleLines: ['How the Whole System Works'],
    subtitle: 'Multiply your assets using whole life as your financial infrastructure.',
    img: '/wp-content/uploads/The-Ultimate-Asset-2.webp',
    alt: 'The Ultimate Asset',
    href: '/the-ultimate-asset-ebook/',
    cta: 'Download Here',
    ctaIcon: 'download',
  },
  {
    titleLines: ['Why Most Family Wealth Disappears'],
    subtitle:
      "Fewer than 3% of failures trace back to bad documents. Here's the real reason.",
    img: '/wp-content/uploads/The-Generational-Transfer.webp',
    alt: 'The Generational Transfer',
    href: '/generational-transfer/',
    cta: 'Download Here',
    ctaIcon: 'download',
  },
];

/* Section intros — verbatim from the parsed JSON (typos included) */
const beginnerIntro =
  "Most people don't know what they don't know. The conventional playbook — max your 401(k), pay off debt, diversify — sounds reasonable until you realize it was written by the same institutions that profit when you follow it. These guides are where the unlearning starts — and where most people realize they were never playing their own game..";
const intermediateIntro =
  'Understanding the principles is step one. Deploying them is where it gets real. These resources walk you through the actual design and mechanics of building your own financial infrastructure — a working system you control.';
const advancedIntro =
  "This is where you stop managing money and start transferring it. These resources are for people who are done building for themselves and ready to build for what comes after them — the structures that make sure what you built doesn't disappear in a generation.";
const heroIntro =
  "Something isn't adding up. You followed the advice. You saved. You invested. You did the responsible thing. And yet the math still doesn't work the way they said it would. That's not a personal failure — that's a design feature. Conventional financial advice was built for the people managing your money, not the people earning it. This curriculum exists because the wealthy have always operated by a different set of rules. Not secret rules. Just ones nobody bothered to explain.";

/* ion-md-download equivalent (live "Download Here" buttons carry this icon) */
function DownloadIcon() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" className="w-4 h-4" fill="currentColor">
      <path d="M403 217h-90V88c0-9-7-16-16-16h-82c-9 0-16 7-16 16v129h-90c-14 0-21 17-11 27l148 148c6 6 16 6 22 0l148-148c10-10 3-27-13-27zM88 424v40c0 9 7 16 16 16h304c9 0 16-7 16-16v-40c0-9-7-16-16-16H104c-9 0-16 7-16 16z" />
    </svg>
  );
}

/* ion-ios-calendar equivalent (hero CTA icon on live) */
function CalendarIcon() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" className="w-4 h-4" fill="currentColor">
      <path d="M416 64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 48v16H96a64 64 0 00-64 64v12a4 4 0 004 4h440a4 4 0 004-4v-12a64 64 0 00-64-64zM477 176H35a3 3 0 00-3 3v237a64 64 0 0064 64h320a64 64 0 0064-64V179a3 3 0 00-3-3z" />
    </svg>
  );
}

const pillButtonClass =
  'inline-flex items-center gap-2 bg-[#7BBD44] text-white text-[15px] leading-[1.7] tracking-[0.5px] rounded-[20px] px-[15px] py-[7.5px] transition-opacity duration-200 hover:opacity-90';

function GuideCardBox({ card }: { card: GuideCard }) {
  return (
    <div className="w-full max-w-[320px] bg-[#F2F2F2] rounded-xl overflow-hidden text-center flex flex-col">
      <div className="px-5 pt-6 pb-4">
        <h3 className="text-[#262626] font-semibold text-[19px] leading-snug">
          {card.titleLines.map((line, index) => (
          <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </h3>
        <p className="text-[#363636] text-[13px] leading-[1.6] mt-2">{card.subtitle}</p>
      </div>
      <img src={card.img} alt={card.alt} className="block w-full h-auto mt-auto" />
      <div className="py-4">
        <a href={card.href} className={pillButtonClass}>
          {card.cta}
          {card.ctaIcon === 'download' && <DownloadIcon />}
        </a>
      </div>
    </div>
  );
}

function GuideSection({
  heading,
  intro,
  cards,
  className,
  children,
}: {
  heading: string;
  intro: string;
  cards: GuideCard[];
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`px-6 py-14 ${className ?? ''}`}>
      <div className="max-w-[1100px] mx-auto text-center">
        <h2 className="text-[#2A6493] font-medium text-[34px] md:text-[42px] leading-tight">
          {heading}
        </h2>
        <div className="max-w-[880px] mx-auto mt-5 text-[#363636] text-[15px] leading-[1.7]">
          <strong>{intro}</strong>
        </div>
        <div className="flex flex-wrap justify-center gap-7 mt-10">
          {cards.map((card) => (
            <GuideCardBox key={card.href} card={card} />
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}

export default function StartYourJourneyPage() {
  return (
    <PageShell>
      {/* Hero — white with the live page's soft pastel shape decorations (approximated
          from the screenshot; the live shapes come from external theme CSS) */}
      <section className="relative overflow-hidden px-6 pt-16 md:pt-20 pb-10">
        <div aria-hidden className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="absolute left-[12%] top-[30%] w-10 h-10 rounded-lg bg-[#F0D9D7] rotate-12" />
          <div className="absolute left-[30%] top-[8%] w-6 h-6 rounded-full bg-[#EFC2BD]" />
          <div className="absolute right-[24%] top-[6%] w-9 h-9 rounded-full bg-[#F7958A] opacity-70" />
          <div className="absolute right-[10%] top-[34%] w-16 h-16 rounded-full bg-[#DDEBD5]" />
          <div className="absolute right-[6%] top-[12%] w-7 h-7 rounded-lg bg-[#DAD4E8] -rotate-6" />
          <div className="absolute left-[8%] top-[65%] w-5 h-5 rounded-full bg-[#CADFE5]" />
        </div>

        <div className="relative max-w-[820px] mx-auto text-center">
          <h1 className="text-[#262626] font-medium text-[38px] md:text-[50px] leading-[1.2]">
            Build Your Own System.
            <br />
            <span style={{ color: '#457f18' }}>Start Here.</span>
          </h1>
          <p className="text-[#363636] text-[15px] leading-[1.7] max-w-[640px] mx-auto mt-6">
            {heroIntro}
          </p>
          <div className="mt-8">
            <a href="/connect-with-our-experts/" className={pillButtonClass}>
              Connect with an Expert
              <CalendarIcon />
            </a>
          </div>
        </div>
      </section>

      <GuideSection heading="Beginner Guides" intro={beginnerIntro} cards={beginnerGuides} />

      <GuideSection
        heading="Intermediate Guides"
        intro={intermediateIntro}
        cards={intermediateGuides}
        className="bg-[#F5F5F5]"
      />

      <GuideSection heading="Advanced Guides" intro={advancedIntro} cards={advancedGuides}>
        <div className="mt-12">
          <a href="/connect-with-our-experts/" className={pillButtonClass}>
            Connect with an Expert
            <CalendarIcon />
          </a>
        </div>
      </GuideSection>

      <GenerationalTransferBand />
    </PageShell>
  );
}
