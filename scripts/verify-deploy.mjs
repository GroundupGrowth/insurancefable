/* Live-vs-deployed functional parity sweep. Run after every deploy:
     node scripts/verify-deploy.mjs
   For every static page route in src/app, fetch both hosts and compare:
   - HTTP status
   - YouTube/Vimeo embed count
   - LeadConnector (GHL calendar/form) iframe count
   Warms the ISR cache on every route as a side effect, so no visitor is
   served a stale prerender (stale-while-revalidate keeps unvisited pages
   stale indefinitely — this bit us on 2026-07-27 with /ibc-modules/).

   Caveat: our GHL embeds render CLIENT-side from Supabase embed_slots, so a
   filled slot still counts 0 here. A "GHL embeds 0/N" flag means: check the
   slot exists AND is filled in Supabase — not necessarily a missing section. */
import { readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const APP = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'app');
const LIVE = 'https://www.insuranceandestates.com';
const NEW = 'https://insurancefable.vercel.app';

// collect routes: any dir under src/app (recursively, 2 levels) containing page.tsx
const SKIP = new Set(['api', 'admin', 'assets', 'graph', 'graph-old-website', '[slug]']);
const routes = [];
function walk(dir, prefix, depth) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || SKIP.has(entry.name) || entry.name.startsWith('_')) continue;
    const p = join(dir, entry.name);
    const route = `${prefix}/${entry.name}`;
    if (entry.name.startsWith('[')) continue; // dynamic
    if (existsSync(join(p, 'page.tsx'))) routes.push(`${route}/`);
    if (depth < 2) walk(p, route, depth + 1);
  }
}
walk(APP, '', 0);
routes.unshift('/');

const count = (html, re) => (html.match(re) ?? []).length;

async function grab(url) {
  try {
    const r = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'Mozilla/5.0 parity-sweep' } });
    const html = r.status === 200 ? await r.text() : '';
    return {
      status: r.status,
      yt: count(html, /youtube\.com\/embed\//g),
      vimeo: count(html, /player\.vimeo\.com\/video\//g),
      ghl: count(html, /(api\.leadconnectorhq\.com|link\.msgsndr\.com|widget\/booking|widget\/form)/g),
    };
  } catch (e) {
    return { status: 'ERR', yt: 0, vimeo: 0, ghl: 0, err: String(e).slice(0, 80) };
  }
}

const results = [];
let done = 0;
// small concurrency pool
const queue = [...routes];
async function worker() {
  while (queue.length) {
    const route = queue.shift();
    const [live, next] = await Promise.all([grab(LIVE + route), grab(NEW + route)]);
    results.push({ route, live, next });
    done++;
    if (done % 25 === 0) console.error(`...${done}/${routes.length}`);
  }
}
await Promise.all(Array.from({ length: 8 }, worker));

results.sort((a, b) => a.route.localeCompare(b.route));
const problems = [];
for (const { route, live, next } of results) {
  const issues = [];
  if (next.status !== 200) issues.push(`NEW status ${next.status}`);
  // live 30x/404 means the page doesn't exist there (new-site-only route) — content diffs meaningless
  if (live.status === 200 && next.status === 200) {
    if (live.yt > next.yt) issues.push(`YouTube ${next.yt}/${live.yt}`);
    if (live.vimeo > next.vimeo) issues.push(`Vimeo ${next.vimeo}/${live.vimeo}`);
    if (live.ghl > 0 && next.ghl === 0) issues.push(`GHL embeds 0/${live.ghl}`);
  }
  if (issues.length) problems.push(`${route}  →  ${issues.join(', ')}`);
}

console.log(`Routes checked: ${results.length}`);
console.log(`Problems: ${problems.length}`);
for (const p of problems) console.log('  ' + p);
writeFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'verify-deploy.results.json'),
  JSON.stringify(results, null, 1),
);
