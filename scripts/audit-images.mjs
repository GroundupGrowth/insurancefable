/* Image audit.

   Two passes, because each catches what the other cannot:

   1. SOURCE pass — scans src/ for hotlinks to the old WordPress domain. The new
      site must not depend on the client's old server for any asset.

   2. BUILT pass — scans the prerendered HTML in .next/server/app for every
      /wp-content/ URL actually emitted, and checks it exists under public/.
      This is the pass that matters: source-only scanning cannot resolve
      template literals like `/wp-content/uploads/${product.icon}`, so a broken
      dynamic path would be invisible. The built HTML has them resolved.

   Run `npx next build` first so the BUILT pass has something to read.

   Usage: node scripts/audit-images.mjs
   Exits non-zero if anything is missing or hotlinked. */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const OLD_DOMAIN = /https?:\/\/(?:www\.)?insuranceandestates\.com(\/wp-content\/[^"'`)\s\\]+)/g;

const collect = (dir, test) => {
  const out = [];
  (function walk(d) {
    if (!existsSync(d)) return;
    for (const entry of readdirSync(d)) {
      if (entry === 'node_modules') continue;
      const path = join(d, entry);
      if (statSync(path).isDirectory()) walk(path);
      else if (test(entry)) out.push(path);
    }
  })(dir);
  return out;
};

const add = (map, key, file) => {
  if (!map.has(key)) map.set(key, new Set());
  map.get(key).add(file);
};

/* ---------- pass 1: hotlinks in source ---------- */
const hotlinked = new Map();
for (const file of collect('src', (f) => /\.(tsx?|jsx?|css|json)$/.test(f))) {
  const source = readFileSync(file, 'utf8');
  for (const m of source.matchAll(OLD_DOMAIN)) add(hotlinked, m[1], file);
}

/* ---------- pass 2: resolved paths in built output ---------- */
const builtDir = join('.next', 'server', 'app');
const builtFiles = collect(builtDir, (f) => f.endsWith('.html'));
const resolved = new Set();
const missing = new Map();

for (const file of builtFiles) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/["'(](\/wp-content\/[^"'()\s\\]+)/g)) {
    const path = decodeURIComponent(m[1].split('?')[0].replace(/&amp;/g, '&'));
    if (existsSync(join('public', path))) resolved.add(path);
    else add(missing, path, relative(builtDir, file));
  }
}

console.log(`built pages scanned  : ${builtFiles.length}`);
console.log(`asset URLs resolved  : ${resolved.size}`);
console.log(`asset URLs MISSING   : ${missing.size}`);
console.log(`hotlinks to old domain: ${hotlinked.size}`);

if (builtFiles.length === 0)
  console.log('\n! no built output found — run `npx next build` for the meaningful pass');

for (const [path, where] of missing)
  console.log(`\nMISSING  ${path}\n    on: ${[...where].slice(0, 6).join(', ')}`);
for (const [path, where] of hotlinked)
  console.log(`\nHOTLINK  ${path}\n    in: ${[...where].join(', ')}`);

if (missing.size || hotlinked.size) process.exit(1);
