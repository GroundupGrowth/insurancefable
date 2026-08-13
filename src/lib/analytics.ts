/* Open Analytics (getopen.so) — cookieless pageviews, engagement and events.

   The tracker itself is loaded by <OpenAnalytics /> in the root layout, and
   only when NEXT_PUBLIC_OPEN_TRACKING_KEY is set (Vercel → Settings →
   Environment Variables). Without the key nothing loads and every helper
   here is a no-op, so local dev and preview builds stay out of the numbers. */

type EventValue = string | number | boolean;
export type EventProps = Record<string, EventValue | null | undefined>;

interface OpenAnalytics {
  track(name: string, props?: Record<string, EventValue>): void;
  conversion(name: string, props?: Record<string, EventValue>): void;
  consent(state: 'granted' | 'denied'): void;
}

declare global {
  interface Window {
    oa?: OpenAnalytics;
  }
}

export const OPEN_TRACKING_KEY = process.env.NEXT_PUBLIC_OPEN_TRACKING_KEY ?? '';
export const OPEN_COLLECTOR =
  process.env.NEXT_PUBLIC_OPEN_COLLECTOR ?? 'https://c.getopen.so';
export const OPEN_TEST_MODE = process.env.NEXT_PUBLIC_OPEN_TEST_MODE === 'true';

/* Open drops events with more than 32 properties, keys over 40 chars and
   values over 256, so trim to those limits rather than lose the event. */
function clean(props?: EventProps): Record<string, EventValue> {
  const out: Record<string, EventValue> = {};
  if (!props) return out;
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined || value === '') continue;
    if (Object.keys(out).length >= 32) break;
    out[key.slice(0, 40)] = typeof value === 'string' ? value.slice(0, 256) : value;
  }
  return out;
}

/* The tag is async, so a visitor can submit a form before oa exists. Hold
   those calls and replay them once it lands; give up after ~10s in case the
   script is blocked or the visitor's DNT/GPC signal stopped it loading. */
const pending: Array<(oa: OpenAnalytics) => void> = [];
let flushTimer: ReturnType<typeof setInterval> | null = null;
let attempts = 0;

function flush() {
  const oa = window.oa;
  if (oa) pending.splice(0).forEach((send) => send(oa));
  if ((oa || (attempts += 1) >= 20) && flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
}

function withTracker(send: (oa: OpenAnalytics) => void) {
  if (typeof window === 'undefined' || !OPEN_TRACKING_KEY) return;
  if (window.oa) {
    send(window.oa);
    return;
  }
  pending.push(send);
  flushTimer ??= setInterval(flush, 500);
}

/** Record an interaction — a click, a step reached, a resource opened. */
export function trackEvent(name: string, props?: EventProps) {
  const payload = clean(props);
  withTracker((oa) => oa.track(name, payload));
}

/** Record an outcome we count as a lead: form submits, calls, bookings. */
export function trackConversion(name: string, props?: EventProps) {
  const payload = clean(props);
  withTracker((oa) => oa.conversion(name, payload));
}
