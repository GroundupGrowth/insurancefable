import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import { webinar } from '../../data/webinar';
import { getWebinarContent } from '../../lib/webinarContent';
import WebinarView from './WebinarView';

/* "Live Rich, Die Rich" live webinar registration page (Barry + Steve,
   Thursday October 1, 2026, noon PT). Built 2026-09-25 as the destination for
   Dylan's ad campaign and the navbar "Upcoming Webinar" pill.

   The page body is WebinarView (shared with the editor's live preview).
   All copy is editable at /admin -> Webinar (src/data/webinarContent.ts holds
   the defaults); event timing lives in src/data/webinar.ts.

   The form posts to /api/lead/ with source `page:live-rich-die-rich-webinar:form`;
   its GHL webhook is the code default in siteForms.ts unless one is saved at
   /admin -> Forms. That GHL workflow tags the registrant, keeps them out of
   standard routing/dialer and assigns them to Barry. Noindexed: it is a
   temporary campaign page. */

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWebinarContent();
  return {
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    robots: { index: false, follow: true },
    alternates: { canonical: webinar.path },
  };
}

export default async function Page() {
  const content = await getWebinarContent();
  return (
    <PageShell>
      <WebinarView content={content} />
    </PageShell>
  );
}
