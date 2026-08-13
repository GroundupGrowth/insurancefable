# Analytics — Open (getopen.so)

The site uses [Open Analytics](https://getopen.so/) for traffic and lead
reporting. It is cookieless and stores no device identifiers, so it needs no
consent banner — worth keeping in mind before anyone swaps it for something
that does.

## Turning it on

1. Create the site in the Open dashboard and copy the tracking key from
   **Settings → Installation**.
2. In Vercel → Settings → Environment Variables, set
   `NEXT_PUBLIC_OPEN_TRACKING_KEY` to that key for Production.
3. Redeploy. Visits show up in the realtime dashboard within seconds.

For local work, copy the key into `.env.local`. Leaving it blank is the normal
state: `<OpenAnalytics />` renders nothing without a key, and every
`trackEvent` / `trackConversion` call becomes a no-op, so dev traffic never
reaches the collector.

Two optional vars are documented in `.env.example`:
`NEXT_PUBLIC_OPEN_COLLECTOR` (only needed when self-hosting) and
`NEXT_PUBLIC_OPEN_TEST_MODE`, which is worth setting to `true` on Preview
deploys so branch traffic is recorded but never billed or charted.

## How it is wired

- `src/components/OpenAnalytics.tsx` renders the async tracker tag. React
  hoists it into `<head>`. The tracker patches the history API itself, so
  App Router client-side navigations are counted as pageviews with no extra
  code — there is no route-change effect to maintain.
- `src/lib/analytics.ts` wraps the `oa` global with `trackEvent` and
  `trackConversion`. Both trim properties to Open's limits (32 properties,
  40-char keys, 256-char values) and queue calls made before the async script
  has landed, replaying them for up to ten seconds.
- `src/components/PhoneClickTracker.tsx` records a `phone_click` conversion
  for any `tel:` link, via one delegated listener on `document`.

## Events currently sent

| Event | Fired by | Properties |
| --- | --- | --- |
| `lead_submit` | The four lead forms | `form`: `discovery-call`, `contact`, `guide-request`, `lead-magnet`; plus `guide` on guide requests |
| `phone_click` | Any `tel:` link | `number`, `path` |

Nothing needs declaring in the dashboard first — an event and its properties
appear there the first time they fire.

## Caveat: the GHL embeds

The four forms above are the built-in stubs. Each sits inside an `EmbedSlot`,
so once a GoHighLevel form is saved for that slot at `/admin`, the stub is
replaced by a third-party iframe and `lead_submit` stops firing for it — the
parent page cannot see a submit inside a cross-origin frame. When those
embeds go live, track the conversion on the thank-you redirect instead: point
the GHL form at a confirmation URL on this site and call `trackConversion`
from that page.

## Adding an event

```ts
import { trackEvent, trackConversion } from '../lib/analytics';

trackEvent('guide_opened', { guide: 'Money Secrets of the Wealthy' });
trackConversion('call_booked', { advisor: 'barry' });
```

Use `trackConversion` for outcomes that count as a lead and `trackEvent` for
everything else. Do not pass anything a visitor typed — Open drops keys named
after secrets and redacts values that look like them, and the point of running
a cookieless tracker is undermined by shipping PII to it by hand.
