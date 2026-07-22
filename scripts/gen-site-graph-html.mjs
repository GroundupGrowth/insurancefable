/* Build a self-contained interactive site-graph HTML (force-directed canvas,
   no external dependencies) from the built site. Nodes = indexable pages,
   edges = real internal links from each page's <main> content.

   Run `npx next build` first, then `node scripts/gen-site-graph-html.mjs`.
   Output: "Insurance Fable - Site Graph.html" in the Obsidian project folder
   (an .html file never shows up in Obsidian's graph view). */
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const APP = path.resolve('.next/server/app');
const OUT = 'C:/Users/info/OneDrive/Desktop/Xander OS/Xander OS/10 Projects/Insurance Fable/Insurance Fable - Site Graph.html';

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

const DATA = JSON.stringify({ nodes, links });

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Insurance Fable — Site Graph</title>
<style>
  :root { color-scheme: dark; }
  * { margin: 0; box-sizing: border-box; }
  body { background: #0D1B3D; font: 13px/1.4 system-ui, sans-serif; color: #fff; overflow: hidden; }
  canvas { display: block; cursor: grab; }
  canvas.dragging { cursor: grabbing; }
  #hud { position: fixed; top: 16px; left: 16px; background: rgba(13,27,61,.85); backdrop-filter: blur(8px);
         border: 1px solid rgba(255,255,255,.12); border-radius: 14px; padding: 14px 16px; max-width: 300px; }
  #hud h1 { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
  #hud p { color: rgba(255,255,255,.55); font-size: 11.5px; }
  #search { margin-top: 10px; width: 100%; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15);
            border-radius: 8px; padding: 7px 10px; color: #fff; font-size: 12.5px; outline: none; }
  #search:focus { border-color: rgba(255,255,255,.4); }
  #legend { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px 12px; }
  #legend button { display: flex; align-items: center; gap: 5px; background: none; border: 0; color: rgba(255,255,255,.75);
            font-size: 11px; cursor: pointer; padding: 0; }
  #legend button.off { opacity: .3; }
  #legend i { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
  #tip { position: fixed; pointer-events: none; background: #fff; color: #0D1B3D; border-radius: 8px;
         padding: 7px 10px; font-size: 12px; max-width: 320px; display: none; box-shadow: 0 6px 24px rgba(0,0,0,.35); }
  #tip small { color: rgba(13,27,61,.55); display: block; }
  #hint { position: fixed; bottom: 14px; left: 16px; color: rgba(255,255,255,.35); font-size: 11px; }
</style>
</head>
<body>
<canvas id="c"></canvas>
<div id="hud">
  <h1>Insurance Fable — Site Graph</h1>
  <p id="stats"></p>
  <input id="search" type="text" placeholder="Search pages…">
  <div id="legend"></div>
</div>
<div id="tip"></div>
<div id="hint">scroll = zoom · drag background = pan · drag node = move · click node = open page · hover = highlight links</div>
<script>
const DATA = ${DATA};
const COLORS = { home:'#FFD166', pillar:'#C5BDE5', article:'#6FA8DC', wiki:'#67D5B5', advisor:'#F49E71', page:'#9AA5B8' };
const LABELS = { home:'Home', pillar:'Pillars', article:'Articles', wiki:'Wiki', advisor:'Advisors', page:'Pages' };
const N = DATA.nodes, L = DATA.links;
const canvas = document.getElementById('c'), ctx = canvas.getContext('2d');
const tip = document.getElementById('tip');
let W, H, DPR = window.devicePixelRatio || 1;
function resize(){ W = innerWidth; H = innerHeight; canvas.width = W*DPR; canvas.height = H*DPR; canvas.style.width = W+'px'; canvas.style.height = H+'px'; }
resize(); addEventListener('resize', resize);

document.getElementById('stats').textContent = N.length + ' pages · ' + L.length + ' internal links';

// init positions: rings by type so clusters settle fast
const golden = Math.PI * (3 - Math.sqrt(5));
N.forEach((n, i) => {
  const r = 60 + Math.sqrt(i) * 26;
  n.x = Math.cos(i * golden) * r; n.y = Math.sin(i * golden) * r;
  n.vx = 0; n.vy = 0;
  n.r = 3.5 + Math.min(14, Math.sqrt(n.in) * 1.9);
});
const adj = N.map(() => []);
L.forEach(([s, t]) => { adj[s].push(t); adj[t].push(s); });

// camera
let cam = { x: 0, y: 0, z: Math.min(W, H) / 1400 };
const toScreen = (x, y) => [ (x - cam.x) * cam.z + W/2, (y - cam.y) * cam.z + H/2 ];
const toWorld = (px, py) => [ (px - W/2) / cam.z + cam.x, (py - H/2) / cam.z + cam.y ];

// simulation (Barnes-Hut-free: simple grid repulsion is fine at n=269)
let alpha = 1;
const hidden = new Set();
function tick() {
  if (alpha < 0.005) return;
  alpha *= 0.995;
  // repulsion
  for (let i = 0; i < N.length; i++) {
    const a = N[i];
    for (let j = i + 1; j < N.length; j++) {
      const b = N[j];
      let dx = a.x - b.x, dy = a.y - b.y;
      let d2 = dx*dx + dy*dy || 1;
      if (d2 > 250000) continue;
      const f = 900 / d2 * alpha;
      dx *= f; dy *= f;
      a.vx += dx; a.vy += dy; b.vx -= dx; b.vy -= dy;
    }
  }
  // springs
  for (const [s, t] of L) {
    const a = N[s], b = N[t];
    const dx = b.x - a.x, dy = b.y - a.y;
    const d = Math.sqrt(dx*dx + dy*dy) || 1;
    const f = (d - 70) * 0.01 * alpha;
    const fx = dx / d * f, fy = dy / d * f;
    a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
  }
  // centering + integrate
  for (const n of N) {
    n.vx -= n.x * 0.0006 * alpha; n.vy -= n.y * 0.0006 * alpha;
    if (n !== dragNode) { n.x += n.vx; n.y += n.vy; }
    n.vx *= 0.85; n.vy *= 0.85;
  }
}

let hover = -1, dragNode = null, panning = false, lastM = null, query = '';
function draw() {
  tick();
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, W, H);
  const q = query.toLowerCase();
  const focus = hover >= 0 ? new Set([hover, ...adj[hover]]) : null;
  ctx.lineWidth = 0.6;
  for (const [s, t] of L) {
    if (hidden.has(N[s].k) || hidden.has(N[t].k)) continue;
    const inFocus = focus && (s === hover || t === hover);
    if (focus && !inFocus) continue;
    const [x1, y1] = toScreen(N[s].x, N[s].y), [x2, y2] = toScreen(N[t].x, N[t].y);
    ctx.strokeStyle = inFocus ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.07)';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  }
  for (let i = 0; i < N.length; i++) {
    const n = N[i];
    if (hidden.has(n.k)) continue;
    const [x, y] = toScreen(n.x, n.y);
    if (x < -40 || y < -40 || x > W+40 || y > H+40) continue;
    const match = q && (n.t.toLowerCase().includes(q) || n.id.includes(q));
    const dim = (focus && !focus.has(i)) || (q && !match);
    ctx.globalAlpha = dim ? 0.12 : 1;
    ctx.fillStyle = COLORS[n.k];
    ctx.beginPath(); ctx.arc(x, y, n.r * Math.max(cam.z, .5), 0, 7); ctx.fill();
    if (match || i === hover || (cam.z > 1.1 && n.in > 6 && !dim)) {
      ctx.fillStyle = 'rgba(255,255,255,.85)';
      ctx.font = (i === hover ? '600 ' : '') + '11px system-ui';
      ctx.fillText(n.t.length > 42 ? n.t.slice(0, 40) + '…' : n.t, x + n.r + 5, y + 3);
    }
    ctx.globalAlpha = 1;
  }
  requestAnimationFrame(draw);
}

function nodeAt(px, py) {
  const [wx, wy] = toWorld(px, py);
  for (let i = N.length - 1; i >= 0; i--) {
    const n = N[i];
    if (hidden.has(n.k)) continue;
    const dx = wx - n.x, dy = wy - n.y, r = (n.r + 3) / Math.min(cam.z, 1) ;
    if (dx*dx + dy*dy < r*r) return i;
  }
  return -1;
}

canvas.addEventListener('mousemove', (e) => {
  if (dragNode) {
    const [wx, wy] = toWorld(e.clientX, e.clientY);
    dragNode.x = wx; dragNode.y = wy; alpha = Math.max(alpha, 0.1);
  } else if (panning && lastM) {
    cam.x -= (e.clientX - lastM[0]) / cam.z; cam.y -= (e.clientY - lastM[1]) / cam.z;
  } else {
    hover = nodeAt(e.clientX, e.clientY);
    if (hover >= 0) {
      const n = N[hover];
      tip.style.display = 'block';
      tip.style.left = Math.min(e.clientX + 14, W - 330) + 'px';
      tip.style.top = (e.clientY + 14) + 'px';
      tip.innerHTML = '<b>' + n.t + '</b><small>' + n.id + ' · ' + LABELS[n.k] + ' · ' + n.in + ' incoming links</small>';
    } else tip.style.display = 'none';
  }
  lastM = [e.clientX, e.clientY];
});
canvas.addEventListener('mousedown', (e) => {
  const i = nodeAt(e.clientX, e.clientY);
  if (i >= 0) { dragNode = N[i]; dragNode.moved = false; }
  else panning = true;
  canvas.classList.add('dragging');
});
addEventListener('mouseup', (e) => {
  if (dragNode && !panning) {
    const i = nodeAt(e.clientX, e.clientY);
    if (i >= 0 && N[i] === dragNode && !dragNode.dragged) window.open('https://insurancefable.vercel.app' + N[i].id, '_blank');
  }
  if (dragNode) dragNode.dragged = false;
  dragNode = null; panning = false; canvas.classList.remove('dragging');
});
canvas.addEventListener('mousemove', () => { if (dragNode) dragNode.dragged = true; });
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  const f = e.deltaY < 0 ? 1.12 : 0.89;
  const [wx, wy] = toWorld(e.clientX, e.clientY);
  cam.z *= f;
  const [wx2, wy2] = toWorld(e.clientX, e.clientY);
  cam.x += wx - wx2; cam.y += wy - wy2;
}, { passive: false });

document.getElementById('search').addEventListener('input', (e) => { query = e.target.value.trim(); });

const legend = document.getElementById('legend');
for (const k of Object.keys(COLORS)) {
  const b = document.createElement('button');
  b.innerHTML = '<i style="background:' + COLORS[k] + '"></i>' + LABELS[k];
  b.onclick = () => { hidden.has(k) ? hidden.delete(k) : hidden.add(k); b.classList.toggle('off'); };
  legend.appendChild(b);
}
draw();
</script>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log('wrote', OUT, Math.round(html.length / 1024) + 'KB');
