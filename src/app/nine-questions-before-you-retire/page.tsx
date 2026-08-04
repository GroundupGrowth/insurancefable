import type { Metadata } from 'next';
import EbookLanding, { ebookLandingMetadata } from '../../components/EbookLanding';
import SalesSections from './SalesSections';

/* Lead-magnet landing page. Route: /nine-questions-before-you-retire/.
   Native opt-in: EbookLanding renders our LeadCaptureForm against the book's
   lead webhook (src/data/ebooks.ts) and redirects to /thank-you-nine-questions/,
   which serves the PDF. Noindexed like the other lead-magnet landings. */

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const meta = await ebookLandingMetadata('nine-questions-before-you-retire', {
    title:
      'Nine Questions Before You Retire — Free eBook – I&E | Whole Life & Infinite Banking Strategies',
    description:
      'The conversation most couples haven’t had. A free 62-page guide to the retirement questions that decide whether your plan holds up, by Jason Herring with Steve Gibbs, JD, AEP®.',
  });
  return { ...meta, robots: { index: false, follow: true } };
}

export default function Page() {
  return (
    <EbookLanding slug="nine-questions-before-you-retire">
      <SalesSections />
    </EbookLanding>
  );
}
