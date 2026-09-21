/* Audit article freshness signals. Run before reporting a content change done:

     node scripts/audit-post-dates.mjs

   Google chooses which date to show in the SERP snippet and only surfaces the
   modified date when the visible page agrees with the `dateModified` in our
   schema. Two things break that agreement, and both are invisible until you
   look at a SERP months later:

   1. A meta title or description that hardcodes an update month ("Updated
      January 2026") which has drifted from the post's real legacy_modified_at.
      The document then makes two different freshness claims and Google falls
      back to the publish date.
   2. A published post with no legacy_modified_at at all, so the only date
      anywhere on the page is the original publish date.

   legacy_modified_at is the column the whole chain reads (lib/blog.ts ->
   Article schema, sitemap lastmod, visible dateline). Saving a post in
   /admin/blog sets it; a direct SQL content edit will not. Read-only. */

import fs from 'node:fs';

const env = Object.fromEntries(
  fs
    .readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]),
);
const H = {
  headers: {
    apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    authorization: 'Bearer ' + env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

const posts = await (
  await fetch(
    env.NEXT_PUBLIC_SUPABASE_URL +
      '/rest/v1/posts?select=slug,published_at,legacy_modified_at,seo_meta_title,seo_meta_description&_status=eq.published&limit=500',
    H,
  )
).json();

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];
/* "Updated January 2026", "revised in March 2025", "as of Feb 2026" */
const CLAIM =
  /(updated|revised|reviewed|as of)\b[^.]{0,30}?\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+(20\d\d)/gi;

const monthIndex = (word) => MONTHS.findIndex((m) => m.startsWith(word.toLowerCase().slice(0, 3)));

const drifted = [];
const undated = [];

for (const post of posts) {
  if (!post.legacy_modified_at) {
    undated.push(post);
    continue;
  }
  // The modified date as the site renders it (Pacific, matching lib/dates.ts)
  const actual = new Date(post.legacy_modified_at);
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'numeric',
  })
    .formatToParts(actual)
    .reduce((acc, p) => ((acc[p.type] = p.value), acc), {});
  const actualMonth = Number(parts.month) - 1;
  const actualYear = Number(parts.year);

  for (const field of ['seo_meta_title', 'seo_meta_description']) {
    const value = post[field];
    if (!value) continue;
    for (const m of value.matchAll(CLAIM)) {
      const claimedMonth = monthIndex(m[2]);
      const claimedYear = Number(m[3]);
      if (claimedMonth !== actualMonth || claimedYear !== actualYear) {
        drifted.push({
          slug: post.slug,
          field,
          claim: m[0],
          actual: `${MONTHS[actualMonth][0].toUpperCase()}${MONTHS[actualMonth].slice(1)} ${actualYear}`,
        });
      }
    }
  }
}

console.log(`Published posts checked: ${posts.length}`);
console.log(`Meta date claims that contradict legacy_modified_at: ${drifted.length}`);
for (const d of drifted) {
  console.log(`  ${d.slug}\n    ${d.field}: "${d.claim}" but the post was modified ${d.actual}`);
}
console.log(`Published posts with no legacy_modified_at: ${undated.length}`);
for (const p of undated) console.log(`  ${p.slug}`);

if (drifted.length || undated.length) {
  console.log(
    '\nFix by editing the post in /admin/blog (saving sets legacy_modified_at,\n' +
      'the schema, the sitemap lastmod and the visible dateline in one go).',
  );
  process.exit(1);
}
console.log('\nAll article date signals agree.');
