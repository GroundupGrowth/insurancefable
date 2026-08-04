/* Verifies the legacy promo repair against every real article body.
   Run: npx tsx scripts/test-legacy-offers.ts */

import { repairArticleBody } from '../src/lib/legacyOffers';

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase env vars missing (source .env.local)');

  const rows: { slug: string; body_html: string }[] = [];
  for (let offset = 0; ; offset += 40) {
    const res = await fetch(
      `${url}/rest/v1/posts?select=slug,body_html&order=slug&limit=40&offset=${offset}`,
      { headers: { apikey: key } }
    );
    const batch = await res.json();
    rows.push(...batch);
    if (batch.length < 40) break;
  }

  const countTag = (html: string, needle: string) =>
    html.split(needle).length - 1;

  let repaired = 0;
  let cardsAdded = 0;
  const problems: string[] = [];

  for (const row of rows) {
    const before = row.body_html ?? '';
    if (!before.trim()) continue;
    const after = repairArticleBody(before);

    if (before === after) {
      // Untouched bodies must not have contained anything broken
      if (before.includes('gform_wrapper') || /class="(sbb|ep)-sc"/.test(before)) {
        problems.push(`${row.slug}: had a legacy block but was NOT repaired`);
      }
      continue;
    }
    repaired += 1;
    cardsAdded += countTag(after, 'class="legacy-offer"');

    // 1. every dead form and promo wrapper is gone
    if (after.includes('gform_wrapper')) problems.push(`${row.slug}: dead form survived`);
    if (/class="(sbb|ep)-sc"/.test(after)) problems.push(`${row.slug}: promo wrapper survived`);
    if (after.includes('indicates required fields'))
      problems.push(`${row.slug}: Gravity Forms legend survived`);
    if (after.includes('should be left unchanged'))
      problems.push(`${row.slug}: honeypot text survived`);

    // 2. div tags stay balanced (the split must not orphan a wrapper)
    const divBalance = (html: string) =>
      countTag(html.toLowerCase(), '<div') - countTag(html.toLowerCase(), '</div>');
    if (divBalance(after) !== divBalance(before)) {
      problems.push(
        `${row.slug}: div balance changed ${divBalance(before)} -> ${divBalance(after)}`
      );
    }

    // 3. the article's own prose is untouched (only the promo should vanish)
    const proseOf = (html: string) =>
      html
        .replace(/<div class="(sbb|ep)-sc">[\s\S]*/g, '') // ignore from first promo on
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 400);
    if (proseOf(before) !== proseOf(after)) {
      problems.push(`${row.slug}: article prose changed before the promo`);
    }

    // 4. replacement links somewhere real
    for (const href of after.matchAll(/class="legacy-offer" href="([^"]+)"/g)) {
      if (!href[1].startsWith('/')) problems.push(`${row.slug}: bad offer href ${href[1]}`);
    }
  }

  console.log(
    `\n${rows.length} posts | repaired: ${repaired} | offer cards inserted: ${cardsAdded} | problems: ${problems.length}\n`
  );
  problems.slice(0, 30).forEach((problem) => console.log(' -', problem));
  if (problems.length === 0) console.log('All clear.');
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  }
);
