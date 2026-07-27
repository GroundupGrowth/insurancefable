'use client';

import { useEffect } from 'react';

/* Conversion tracking for a completed opt-in: fires Meta Pixel `Lead` and GA4
   `generate_lead` once per view. Rendered on every thank-you page, since each
   one is a GHL form redirect target and landing there means a form was
   submitted.

   The pixel and gtag bootstraps in layout.tsx load afterInteractive, so their
   stubs may not exist yet when this effect first runs. Poll briefly instead of
   racing them. Never pre-create the fbq stub here: the official pixel snippet
   starts with `if(f.fbq)return`, so a pre-existing stub would stop it from
   ever loading fbevents.js. */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export default function LeadEvent() {
  useEffect(() => {
    const fire = () => {
      if (typeof window.fbq !== 'function' || typeof window.gtag !== 'function') return false;
      window.fbq('track', 'Lead');
      window.gtag('event', 'generate_lead');
      return true;
    };
    if (fire()) return;
    const timer = window.setInterval(() => {
      if (fire()) window.clearInterval(timer);
    }, 250);
    const stop = window.setTimeout(() => window.clearInterval(timer), 10000);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(stop);
    };
  }, []);

  return null;
}
