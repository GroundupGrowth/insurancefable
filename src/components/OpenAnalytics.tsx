import {
  OPEN_COLLECTOR,
  OPEN_TEST_MODE,
  OPEN_TRACKING_KEY,
} from '../lib/analytics';

/* Open Analytics tracker tag (getopen.so). Renders nothing until
   NEXT_PUBLIC_OPEN_TRACKING_KEY is set, so the site builds and runs without
   an analytics account. React hoists an async <script src> into <head>, and
   the tracker patches the history API itself — App Router navigations count
   as pageviews with no extra wiring. */

export default function OpenAnalytics() {
  if (!OPEN_TRACKING_KEY) return null;

  return (
    <script
      async
      src={`${OPEN_COLLECTOR}/oa.js`}
      data-key={OPEN_TRACKING_KEY}
      data-collector={OPEN_COLLECTOR}
      {...(OPEN_TEST_MODE ? { 'data-test-mode': 'true' } : {})}
    />
  );
}
