import type { Metadata } from 'next';
import PageShell from '../../../components/PageShell';
import PageHero from '../../../components/PageHero';
import CtaBand from '../../../components/CtaBand';
import Calculator from './Calculator';

const TITLE = 'Historical S&P 500 Calculator – What Would It Be Worth Today? | I&E';
const DESCRIPTION =
  'See what a lump sum invested in the S&P 500 in any year since 1928 would be worth today, with and without inflation. Real historical total returns, no email required.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/tools/sp500-historical-calculator/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/tools/sp500-historical-calculator/',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

export default function Sp500HistoricalCalculatorPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free Tool"
        title="Historical S&P 500 Calculator"
        intro="See what a lump-sum investment in the S&P 500 in any year from 1928 onward would be worth today, both the raw dollar amount and its real value adjusted for inflation."
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
              The S&amp;P 500 is an index of 500 of the largest publicly traded U.S. companies. This
              calculator uses historical annual total returns, including reinvested dividends, from
              1928 through 2024. Your lump sum is invested at the start of your chosen year and grows
              by each year&apos;s actual return. The inflation-adjusted figure divides the nominal
              value by cumulative U.S. CPI inflation over the same period, so it&apos;s expressed in
              your start year&apos;s dollars.
            </p>
            <p>
              Past performance doesn&apos;t guarantee future results. The S&amp;P 500 had a great
              century, but notice what the chart looks like through 1929&ndash;1932, 1973&ndash;1974,
              2000&ndash;2002, and 2008: any given decade can look very different, and sequence risk
              is exactly why many of our clients pair market investments with the guaranteed floor of{' '}
              <a
                href="/top-5-benefits-of-high-cash-value-whole-life-insurance/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                high cash value whole life insurance
              </a>
              . For a direct comparison, read{' '}
              <a
                href="/infinite-banking-vs-stock-market-investments/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                infinite banking vs. stock market investments
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Great average returns. Brutal worst years."
        text="A Pro Client Guide can show you how to keep market upside while building a guaranteed, liquid foundation that never has a down year."
      />
    </PageShell>
  );
}
