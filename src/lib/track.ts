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

/** Stitch the visitor's anonymous sessions to the person once they submit a
    form: from then on the lead's whole pre-submit journey (every page read,
    every CTA clicked) is on their PostHog person profile, keyed by email —
    the same key GHL uses, so the two line up. */
export function identifyLead(email: string, properties?: Record<string, unknown>): void {
  const id = email.trim().toLowerCase();
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_POSTHOG_KEY || !id) return;
  try {
    posthog.identify(id, { email: id, ...properties });
  } catch {
    // analytics must never break the page
  }
}
