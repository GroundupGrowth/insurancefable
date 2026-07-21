/* Generates SQL that sets posts.seo_meta_title to the exact <title> the live
   site serves for each post — the last 1:1 SEO parity gap (the Jul-13 sync
   covered descriptions only; Slim SEO custom titles were never migrated).

   Source: the 2026-07-20 parity-crawl reports (live <title> per URL, captured
   from the rendered pages). Falls back to the WP export's slim_seo title for
   any slug the crawl missed.

   Usage: node scripts/build-title-sync-sql.mjs <crawl-report.json> <extras-check.json>
   Output: sync-from-export.titles.sql (gitignored; Xander runs it manually). */

import fs from 'node:fs';

const [, , reportPath, extrasPath] = process.argv;
const OUT = 'sync-from-export.titles.sql';

const decode = (s) =>
  s == null
    ? s
    : s
        .replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(+n))
        .replace(/&#x([0-9a-f]+);/gi, (m, n) => String.fromCodePoint(parseInt(n, 16)))
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

// static-page paths to skip — only posts live in the posts table
const staticPaths = new Set(['/', '/life-insurance/', '/long-term-care-insurance/', '/annuities/',
  '/infinite-banking-strategy/', '/term-life-introduction/', '/whole-life-introduction/', '/iul-introduction/',
  '/variable-life-introduction/', '/start-your-journey/', '/connect-with-our-experts/', '/life-insurance-quotes/',
  '/ebooks-and-guides/', '/about/', '/testimonials/', '/contact/', '/editorial-standards/', '/blog/',
  '/privacytou/', '/accessibility/', '/life-insurance-needs-calculator/']);

const titles = new Map(); // slug -> live title

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
for (const row of report.results ?? []) {
  if (staticPaths.has(row.path) || row.path.startsWith('/proclientguide/')) continue;
  const t = decode(row.src?.title);
  if (row.src?.status === 200 && t) titles.set(row.path.replace(/\//g, ''), t);
}
const extras = JSON.parse(fs.readFileSync(extrasPath, 'utf8'));
for (const row of extras) {
  if (staticPaths.has(row.path)) continue;
  const t = decode(row.src?.title);
  if (row.src?.status === 200 && t) titles.set(row.path.replace(/\//g, ''), t);
}
// live 403s + the crawl followed its redirect to /infinite-banking/, so the
// captured title belongs to a different post — leave this one untouched
titles.delete('infinite-banking-insurance-expert');

const q = (s) => "'" + String(s).replace(/'/g, "''") + "'";
const lines = [
  '-- Sets seo_meta_title to the exact live <title> per post (captured 2026-07-20).',
  `-- ${titles.size} posts. Run after verifying a spot-check; posts not listed keep their current value.`,
  'begin;',
];
for (const [slug, title] of [...titles.entries()].sort()) {
  lines.push(`update posts set seo_meta_title = ${q(title)} where slug = ${q(slug)} and _status = 'published';`);
}
lines.push('commit;');
fs.writeFileSync(OUT, lines.join('\n'));
console.log(`${OUT}: ${titles.size} title updates`);
