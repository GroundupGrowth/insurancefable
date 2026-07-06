import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import CtaBand from '../../components/CtaBand';
import NeedsCalculator from './NeedsCalculator';

export const revalidate = 300;

const TITLE = 'Life Insurance Needs Calculator – How Much Coverage Do You Need? | I&E';
const DESCRIPTION =
  'Estimate how much life insurance you need in seconds with the DIME method — income replacement, debts, mortgage, and education, less what you already have. Free, private, no email required.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/life-insurance-needs-calculator/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/life-insurance-needs-calculator/',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

export default function LifeInsuranceNeedsCalculatorPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free Calculator"
        title="How much life insurance do you actually need?"
        intro="Most people are guessing — or trusting a rule of thumb that doesn't fit their life. This calculator uses the DIME method (Debt, Income, Mortgage, Education) to give you a real number in under a minute. Nothing is stored; your numbers never leave your browser."
      />

      <section className="px-6 pb-24">
        <div className="max-w-[72rem] mx-auto">
          <NeedsCalculator />
        </div>
      </section>

      <CtaBand
        title="Have your number? Now design the policy around it."
        text="A Fit Call turns this estimate into a real strategy — the right coverage, structured to build cash value you control, not just a death benefit."
      />
    </PageShell>
  );
}
