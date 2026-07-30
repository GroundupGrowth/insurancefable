import type { Metadata } from 'next';
import PageShell from '../../../components/PageShell';
import PageHero from '../../../components/PageHero';
import CtaBand from '../../../components/CtaBand';
import HlvCalculator from '../../../components/tools/HlvCalculator';

const TITLE = 'Human Life Value Calculator – How Much Life Insurance? | I&E';
const DESCRIPTION =
  'Calculate your human life value: retirement income, college costs, and final expenses, less what your investments are projected to cover. Free, interactive, no email required.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/tools/human-life-value-calculator/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/tools/human-life-value-calculator/',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

export default function HumanLifeValueCalculatorPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free Tool"
        title="Human Life Value Calculator"
        intro="A holistic way to size life insurance: what your family would need for retirement, college, and final expenses, less what your investments are projected to cover by then. Your numbers never leave your browser."
      />

      <section className="px-6 pb-16">
        <div className="max-w-[72rem] mx-auto">
          <HlvCalculator />
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[48rem] mx-auto bg-white rounded-2xl border border-black/5 p-8 md:p-10">
          <h2 className="text-[#0D1B3D] text-2xl font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
            How this works
          </h2>
          <div className="text-[#0D1B3D]/70 leading-relaxed space-y-4">
            <p>
              Your{' '}
              <a
                href="/human-life-value-approach/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                human life value
              </a>{' '}
              is the economic value you represent to the people who depend on you. This calculator
              totals the big future obligations (funding retirement for your spouse, putting kids
              through school, final expenses) and subtracts what your current investments plus
              annual contributions are projected to grow to by your retirement age. The gap is the
              coverage that disappears from your family&apos;s future if you do.
            </p>
            <p>
              It answers a different question than the{' '}
              <a
                href="/life-insurance-needs-calculator/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                DIME needs calculator
              </a>
              , which focuses on debts and income replacement today. Run both: if the numbers are
              far apart, the difference usually tells you something about how much of your plan
              currently depends on you staying alive and earning.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Have your number? Now design the policy around it."
        text="A Fit Call turns this estimate into a real strategy: the right coverage, structured to build cash value you control, not just a death benefit."
      />
    </PageShell>
  );
}
