import type { Metadata } from 'next';
import EbookLanding, { ebookLandingMetadata } from '../../components/EbookLanding';
import SalesSections from './SalesSections';

/* Lead-magnet landing page (journey guide). Route: /debt-free-plan/ -> slug 'debt-free-plan'.
   Sales copy below the hero + form lives in ./SalesSections.tsx (live copy,
   verbatim). Title matches live exactly; live is noindexed. */

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const meta = await ebookLandingMetadata('debt-free-plan', {
    title: 'Debt Free Plan Ebook – I&E | Whole Life & Infinite Banking Strategies',
  });
  return { ...meta, robots: { index: false, follow: true } };
}

export default function Page() {
  return (
    <EbookLanding slug="debt-free-plan">
      <SalesSections />
    </EbookLanding>
  );
}
