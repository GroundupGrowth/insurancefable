import type { Metadata } from 'next';
import PageShell from '../../../components/PageShell';
import PageHero from '../../../components/PageHero';
import CtaBand from '../../../components/CtaBand';
import Calculator from './Calculator';

const TITLE = 'Savings Goal Calculator – How Much to Save Each Month | I&E';
const DESCRIPTION =
  'Enter a goal and a timeline and find out exactly how much to save each month to hit it, accounting for growth on your balance. Free and private, no email required.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/tools/savings-goal-calculator/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/tools/savings-goal-calculator/',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

export default function SavingsGoalCalculatorPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free Tool"
        title="Savings Goal Calculator"
        intro="Enter a goal and a timeline. We'll tell you exactly how much to put away each month to hit it, accounting for the growth on your balance. Your numbers never leave your browser."
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
              This is the compound interest formula solved for the monthly contribution instead of
              the final balance. Your starting balance grows on its own, and we calculate the extra
              monthly deposit needed to close the gap by your target date. Try the forward direction
              with the{' '}
              <a
                href="/tools/compound-interest-calculator/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                compound interest calculator
              </a>
              .
            </p>
            <p>
              Where you park those monthly deposits matters as much as the amount. Money earmarked
              for a goal a few years out has no business riding out a market crash, which is why
              many families use high cash value whole life as the &quot;warehouse&quot; for
              medium-term savings: guaranteed growth, no down years, and you can borrow against it
              without interrupting the compounding. See how in our{' '}
              <a
                href="/self-banking-blueprint/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                Self Banking Blueprint
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Know your number. Now pick the right vehicle."
        text="A Pro Client Guide can show you where disciplined savers warehouse their monthly contributions so the money grows guaranteed and stays accessible."
      />
    </PageShell>
  );
}
