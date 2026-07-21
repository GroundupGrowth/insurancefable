import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import AgeChartTabs from './AgeChartTabs';
import { decadeGroups } from './data';

/* 1:1 rebuild of the live (noindexed) /age-charts/ page: an h1 followed by six
   decade bands, each a Male/Female tab group holding five collapsed
   term-length sample-rate tables plus a disclaimer note. All copy and every
   figure reproduced verbatim from the live page. */

const TITLE = 'Age Charts – I&E | Whole Life & Infinite Banking Strategies';
const DESCRIPTION =
  'Male Female Life Insurance In Your 20s The following 20-29 year old sample quotes are based on a male qualifying at the top rate class. 10 Year Term FACE VALUE';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: { canonical: '/age-charts/' },
};

export default function AgeChartsPage() {
  return (
    <PageShell>
      <PageHero title="Age Charts" />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto space-y-8">
          {decadeGroups.map((group) => (
            <AgeChartTabs key={group.heading} group={group} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
