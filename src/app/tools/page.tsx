import type { Metadata } from 'next';
import type { LucideIcon } from 'lucide-react';
import {
  TrendingUp,
  LineChart,
  Flame,
  Target,
  DollarSign,
  ShieldCheck,
  Calculator,
  Landmark,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import CtaBand from '../../components/CtaBand';

const TITLE = 'Free Financial Calculators & Tools | I&E';
const DESCRIPTION =
  'Interactive calculators to plan your financial strategy: compound interest, historical S&P 500 returns, FIRE, savings goals, inflation, and life insurance needs. Free, no email required.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/tools/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/tools/',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

interface Tool {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const financialTools: Tool[] = [
  {
    href: '/tools/infinite-banking-calculator/',
    icon: Landmark,
    title: 'Infinite Banking Calculator',
    description:
      'Model cash value growth in a properly structured policy and what borrowing against it really costs.',
  },
  {
    href: '/tools/compound-interest-calculator/',
    icon: TrendingUp,
    title: 'Compound Interest Calculator',
    description:
      'See how your savings and monthly contributions grow over time with compounding returns.',
  },
  {
    href: '/tools/sp500-historical-calculator/',
    icon: LineChart,
    title: 'Historical S&P 500 Calculator',
    description:
      'See what a lump sum invested in the S&P 500 in any year would be worth today, with and without inflation.',
  },
  {
    href: '/tools/fire-calculator/',
    icon: Flame,
    title: 'FIRE Calculator',
    description:
      'Calculate your FIRE number and how many years until financial independence at your savings rate.',
  },
  {
    href: '/tools/savings-goal-calculator/',
    icon: Target,
    title: 'Savings Goal Calculator',
    description:
      'Find out exactly how much to save each month to hit a target by a specific date.',
  },
  {
    href: '/tools/inflation-calculator/',
    icon: DollarSign,
    title: 'Inflation Calculator',
    description:
      'See how purchasing power has changed between any two years using official U.S. CPI data.',
  },
];

const insuranceTools: Tool[] = [
  {
    href: '/life-insurance-needs-calculator/',
    icon: ShieldCheck,
    title: 'Life Insurance Needs Calculator',
    description:
      'Estimate how much coverage your family actually needs with the DIME method, in under a minute.',
  },
  {
    href: '/tools/human-life-value-calculator/',
    icon: HeartHandshake,
    title: 'Human Life Value Calculator',
    description:
      'Size coverage holistically: retirement, college, and final expenses, less what your investments will cover.',
  },
  {
    href: '/whole-life-insurance-calculator/',
    icon: Calculator,
    title: 'Whole Life Insurance Calculator',
    description:
      'Calculate whole life insurance rates and get quotes from top dividend-paying companies.',
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <a
      href={tool.href}
      className="group bg-white rounded-2xl border border-black/5 p-7 flex flex-col hover:border-black/15 transition-colors duration-200"
    >
      <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#0D1B3D]/5 text-[#0D1B3D] mb-5">
        <Icon className="w-5 h-5" />
      </span>
      <h2 className="text-[#0D1B3D] text-lg font-medium mb-2">{tool.title}</h2>
      <p className="text-[#0D1B3D]/60 text-sm leading-relaxed mb-5">{tool.description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-[#0D1B3D] text-sm font-medium">
        Open calculator
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

export default function ToolsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free Tools"
        title="Financial Calculators & Tools"
        intro="Interactive calculators to help you plan your financial strategy. Everything runs in your browser: free, private, and no email required."
      />

      <section className="px-6 pb-16">
        <div className="max-w-[72rem] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {financialTools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>

          <h2
            className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mt-16 mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Insurance calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {insuranceTools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Numbers are the easy part."
        text="Turning them into a strategy is where a Pro Client Guide comes in: real experts, no pitch, no pressure. Your first call is about your numbers and your goals, nothing else."
      />
    </PageShell>
  );
}
