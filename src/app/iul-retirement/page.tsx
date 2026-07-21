import type { Metadata } from 'next';
import EbookLanding, { ebookLandingMetadata } from '../../components/EbookLanding';

/* Lead-magnet landing page (journey guide). Route: /iul-retirement/ -> slug 'iul-retirement'.
   Interim: hero + opt-in flow only; the live page's sales copy lands with the
   Tier B funnel migration (SalesSections, same pattern as /kingdom-money/). */

export const revalidate = 300;

export function generateMetadata(): Promise<Metadata> {
  return ebookLandingMetadata('iul-retirement');
}

export default function Page() {
  return <EbookLanding slug="iul-retirement" />;
}
