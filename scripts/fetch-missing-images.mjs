/* Download any /wp-content/ asset the built site references but doesn't have.

   Blog article bodies are raw WordPress HTML, so they embed images (charts,
   diagrams, screenshots) that the Payload import never localized. Those aren't
   visible to a source scan — they only appear once pages are rendered, which is
   why they went unnoticed. audit-images.mjs finds them; this fetches them.

   Run `npx next build` first, then:
     node scripts/fetch-missing-images.mjs

   Throttled and retrying: the origin 429s under rapid requests. */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'fs';
import { join } from 'path';

const ORIGIN = 'https://www.insuranceandestates.com';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const builtDir = join('.next', 'server', 'app');
if (!existsSync(builtDir)) {
  console.error('no built output — run `npx next build` first');
  process.exit(1);
}

const htmlFiles = [];
(function walk(d) {
  for (const entry of readdirSync(d)) {
    const p = join(d, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (entry.endsWith('.html')) htmlFiles.push(p);
  }
})(builtDir);

const missing = new Set();
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/["'(](\/wp-content\/[^"'()\s\\]+)/g)) {
    const path = decodeURIComponent(m[1].split('?')[0].replace(/&amp;/g, '&'));
    if (!existsSync(join('public', path))) missing.add(path);
  }
}

console.log(`missing assets referenced by built pages: ${missing.size}\n`);

let ok = 0;
const failed = [];
for (const [i, path] of [...missing].entries()) {
  const dest = join('public', path);
  mkdirSync(join(dest, '..'), { recursive: true });

  let done = false;
  for (let attempt = 0; attempt < 4 && !done; attempt++) {
    if (attempt > 0) await sleep(2000 * 2 ** attempt);
    try {
      const res = await fetch(ORIGIN + path, { headers: { 'user-agent': 'Mozilla/5.0' } });
      if (res.status === 429 || res.status >= 500) continue;
      if (!res.ok) {
        failed.push({ path, status: res.status });
        done = true;
        break;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 100) {
        failed.push({ path, status: 'too small' });
        done = true;
        break;
      }
      writeFileSync(dest, buf);
      ok++;
      done = true;
    } catch (err) {
      if (attempt === 3) failed.push({ path, status: String(err) });
    }
  }
  if (!done) failed.push({ path, status: '429 after retries' });

  await sleep(400);
  if ((i + 1) % 25 === 0) console.log(`  ...${i + 1}/${missing.size}`);
}

console.log(`\ndownloaded : ${ok}`);
console.log(`failed     : ${failed.length}`);
for (const f of failed) console.log(`  ${f.status}  ${f.path}`);
