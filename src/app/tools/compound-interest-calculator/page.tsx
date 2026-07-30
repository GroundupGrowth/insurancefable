import type { Metadata } from 'next';
import PageShell from '../../../components/PageShell';
import PageHero from '../../../components/PageHero';
import CtaBand from '../../../components/CtaBand';
import Calculator from './Calculator';

const TITLE = 'Compound Interest Calculator – See Your Money Grow | I&E';
const DESCRIPTION =
  'See how a starting balance plus monthly contributions grow over time with compounding returns. Free, interactive, with a year-by-year breakdown. No email required.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/tools/compound-interest-calculator/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/tools/compound-interest-calculator/',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

export default function CompoundInterestCalculatorPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free Tool"
        title="Compound Interest Calculator"
        intro="See how a starting balance plus regular contributions can grow over time when your returns compound. Drag the sliders to model different scenarios. Nothing is stored; your numbers never leave your browser."
      />

      <section className="px-6 pb-16">
        <div className="max-w-[72rem] mx-auto">
          <Calculator />
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[48rem] mx-auto bg-white rounded-2xl border border-black/5 p-8 md:p-10">
          <h2 className="text-[#0D1B3D] text-2xl font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
            How compound interest works
          </h2>
          <div className="text-[#0D1B3D]/70 leading-relaxed space-y-4">
            <p>
              Compound interest is the interest you earn on both your original balance and on the
              interest that has already accumulated. Over long periods, this snowball effect can turn
              even modest contributions into substantial sums. The earlier you start and the longer
              you stay in, the more time compounding has to work in your favor.
            </p>
            <p>
              This is the same principle behind the cash value inside a properly designed whole life
              policy: guaranteed growth plus dividends, compounding year after year without market
              drawdowns interrupting the curve. If you want to see how that compares, explore our{' '}
              <a
                href="/infinite-banking-strategy/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                infinite banking strategy
              </a>{' '}
              overview or run your own numbers with the{' '}
              <a
                href="/life-insurance-needs-calculator/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                life insurance needs calculator
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want growth you can actually count on?"
        text="Market averages are not guarantees. A Pro Client Guide can show you how uninterrupted compounding works inside a dividend-paying whole life policy, with numbers based on your situation."
      />
    </PageShell>
  );
}
