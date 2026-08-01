/* Headless round-trip test for the blog publisher's Tiptap schema.
   Run: npx tsx scripts/test-editor-roundtrip.ts
   Loads real legacy post bodies from Supabase, parses them into the editor
   schema, serializes back, and reports what changed. The publisher only ever
   rewrites a body the user actually edited, so this measures the worst case:
   editing a legacy article in Visual mode. */

import { GlobalRegistrator } from '@happy-dom/global-registrator';

GlobalRegistrator.register();

async function main() {
  const { generateJSON, generateHTML } = await import('@tiptap/core');
  const { buildExtensions } = await import('../src/app/admin/blog/edit/extensions');
  const extensions = buildExtensions();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase env vars missing (source .env.local)');

  const res = await fetch(
    `${url}/rest/v1/posts?select=slug,body_html&_status=eq.published&order=slug`,
    { headers: { apikey: key } }
  );
  const rows: { slug: string; body_html: string }[] = await res.json();

  const counts = (html: string) => {
    const tally: Record<string, number> = {};
    for (const match of html.matchAll(/<([a-zA-Z][a-zA-Z0-9-]*)/g)) {
      const tag = match[1].toLowerCase();
      tally[tag] = (tally[tag] ?? 0) + 1;
    }
    return tally;
  };
  // DOM-based extraction so entity encoding differences don't skew the compare
  const text = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return (div.textContent ?? '').replace(/\s+/g, ' ').trim();
  };

  const WATCH = ['table', 'iframe', 'form', 'img', 'div', 'ul', 'ol', 'li', 'a', 'h2', 'h3', 'p', 'span'];
  let clean = 0;
  const problems: string[] = [];
  let textLoss = 0;

  for (const row of rows) {
    const original = row.body_html ?? '';
    if (!original.trim()) continue;
    try {
      const json = generateJSON(original, extensions);
      const out = generateHTML(json, extensions);
      const before = counts(original);
      const after = counts(out);
      const diffs = WATCH.filter((tag) => (before[tag] ?? 0) !== (after[tag] ?? 0)).map(
        (tag) => `${tag}:${before[tag] ?? 0}->${after[tag] ?? 0}`
      );
      const beforeText = text(original);
      const afterText = text(out);
      const lossRatio = beforeText.length ? 1 - afterText.length / beforeText.length : 0;
      if (lossRatio > 0.02) {
        textLoss += 1;
        problems.push(`${row.slug}: TEXT LOSS ${(lossRatio * 100).toFixed(1)}% | ${diffs.join(' ')}`);
      } else if (diffs.length > 0) {
        problems.push(`${row.slug}: ${diffs.join(' ')}`);
      } else {
        clean += 1;
      }
    } catch (error) {
      problems.push(`${row.slug}: THREW ${error instanceof Error ? error.message : error}`);
    }
  }

  console.log(`\n${rows.length} posts | clean round-trip: ${clean} | with structural diffs: ${problems.length} | text loss >2%: ${textLoss}\n`);
  /* p/span count growth is expected (cell/list text wrapped in paragraphs,
     marks splitting spans) and neutralized by CSS — only surface the rest. */
  const interesting = problems.filter(
    (problem) => !/^[^:]+: (p:\d+->\d+ ?)?(span:\d+->\d+ ?)?$/.test(problem)
  );
  console.log(`interesting (non p/span): ${interesting.length}`);
  for (const problem of interesting.slice(0, 40)) console.log(' -', problem);
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  }
);
