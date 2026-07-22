/* Generate an Obsidian "site graph": one note per indexable page, wikilinks =
   the page's real internal links (from <main> in the built HTML, so shared
   nav/footer links don't turn the graph into a hairball).

   Run `npx next build` first, then `node scripts/gen-obsidian-site-graph.mjs`.
   Wipes and rebuilds the vault folder below on every run. */
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const APP = path.resolve('.next/server/app');
const OUT = 'C:/Users/info/OneDrive/Desktop/Xander OS/Xander OS/10 Projects/Insurance Fable/Site Graph';

// Enumerate prerendered routes from the build output
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

// Supabase post slugs, for classifying article pages
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

const slugName = (route) => route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replaceAll('/', ' - ');
const cleanTitle = (t) => (t ?? '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/\s*[–|-]\s*I&E \| Whole Life.*$/, '').trim();

// Indexable = prerendered page without a noindex robots meta
const pages = [];
for (const route of routes()) {
  const file = (route === '/' ? 'index' : route.replace(/^\/|\/$/g, '')).replaceAll('/', path.sep) + '.html';
  const html = fs.readFileSync(path.join(APP, file), 'utf8');
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) ?? [])[1] ?? '';
  if (robots.includes('noindex')) continue;
  pages.push({ route, html, title: (html.match(/<title>([^<]*)<\/title>/) ?? [])[1] ?? '' });
}
const routeSet = new Set(pages.map(p => p.route));

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const counts = {};
let edges = 0;
for (const page of pages) {
  const $ = cheerio.load(page.html);
  const links = new Set();
  $('main a[href]').each((_, a) => {
    let href = $(a).attr('href') ?? '';
    if (!href.startsWith('/') || href.startsWith('//')) return;
    href = href.split('#')[0].split('?')[0];
    if (!href) return;
    if (!href.endsWith('/')) href += '/';
    if (href === page.route || !routeSet.has(href)) return;
    links.add(href);
  });

  const type = typeOf(page.route);
  counts[type] = (counts[type] ?? 0) + 1;
  edges += links.size;
  const title = cleanTitle(page.title) || slugName(page.route);
  const body = [
    '---',
    `url: https://www.insuranceandestates.com${page.route}`,
    `type: ${type}`,
    'tags:',
    '  - sitegraph',
    `  - sg-${type}`,
    '---',
    '',
    `# ${title.replaceAll(':', ' –')}`,
    '',
    `\`${page.route}\` · ${type}`,
    '',
    links.size ? `Links to ${links.size} pages:` : 'No outgoing content links.',
    ...[...links].sort().map(l => `- [[${slugName(l)}]]`),
    '',
  ].join('\n');
  fs.writeFileSync(path.join(OUT, slugName(page.route) + '.md'), body);
}
console.log('notes:', pages.length, '· edges:', edges, '· by type:', JSON.stringify(counts));
console.log('NOTE: this run wiped "_Site Graph README.md" — re-create it in the folder.');
