'use client';

import { useEffect } from 'react';

/* Loads GoHighLevel's iframe resize script once. Any GHL form/booking iframe
   on the page (leadconnectorhq/msgsndr) then reports its real height via
   postMessage and the script resizes the iframe — no clipped embeds. */

export default function GhlResizeScript() {
  useEffect(() => {
    if (document.querySelector('script[src*="form_embed.js"]')) return;
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    document.body.appendChild(script);
  }, []);

  return null;
}
