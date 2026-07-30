import type { Metadata } from 'next';
import PageShell from '../../../components/PageShell';
import PageHero from '../../../components/PageHero';
import CtaBand from '../../../components/CtaBand';
import Calculator from './Calculator';

const TITLE = 'Inflation Calculator – Purchasing Power Between Any Two Years | I&E';
const DESCRIPTION =
  'See how purchasing power has changed between any two years from 1928 to today using official U.S. CPI data. Free, interactive, no email required.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/tools/inflation-calculator/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/tools/inflation-calculator/',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

export default function InflationCalculatorPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free Tool"
        title="Inflation Calculator"
        intro="How much purchasing power has been lost (or gained) between any two years? Uses official U.S. CPI data from 1928 through 2024. Your numbers never leave your browser."
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
              The U.S. Consumer Price Index (CPI) measures the average change in prices paid by
              urban consumers for a basket of goods and services. This calculator uses year-over-year
              CPI changes published by the U.S. Bureau of Labor Statistics to translate a dollar
              amount from one year into its equivalent purchasing power in another year.
            </p>
            <p>
              Inflation is the quiet tax on idle money: cash sitting in a low-yield account loses
              purchasing power every single year. That&apos;s a core reason families use
              dividend-paying whole life insurance as a place to store capital, where guaranteed
              growth plus dividends have historically kept long-term savings ahead of the erosion.
              See why in our{' '}
              <a
                href="/the-ultimate-asset-ebook/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                Ultimate Asset guide
              </a>{' '}
              or explore the{' '}
              <a
                href="/infinite-banking-strategy/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                infinite banking strategy
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Inflation never takes a year off. Neither should your money."
        text="A Pro Client Guide can show you how to keep your safe capital growing instead of quietly shrinking in a bank account."
      />
    </PageShell>
  );
}
