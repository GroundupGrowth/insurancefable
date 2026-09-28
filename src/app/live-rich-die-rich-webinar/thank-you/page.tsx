import type { Metadata } from 'next';
import PageShell from '../../../components/PageShell';
import LeadEvent from '../../../components/LeadEvent';
import { webinar } from '../../../data/webinar';
import { getWebinarContent } from '../../../lib/webinarContent';
import ThankYouView from './ThankYouView';

/* Confirmation page for the Live Rich, Die Rich webinar form (SimpleLeadForm
   redirects here on a successful /api/lead/ POST). Landing here fires the
   Meta `Lead` + GA4 `generate_lead` conversion via <LeadEvent />, which the
   ad campaign optimizes on. Copy is editable at /admin -> Webinar.
   Noindexed. */

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "You're registered | Live Rich, Die Rich Webinar" },
  robots: { index: false, follow: false },
  alternates: { canonical: webinar.thankYouPath },
};

export default async function Page() {
  const content = await getWebinarContent();
  return (
    <PageShell>
      <LeadEvent />
      <ThankYouView content={content} />
    </PageShell>
  );
}
