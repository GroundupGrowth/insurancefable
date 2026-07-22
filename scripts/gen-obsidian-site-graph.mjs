/* Generate an Obsidian "site graph" (run after `next build`; needs the crawl
   report JSON path as argv[2] or regenerates page list from .next): one note per indexable page, wikilinks =
   the page's real internal links (from <main> in the built HTML, so shared
   nav/footer links don't turn the graph into a hairball). */
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const APP = 'C:/dev/insurancefable/.next/server/app';
const OUT = 'C:/Users/info/OneDrive/Desktop/Xander OS/Xander OS/10 Projects/Insurance Fable/Site Graph';
const report = JSON.parse(fs.readFileSync(
  'C:/Users/info/AppData/Local/Temp/claude/C--dev-insurancefable/f29f07c6-59d0-46fd-8d3b-59dc14aa4fa5/scratchpad/crawl-report.json', 'utf8'));

// Supabase post slugs for classification
const env = Object.fromEntries(fs.readFileSync('C:/dev/insurancefable/.env.local', 'utf8')
  .split('\n').filter(l => l.includes('=')).map(l => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]));
const H = { headers: { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY, authorization: 'Bearer ' + env.NEXT_PUBLIC_SUPABASE_ANON_KEY } };
const posts = await (await fetch(env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/posts?select=slug&_status=eq.published&limit=300', H)).json();
const postSlugs = new Set(posts.map(p => p.slug));

const indexable = report.pages.filter(p => p.status === 200 && !(p.robots ?? '').includes('noindex'));
const routeSet = new Set(indexable.map(p => p.route));

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

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const counts = {};
let edges = 0;
for (const page of indexable) {
  const file = page.route === '/' ? 'index.html' : page.route.replace(/^\/|\/$/g, '') + '.html';
  const html = fs.readFileSync(path.join(APP, file.replaceAll('/', path.sep)), 'utf8');
  const $ = cheerio.load(html);
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
console.log('notes:', indexable.length, '· edges:', edges, '· by type:', JSON.stringify(counts));
