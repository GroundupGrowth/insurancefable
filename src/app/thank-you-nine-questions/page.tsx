import type { Metadata } from 'next';
import ThankYouPage from '../../components/ThankYouPage';
import { getThankYouPage } from '../../data/thankYouPages';

/* Redirect target for the Nine Questions opt-in. Noindexed like every other
   thank-you page. Copy lives in src/data/thankYouPages.ts. */

const page = getThankYouPage('/thank-you-nine-questions/');

export const metadata: Metadata = {
  title: { absolute: page.title },
  robots: { index: false, follow: true },
  alternates: { canonical: page.path },
};

export default function Page() {
  return <ThankYouPage page={page} />;
}
