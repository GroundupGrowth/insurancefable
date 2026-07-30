import type { Metadata } from 'next';
import PageShell from '../../../components/PageShell';
import PageHero from '../../../components/PageHero';
import CtaBand from '../../../components/CtaBand';
import Calculator from './Calculator';

const TITLE = 'Infinite Banking Calculator – Model Cash Value & Policy Loans | I&E';
const DESCRIPTION =
  'Model how cash value grows in a properly structured whole life policy and what happens when you borrow against it instead of from a bank. Free, interactive, no email required.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/tools/infinite-banking-calculator/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/tools/infinite-banking-calculator/',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

export default function InfiniteBankingCalculatorPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free Tool"
        title="Infinite Banking Calculator"
        intro="Model how cash value builds inside a properly structured whole life policy, then see what happens when you borrow against it for a major purchase instead of going to a bank. Your numbers never leave your browser."
      />

      <section className="px-6 pb-16">
        <div className="max-w-[72rem] mx-auto">
          <Calculator />
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[48rem] mx-auto bg-white rounded-2xl border border-black/5 p-8 md:p-10">
          <h2 className="text-[#0D1B3D] text-2xl font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
            How this model works
          </h2>
          <div className="text-[#0D1B3D]/70 leading-relaxed space-y-4">
            <p>
              A properly structured whole life policy splits your premium between base coverage and
              paid-up additions (PUA). More PUA means more of each dollar lands in cash value from
              day one, which is why the PUA slider changes your early-year numbers so much. In this
              model, each premium dollar is credited at an efficiency that starts around 50 to 70
              percent in year one and climbs to 98 percent by year nine, and the whole balance
              compounds at your chosen dividend rate. That is the characteristic shape of a real
              high-cash-value design: a small early drag, then decades of uninterrupted compounding.
              Read more in{' '}
              <a
                href="/infinite-banking-properly-structured-policy-with-pua/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                what makes a policy properly structured
              </a>
              .
            </p>
            <p>
              The loan section shows the core of the infinite banking concept: you borrow{' '}
              <em>against</em> your cash value, not <em>from</em> it. The carrier lends you its
              money with your policy as collateral, so your full balance keeps compounding while
              you repay on your own schedule. You pay loan interest either way in life; the
              question is whether it goes to a bank or works within your own system, at a lower
              rate, with no application, credit check, or repayment demands. For the honest
              trade-offs, see{' '}
              <a
                href="/pros-and-cons-of-the-infinite-banking-concept/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                the pros and cons of infinite banking
              </a>{' '}
              and our{' '}
              <a
                href="/top-10-faqs-about-infinite-banking/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                top 10 infinite banking FAQs
              </a>
              .
            </p>
            <p>
              One important caveat: this is an educational simplification. Real policies have
              guaranteed values plus non-guaranteed dividends, and the only numbers that matter are
              the ones in a carrier illustration built for your age, health, and funding level.
              Treat this tool as a way to understand the mechanics, not as a quote.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Like the mechanics? See your real numbers."
        text="A Pro Client Guide will design a policy illustration around your situation with a top dividend-paying mutual company. No pitch, no pressure, and the illustration is free."
      />
    </PageShell>
  );
}
