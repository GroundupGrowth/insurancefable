/* Post date formatting.

   The WordPress site this content came from runs on US Pacific time, and
   WordPress displays `post_date` (site-local) — not `post_date_gmt`. Our
   Payload import stored the GMT column, which is the correct instant but a
   different calendar day for anything published after ~16:00 Pacific.

   Formatting those timestamps in the build server's timezone (UTC on Vercel)
   therefore renders 11 of the 181 posts one day LATER than the live site
   (verified: /iul-vs-401k/ shows Feb 23 on live, Feb 24 in UTC).

   So: always format post dates through these helpers, never with a bare
   `new Date(iso).toLocaleDateString(...)`. */

export const SITE_TIMEZONE = 'America/Los_Angeles';

export const formatPostDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: SITE_TIMEZONE,
  });

export const formatPostDateShort = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: SITE_TIMEZONE,
  });

/* Offset of SITE_TIMEZONE from UTC, in minutes, at the given instant
   (handles PST/PDT).

   Rounded, and that rounding is load-bearing: formatToParts only resolves to
   whole seconds, so an instant carrying milliseconds — which every timestamp
   written by /admin/blog does, via new Date().toISOString() — produced a
   fractional offset like -420.0074833. toSiteIso then emitted
   "2026-08-31T17:46:07-07:0.007483333333311748", an invalid ISO 8601 string,
   into dateModified and the visible <time dateTime>. Google discards a date it
   cannot parse, so the posts that had genuinely been updated were the ones
   whose freshness signal was silently void. */
function siteOffsetMinutes(date: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SITE_TIMEZONE,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== 'literal') acc[p.type] = p.value;
      return acc;
    }, {});

  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second),
  );
  return Math.round((asUtc - date.getTime()) / 60000);
}

/* Same instant, expressed with the site's UTC offset (e.g.
   2026-02-24T00:20:44Z -> 2026-02-23T16:20:44-08:00) so structured data
   carries the same calendar day the live site shows. */
export function toSiteIso(iso: string): string {
  const date = new Date(iso);
  const offset = siteOffsetMinutes(date);
  const shifted = new Date(date.getTime() + offset * 60000);
  const sign = offset < 0 ? '-' : '+';
  const abs = Math.abs(offset);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    shifted.toISOString().slice(0, 19) +
    `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
  );
}
