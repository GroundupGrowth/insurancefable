import { OPEN_COLLECTOR, OPEN_ENABLED, OPEN_TRACKING_KEY } from '../lib/analytics';

/* Open Analytics tracker tag (getopen.so). React hoists an async <script src>
   into <head>, and the tracker patches the history API itself — App Router
   navigations count as pageviews with no extra wiring.

   Only a real Production deploy reports live data. Previews and local builds
   send in test mode instead, which the dashboard never bills or charts, so
   branch traffic can be verified without polluting the numbers. VERCEL_ENV is
   read at build time and is server-only, which is why it stays in this file
   rather than in lib/analytics.ts. */

const testMode =
  process.env.NEXT_PUBLIC_OPEN_TEST_MODE === 'true' ||
  process.env.VERCEL_ENV !== 'production';

export default function OpenAnalytics() {
  if (!OPEN_ENABLED) return null;

  return (
    <script
      async
      src={`${OPEN_COLLECTOR}/oa.js`}
      data-key={OPEN_TRACKING_KEY}
      data-collector={OPEN_COLLECTOR}
      {...(testMode ? { 'data-test-mode': 'true' } : {})}
    />
  );
}
