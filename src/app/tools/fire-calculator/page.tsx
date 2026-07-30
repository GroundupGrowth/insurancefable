import type { Metadata } from 'next';
import PageShell from '../../../components/PageShell';
import PageHero from '../../../components/PageHero';
import CtaBand from '../../../components/CtaBand';
import Calculator from './Calculator';

const TITLE = 'FIRE Calculator – Your Number and Years to Financial Independence | I&E';
const DESCRIPTION =
  'Calculate your FIRE number and how many years until financial independence at your savings rate. Interactive, free, and private. No email required.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/tools/fire-calculator/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/tools/fire-calculator/',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

export default function FireCalculatorPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free Tool"
        title="FIRE Calculator"
        intro="FIRE stands for Financial Independence, Retire Early. Calculate your FIRE number, how long until you hit it, and what it takes to get there. Your numbers never leave your browser."
      />

      <section className="px-6 pb-16">
        <div className="max-w-[72rem] mx-auto">
          <Calculator />
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[48rem] mx-auto bg-white rounded-2xl border border-black/5 p-8 md:p-10">
          <h2 className="text-[#0D1B3D] text-2xl font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
            How this works
          </h2>
          <div className="text-[#0D1B3D]/70 leading-relaxed space-y-4">
            <p>
              Your FIRE number is the portfolio size at which your investment returns can cover your
              expenses indefinitely. The classic 4% rule, from the Trinity Study, suggests you can
              withdraw 4% of your portfolio annually without running out, which puts your FIRE number
              at 25 times your annual expenses. We simulate your portfolio month by month until it
              hits that target.
            </p>
            <p>
              The catch: sequence-of-returns risk. A bad market in the first years of retirement can
              sink a plan that looked bulletproof on paper. That&apos;s why many early retirees keep
              a &quot;volatility buffer&quot; of guaranteed, liquid cash value they can draw on in
              down years instead of selling stocks at a loss. Learn how that works in our{' '}
              <a
                href="/infinite-banking-strategy/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                infinite banking strategy
              </a>{' '}
              guide, or see{' '}
              <a
                href="/iul-retirement/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                how policies fit into retirement planning
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Retiring early takes more than a number."
        text="A Pro Client Guide can stress-test your FIRE plan and show you how a volatility buffer protects your first decade of withdrawals."
      />
    </PageShell>
  );
}
