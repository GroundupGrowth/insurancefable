/* Verifies toSiteIso() emits valid ISO 8601 for every real post timestamp.
   Run: npx tsx scripts/test-site-iso.ts

   Guards the bug fixed 2026-09-21: formatToParts resolves only to whole
   seconds, so an instant carrying milliseconds (every timestamp /admin/blog
   writes) gave a fractional UTC offset and produced
   "2026-08-31T17:46:07-07:0.007483333333311748" in dateModified and in the
   visible <time dateTime>. An unparseable date is a discarded date. */

import { toSiteIso } from '../src/lib/dates';

const ISO_8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;

const cases = [
  '2026-09-01T00:46:07.449+00:00', // admin save, milliseconds, PDT
  '2026-08-10T16:24:11.169+00:00', // admin save, milliseconds
  '2026-04-30T17:10:26+00:00', // WordPress import, whole seconds, PDT
  '2025-02-15T16:41:40+00:00', // whole seconds, PST
  '2026-01-15T03:30:00.001+00:00', // just past midnight UTC, PST
  '2026-03-08T10:00:00.500+00:00', // DST spring-forward day
  '2026-11-01T08:59:59.999+00:00', // DST fall-back day
];

let failed = 0;
for (const input of cases) {
  const out = toSiteIso(input);
  const shapeOk = ISO_8601.test(out);
  // Must also still be the same instant it started as
  const sameInstant = new Date(out).getTime() === Math.floor(new Date(input).getTime() / 1000) * 1000;
  if (!shapeOk || !sameInstant) {
    failed++;
    console.log(`FAIL ${input}\n  -> ${out}${shapeOk ? '' : '  (not ISO 8601)'}${sameInstant ? '' : '  (instant drifted)'}`);
  } else {
    console.log(`ok   ${input} -> ${out}`);
  }
}

if (failed) {
  console.log(`\n${failed} of ${cases.length} failed.`);
  process.exit(1);
}
console.log(`\nAll ${cases.length} timestamps produce valid ISO 8601.`);
