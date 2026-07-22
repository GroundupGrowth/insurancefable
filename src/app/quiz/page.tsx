import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import QuizFlow from './QuizFlow';

/* Lead-generation quiz: 10 questions, one at a time, scored into one of three
   strategy tracks (Infinite Banking / Tax-Free Retirement / Estate & Legacy),
   with an email capture step before the result. Noindexed on purpose, this is
   a funnel tool, not an SEO page. */

export const metadata: Metadata = {
  title: 'Find Your Wealth Strategy',
  description:
    'Take our 2-minute quiz and get a personalized plan for building wealth you control, creating tax-free retirement income, or protecting your legacy.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/quiz/' },
};

export default function QuizPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Wealth Strategy Quiz"
        title="Find Your Wealth Strategy"
        intro="Answer 10 quick questions, it takes about 2 minutes, and we will point you to the strategy that fits your goals, your timeline, and the capital you have to work with. No pitch, just a clear starting point."
      />
      <QuizFlow />
    </PageShell>
  );
}
