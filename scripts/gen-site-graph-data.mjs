/* Extract the site graph data (nodes = indexable pages, edges = real internal
   links from each page's <main>) into src/app/graph/graph-data.json for the
   /graph/ page. Run `npx next build` first, then this, then rebuild. */
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const APP = path.resolve('.next/server/app');
const OUT = path.resolve('src/app/graph/graph-data.json');

function routes() {
  const list = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name.endsWith('.html')) {
        let rel = path.relative(APP, p).replace(/\\/g, '/').replace(/\.html$/, '');
        if (rel === 'index') rel = '';
        if (rel.startsWith('_') || rel === '404' || rel === '500') continue;
        list.push('/' + (rel ? rel + '/' : ''));
      }
    }
  })(APP);
  return [...new Set(list)];
}

const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8')
  .split('\n').filter(l => l.includes('=')).map(l => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]));
const H = { headers: { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY, authorization: 'Bearer ' + env.NEXT_PUBLIC_SUPABASE_ANON_KEY } };
const posts = await (await fetch(env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/posts?select=slug&_status=eq.published&limit=300', H)).json();
const postSlugs = new Set(posts.map(p => p.slug));

const PILLARS = new Set(['/life-insurance/', '/long-term-care-insurance/', '/annuities/', '/infinite-banking-strategy/',
  '/term-life-introduction/', '/whole-life-introduction/', '/iul-introduction/', '/variable-life-introduction/']);

function typeOf(route) {
  if (route === '/') return 'home';
  if (route.startsWith('/wiki/')) return 'wiki';
  if (route.startsWith('/proclientguide/')) return 'advisor';
  if (PILLARS.has(route)) return 'pillar';
  if (postSlugs.has(route.replaceAll('/', ''))) return 'article';
  return 'page';
}

const cleanTitle = (t) => (t ?? '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/\s*[–|-]\s*I&E \| Whole Life.*$/, '').trim();

const pages = [];
for (const route of routes()) {
  const file = (route === '/' ? 'index' : route.replace(/^\/|\/$/g, '')).replaceAll('/', path.sep) + '.html';
  const html = fs.readFileSync(path.join(APP, file), 'utf8');
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) ?? [])[1] ?? '';
  if (robots.includes('noindex')) continue;
  pages.push({ route, html, title: cleanTitle((html.match(/<title>([^<]*)<\/title>/) ?? [])[1]) || route });
}
const idx = new Map(pages.map((p, i) => [p.route, i]));

const nodes = pages.map(p => ({ id: p.route, t: p.title, k: typeOf(p.route), in: 0 }));
const links = [];
const seen = new Set();
for (const page of pages) {
  const $ = cheerio.load(page.html);
  $('main a[href]').each((_, a) => {
    let href = $(a).attr('href') ?? '';
    if (!href.startsWith('/') || href.startsWith('//')) return;
    href = href.split('#')[0].split('?')[0];
    if (!href) return;
    if (!href.endsWith('/')) href += '/';
    if (href === page.route || !idx.has(href)) return;
    const key = idx.get(page.route) + '>' + idx.get(href);
    if (seen.has(key)) return;
    seen.add(key);
    links.push([idx.get(page.route), idx.get(href)]);
    nodes[idx.get(href)].in++;
  });
}
console.log('nodes:', nodes.length, '· links:', links.length);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ nodes, links }));
console.log('wrote', OUT);
