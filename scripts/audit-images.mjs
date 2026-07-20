/* Audit every /wp-content/ asset path referenced by the repo's own source
   against public/ — i.e. exactly what would 404 in production — and flag any
   image still hotlinked from the old WordPress domain.

   Usage: node scripts/audit-images.mjs
   Exits non-zero if anything is missing or hotlinked, so CI can gate on it. */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const OLD_DOMAIN = /https?:\/\/(?:www\.)?insuranceandestates\.com(\/wp-content\/[^"'`)\s]+)/g;
const LOCAL_REF = /['"`](\/wp-content\/[^"'`)\s]+)['"`]/g;

const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next') continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(tsx?|jsx?|css|json)$/.test(entry)) files.push(path);
  }
};
walk('src');

const resolved = new Set();
const missing = new Map();
const hotlinked = new Map();
const add = (map, key, file) => {
  if (!map.has(key)) map.set(key, new Set());
  map.get(key).add(file);
};

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  for (const m of source.matchAll(OLD_DOMAIN)) add(hotlinked, m[1], file);
  for (const m of source.matchAll(LOCAL_REF)) {
    const path = decodeURIComponent(m[1].split('?')[0]);
    if (existsSync('public' + path)) resolved.add(path);
    else add(missing, path, file);
  }
}

console.log(`local /wp-content/ refs that resolve : ${resolved.size}`);
console.log(`local /wp-content/ refs MISSING      : ${missing.size}`);
console.log(`hotlinks to old domain               : ${hotlinked.size}`);

for (const [path, where] of missing)
  console.log(`\nMISSING  ${path}\n    ${[...where].join('\n    ')}`);
for (const [path, where] of hotlinked)
  console.log(`\nHOTLINK  ${path}\n    ${[...where].join('\n    ')}`);

if (missing.size || hotlinked.size) process.exit(1);
