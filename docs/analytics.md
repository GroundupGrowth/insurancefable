# Analytics — Open (getopen.so)

The site uses [Open Analytics](https://getopen.so/) for traffic and lead
reporting. It is cookieless and stores no device identifiers, so it needs no
consent banner — worth keeping in mind before anyone swaps it for something
that does.

## Setup

Already done — there is nothing to configure. The site's `oa_pk_` key is
compiled into `src/lib/analytics.ts`. That key is a public, write-only ingest
key that ships in the page source of every site using Open, exactly like a GA
measurement ID, so it is committed rather than left in an env var somebody has
to remember to set. It is not a dashboard credential and grants no read access.

Which environment reports what is decided at build time, so no one has to
remember a flag:

| Where | Behaviour |
| --- | --- |
| `next dev` | Tag never renders, helpers are no-ops. Nothing is sent. |
| Vercel Preview, local `next build` | Sends in **test mode** — recorded, never billed, kept out of every chart. |
| Vercel Production | Reports live. |

The three env vars in `.env.example` are all optional overrides: a different
tracking key, a self-hosted collector, and `NEXT_PUBLIC_OPEN_TEST_MODE=true`
to force a Production deploy into test mode for a pre-launch dry run.

The CLI installer (`npx getopen init`) is deliberately **not** used here. It
auto-detects the framework and injects its own snippet, which would duplicate
the tag this repo already renders. Keep the integration in code.

## How it is wired

- `src/components/OpenAnalytics.tsx` renders the async tracker tag. React
  hoists it into `<head>`. The tracker patches the history API itself, so
  App Router client-side navigations are counted as pageviews with no extra
  code — there is no route-change effect to maintain.
- `src/lib/analytics.ts` wraps the `oa` global with `trackEvent` and
  `trackConversion`. Both trim properties to Open's limits (32 properties,
  40-char keys, 256-char values) and queue calls made before the async script
  has landed, replaying them for up to ten seconds. They read
  `window.openanalytics` as well as `window.oa`, because oa.js renames itself
  to the former if another script already owns `window.oa` — a live risk here
  given the third-party embeds.
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
