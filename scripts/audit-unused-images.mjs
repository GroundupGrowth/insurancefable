/* Inverse of audit-images.mjs.

   audit-images.mjs asks "does every path we reference exist?" — it will happily
   report 0 problems while the site uses none of the imagery we localized.
   This asks the opposite: which localized live assets is the site NOT using?

   Usage: node scripts/audit-unused-images.mjs [--all]
   Without --all, attachment-style size variants (-150x150 etc.) are collapsed
   onto their base name so one unused "photo" is reported once, not six times. */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const showAll = process.argv.includes('--all');

const srcFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next') continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(tsx?|jsx?|css|json|md)$/.test(entry)) srcFiles.push(path);
  }
})('src');

const source = srcFiles.map((f) => readFileSync(f, 'utf8')).join('\n');

const assets = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(webp|jpe?g|png|gif|svg)$/i.test(entry)) assets.push(path);
  }
})(join('public', 'wp-content'));

const base = (name) =>
  name
    .replace(/-\d+x\d+(?=\.[a-z]+$)/i, '')
    .replace(/_t=\d+$/, '')
    .replace(/\.[a-z]+$/i, '');

const used = [];
const unused = [];
for (const path of assets) {
  const webPath = '/' + relative('public', path).split('\\').join('/');
  const filename = webPath.split('/').pop();
  if (source.includes(webPath) || source.includes(filename)) used.push(webPath);
  else unused.push(webPath);
}

const groups = new Map();
for (const path of unused) {
  const key = base(path.split('/').pop());
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(path);
}

console.log(`localized assets      : ${assets.length}`);
console.log(`referenced by the site: ${used.length}`);
console.log(`NEVER referenced      : ${unused.length}  (${groups.size} distinct images)\n`);

const rows = [...groups].sort((a, b) => a[0].localeCompare(b[0]));
for (const [key, paths] of rows) {
  if (showAll) paths.forEach((p) => console.log('  ' + p));
  else console.log(`  ${key}${paths.length > 1 ? `   (${paths.length} size variants)` : ''}`);
}
