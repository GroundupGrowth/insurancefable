/* Extract the OLD (live WordPress) site's link graph: crawls every URL in the
   live sitemap, takes internal links from <main id="brx-content">, and writes
   src/app/graph-old-website/graph-data.json for the /graph-old-website/ page.
   Throttled to be polite to the live site; takes a few minutes. */
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const LIVE = 'https://www.insuranceandestates.com';
const OUT = path.resolve('src/app/graph-old-website/graph-data.json');
const UA = { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ie-graph-audit' } };

async function fetchText(url, tries = 4) {
  for (let t = 0; t < tries; t++) {
    try {
      const res = await fetch(url, UA);
      if (res.status === 429 || res.status >= 500) { await new Promise(r => setTimeout(r, 4000 * (t + 1))); continue; }
      if (!res.ok) return null;
      return await res.text();
    } catch { await new Promise(r => setTimeout(r, 4000 * (t + 1))); }
  }
  return null;
}

async function sitemapUrls(url) {
  const xml = await fetchText(url);
  const subs = [...xml.matchAll(/<sitemap>[\s\S]*?<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  if (subs.length) {
    const out = [];
    for (const s of subs) out.push(...await sitemapUrls(s));
    return out;
  }
  return [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
}

const norm = (u) => {
  try {
    const p = new URL(u, LIVE);
    if (p.hostname !== 'www.insuranceandestates.com' && p.hostname !== 'insuranceandestates.com') return null;
    let route = p.pathname;
    if (!route.endsWith('/')) route += '/';
    return route;
  } catch { return null; }
};

const postUrls = new Set((await sitemapUrls(`${LIVE}/sitemap-post-type-post.xml`)).map(norm));
const allUrls = [...new Set((await sitemapUrls(`${LIVE}/sitemap.xml`)).map(norm))].filter(Boolean);
console.log('live sitemap URLs:', allUrls.length);

const PILLARS = new Set(['/life-insurance/', '/long-term-care-insurance/', '/annuities/', '/infinite-banking-strategy/',
  '/term-life-introduction/', '/whole-life-introduction/', '/iul-introduction/', '/variable-life-introduction/']);
const typeOf = (route) => route === '/' ? 'home' : PILLARS.has(route) ? 'pillar' : postUrls.has(route) ? 'article' : 'page';

const idx = new Map(allUrls.map((r, i) => [r, i]));
const nodes = allUrls.map(r => ({ id: r, t: r, k: typeOf(r), in: 0 }));
const links = [];
const seen = new Set();
const cleanTitle = (t) => (t ?? '').replace(/&amp;/g, '&').replace(/&#8211;/g, '–').replace(/&#8217;/g, '’').replace(/&#039;|&#8216;/g, "'")
  .replace(/\s*[–|-]\s*I&E \| Whole Life.*$/, '').trim();

let done = 0;
async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const item = items[i++]; await fn(item); }
  }));
}

await pool(allUrls, 4, async (route) => {
  const html = await fetchText(LIVE + route);
  done++;
  if (done % 25 === 0) console.log(done, '/', allUrls.length);
  if (!html) { console.log('FAILED:', route); return; }
  const $ = cheerio.load(html);
  const title = cleanTitle($('title').text());
  const i = idx.get(route);
  if (title) nodes[i].t = title;
  $('main a[href]').each((_, a) => {
    const target = norm($(a).attr('href')?.split('#')[0].split('?')[0] ?? '');
    if (!target || target === route || !idx.has(target)) return;
    const key = i + '>' + idx.get(target);
    if (seen.has(key)) return;
    seen.add(key);
    links.push([i, idx.get(target)]);
    nodes[idx.get(target)].in++;
  });
  await new Promise(r => setTimeout(r, 300));
});

console.log('nodes:', nodes.length, '· links:', links.length);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ nodes, links }));
console.log('wrote', OUT);
