import type { Metadata } from 'next';
import EbookLanding, { ebookLandingMetadata } from '../../components/EbookLanding';
import SalesSections from './SalesSections';

/* Video-course landing page. Route: /ibc-modules/ -> slug 'ibc-modules'.
   The live page's hero copy + ten module videos live in ./SalesSections.tsx
   (live copy, verbatim). Title matches live exactly; live is noindexed. */

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const meta = await ebookLandingMetadata('ibc-modules', {
    title: 'IBC Modules – I&E | Whole Life & Infinite Banking Strategies',
  });
  return { ...meta, robots: { index: false, follow: true } };
}

export default function Page() {
  return (
    <EbookLanding slug="ibc-modules">
      <SalesSections />
    </EbookLanding>
  );
}
