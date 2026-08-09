'use client';

import { useEffect } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';

/* Conversion tracking for a completed opt-in: fires Meta Pixel `Lead` and
   pushes dataLayer event `generate_lead` (forwarded to GA4 by GTM) once per
   view. Rendered on every thank-you page, since each one is a GHL form
   redirect target and landing there means a form was submitted.

   GA4 loads exclusively through GTM-MDHKCKNF — there is no window.gtag on the
   page anymore. sendGTMEvent pushes to dataLayer, which GTM drains on load,
   so it is safe to call immediately.

   The pixel bootstrap in layout.tsx loads afterInteractive, so its stub may
   not exist yet when this effect first runs. Poll briefly instead of racing
   it. Never pre-create the fbq stub here: the official pixel snippet starts
   with `if(f.fbq)return`, so a pre-existing stub would stop it from ever
   loading fbevents.js. */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function LeadEvent() {
  useEffect(() => {
    sendGTMEvent({ event: 'generate_lead' });
    const fire = () => {
      if (typeof window.fbq !== 'function') return false;
      window.fbq('track', 'Lead');
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
