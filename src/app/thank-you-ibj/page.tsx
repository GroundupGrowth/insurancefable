import type { Metadata } from 'next';
import ThankYouPage from '../../components/ThankYouPage';
import { getThankYouPage } from '../../data/thankYouPages';

/* WordPress thank-you page (GHL form redirect target).
   Noindexed on live — must stay noindexed. Copy lives in src/data/thankYouPages.ts. */

const page = getThankYouPage('/thank-you-ibj/');

export const metadata: Metadata = {
  title: { absolute: page.title },
  robots: { index: false, follow: true },
  alternates: { canonical: page.path },
};

export default function Page() {
  return <ThankYouPage page={page} />;
}
