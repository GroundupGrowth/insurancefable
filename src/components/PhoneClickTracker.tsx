'use client';

import { useEffect } from 'react';
import { trackConversion } from '../lib/analytics';

/* Calls are the other half of the funnel: the 877 number sits in the footer,
   in every form disclaimer and on most service pages. One delegated listener
   catches every tel: link on the site, including ones added later. */

export default function PhoneClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (!link) return;

      trackConversion('phone_click', {
        number: link.getAttribute('href')?.slice(4),
        path: window.location.pathname,
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
