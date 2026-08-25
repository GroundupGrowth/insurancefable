import type { Metadata } from 'next';
import ThankYouPage from '../../components/ThankYouPage';
import { getThankYouPage } from '../../data/thankYouPages';

/* Native thank-you page (not migrated from live) — redirect target of the
   /ibc-modules/ request form. Noindexed like every thank-you page. */

const page = getThankYouPage('/thank-you-ibc-modules/');

export const metadata: Metadata = {
  title: { absolute: page.title },
  robots: { index: false, follow: true },
  alternates: { canonical: page.path },
};

export default function Page() {
  return <ThankYouPage page={page} />;
}
