import type { Metadata } from 'next';
import WorkshopLanding from './WorkshopContent';

/* Human Life Value Workshop — Facebook ad variant. Route: /ibc-byob-2025-fb/.
   Content is shared with /ibc-byob-2025-g/ (see ./WorkshopContent.tsx); this
   variant's live <title> and Zoom registration URL differ. Noindexed on live. */

export const metadata: Metadata = {
  title: {
    absolute:
      'Using the Ultimate Asset: Unlock the $130 Billion Banking Secret to Build True Wealth – FB – I&E | Whole Life & Infinite Banking Strategies',
  },
  robots: { index: false, follow: true },
  alternates: { canonical: '/ibc-byob-2025-fb/' },
};

export default function Page() {
  return (
    <WorkshopLanding registerUrl="https://us06web.zoom.us/webinar/register/6117470894262/WN_HQ8xbqhiSWeWuP4fkS6JUg" />
  );
}
