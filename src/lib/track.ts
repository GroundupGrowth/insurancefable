import posthog from 'posthog-js';

/* PostHog custom events (Xander, 2026-09-06 — posthog.com/docs/product-
   analytics/capture-events). Safe no-op when PostHog isn't configured, so
   every call site can stay unconditional. Event vocabulary:
     lead_form_submitted   { source }   a native form POSTed to /api/lead OK
     lead_captured         { page }     a thank-you page was reached (covers
                                        GHL-embed submissions too, which
                                        redirect there)
     cta_clicked           { label, href }
     booking_link_clicked  { label, href }   a GHL calendar link
     contact_channel_clicked { channel }     call / email in the launcher */
export function track(event: string, properties?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    posthog.capture(event, properties);
  } catch {
    // analytics must never break the page
  }
}
