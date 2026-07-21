import type { Metadata } from 'next';
import EbookLanding, { ebookLandingMetadata } from '../../components/EbookLanding';

/* Lead-magnet landing page (journey guide). Route: /anti-banking-starter-guide/ -> slug 'anti-banking-starter-guide'.
   Interim: hero + opt-in flow only; the live page's sales copy lands with the
   Tier B funnel migration (SalesSections, same pattern as /kingdom-money/). */

export const revalidate = 300;

export function generateMetadata(): Promise<Metadata> {
  return ebookLandingMetadata('anti-banking-starter-guide');
}

export default function Page() {
  return <EbookLanding slug="anti-banking-starter-guide" />;
}
