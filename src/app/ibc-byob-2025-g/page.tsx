import type { Metadata } from 'next';
import WorkshopLanding from '../ibc-byob-2025-fb/WorkshopContent';

/* Human Life Value Workshop — Google ad variant. Route: /ibc-byob-2025-g/.
   Content is shared with /ibc-byob-2025-fb/ (see that folder's
   WorkshopContent.tsx); this variant's live <title> and Zoom registration URL
   differ. Noindexed on live. */

export const metadata: Metadata = {
  title: {
    absolute:
      'Human Life Value Workshop: Unlock the Secret to Building True Generational Wealth Through Your Greatest Asset – I&E | Whole Life & Infinite Banking Strategies',
  },
  robots: { index: false, follow: true },
  alternates: { canonical: '/ibc-byob-2025-g/' },
};

export default function Page() {
  return (
    <WorkshopLanding registerUrl="https://us06web.zoom.us/webinar/register/3317470894064/WN_HQ8xbqhiSWeWuP4fkS6JUg" />
  );
}
