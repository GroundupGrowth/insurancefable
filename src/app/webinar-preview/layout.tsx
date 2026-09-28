import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/* Frame target for the live preview in /admin -> Webinar. Not a public page. */
export const metadata: Metadata = {
  title: { absolute: 'Webinar preview' },
  robots: { index: false, follow: false },
};

export default function WebinarPreviewLayout({ children }: { children: ReactNode }) {
  return children;
}
