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
    /* oa.js falls back to this name when something else already owns
       window.oa — a third-party form embed, say. */
    openanalytics?: OpenAnalytics;
  }
}

/* The oa_pk_ key is a public, write-only ingest key. It ships in the page
   source of every site using Open, exactly like a GA measurement ID, so it
   lives here rather than in an env var nobody remembers to set. Override it
   per-environment with NEXT_PUBLIC_OPEN_TRACKING_KEY if the site ever needs
   to report into a different Open property. */
export const OPEN_TRACKING_KEY =
  process.env.NEXT_PUBLIC_OPEN_TRACKING_KEY || 'oa_pk_SkmfDq_GkfNc8-1wSgPRdi1wZWiqdPYs';
export const OPEN_COLLECTOR =
  process.env.NEXT_PUBLIC_OPEN_COLLECTOR || 'https://c.getopen.so';

/* Never report from `next dev`. NODE_ENV is inlined into both the server and
   the client bundle, so the tag and these helpers always agree on this. */
export const OPEN_ENABLED =
  process.env.NODE_ENV === 'production' && OPEN_TRACKING_KEY.length > 0;

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

function tracker(): OpenAnalytics | undefined {
  const found = window.oa ?? window.openanalytics;
  return typeof found?.track === 'function' ? found : undefined;
}

function flush() {
  const oa = tracker();
  if (oa) pending.splice(0).forEach((send) => send(oa));
  if ((oa || (attempts += 1) >= 20) && flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
}

function withTracker(send: (oa: OpenAnalytics) => void) {
  if (typeof window === 'undefined' || !OPEN_ENABLED) return;
  const oa = tracker();
  if (oa) {
    send(oa);
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
