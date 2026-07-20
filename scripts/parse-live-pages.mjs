/* Parses the rendered live-site HTML in extraction/site/pages/ into ordered
   block JSONs (extraction/parsed/<page>.json) that the page-clone agents build
   from — verbatim text, media and links, grouped by top-level Bricks section.

   Usage: node scripts/parse-live-pages.mjs */

import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const PAGES = 'extraction/site/pages';
const OUT = 'extraction/parsed';
fs.mkdirSync(OUT, { recursive: true });

const BLOCK = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'blockquote', 'figcaption']);
const SKIP = new Set(['script', 'style', 'noscript', 'template', 'svg']);

const clean = (t) => t.replace(/\s+/g, ' ').trim();

for (const file of fs.readdirSync(PAGES).filter((f) => f.endsWith('.html'))) {
  const $ = cheerio.load(fs.readFileSync(path.join(PAGES, file), 'utf8'));
  const page = {
    file,
    title: clean($('title').first().text()),
    metaDescription: $('meta[name="description"]').attr('content') ?? null,
    sections: [],
  };

  const walk = (el, blocks) => {
    for (const node of $(el).children().toArray()) {
      const tag = node.tagName?.toLowerCase();
      if (!tag || SKIP.has(tag)) continue;
      const $n = $(node);
      const cls = $n.attr('class') ?? '';
      if (tag === 'img') {
        const src = $n.attr('src') ?? $n.attr('data-src') ?? '';
        if (src && !src.startsWith('data:')) blocks.push({ t: 'img', src, alt: $n.attr('alt') ?? '' });
        continue;
      }
      if (tag === 'iframe') {
        const src = $n.attr('src') ?? '';
        if (src && !/googletagmanager|about:blank/.test(src)) blocks.push({ t: 'iframe', src });
        continue;
      }
      if (tag === 'a') {
        const href = $n.attr('href') ?? '';
        const text = clean($n.text());
        const isButton = /brxe-button|\bbutton\b|btn/.test(cls);
        // links that only wrap block content: recurse instead
        if ($n.find('h1,h2,h3,h4,h5,h6,p,img,div,section').length > 0 && !isButton) {
          blocks.push({ t: 'a-wrap', href });
          walk(node, blocks);
          continue;
        }
        if (text || href) blocks.push({ t: isButton ? 'button' : 'a', href, text, cls: isButton ? cls : undefined });
        continue;
      }
      // Bricks copy blocks are often plain divs (brxe-text-basic / brxe-text):
      // capture their full text as one block and don't recurse further
      if (/\bbrxe-text(-basic)?\b/.test(cls) && !BLOCK.has(tag)) {
        const text = clean($n.text());
        if (text) blocks.push({ t: 'text', text });
        $n.find('a[href]').each((_, a) => {
          const t = clean($(a).text());
          if (t) blocks.push({ t: 'inline-a', href: $(a).attr('href'), text: t });
        });
        continue;
      }
      if (BLOCK.has(tag)) {
        const text = clean($n.text());
        if (text) blocks.push({ t: tag, text });
        // capture inline links inside the block for href fidelity
        $n.find('a[href]').each((_, a) => {
          const t = clean($(a).text());
          if (t) blocks.push({ t: 'inline-a', href: $(a).attr('href'), text: t });
        });
        // still dive into lists nested inside (li handled at their own level)
        if (tag !== 'li') continue;
      }
      walk(node, blocks);
    }
  };

  const $main = $('main#brx-content');
  const topSections = $main.children().toArray();
  for (const sec of topSections) {
    const $s = $(sec);
    const blocks = [];
    walk(sec, blocks);
    if (blocks.length === 0) continue;
    page.sections.push({
      tag: sec.tagName?.toLowerCase(),
      id: $s.attr('id') ?? null,
      cls: ($s.attr('class') ?? '').split(/\s+/).filter((c) => c.startsWith('brxe-') || c.includes('section')).join(' '),
      blocks,
    });
  }

  const out = path.join(OUT, file.replace(/\.html$/, '.json'));
  fs.writeFileSync(out, JSON.stringify(page, null, 2));
  const words = page.sections.flatMap((s) => s.blocks).filter((b) => b.text).map((b) => b.text.split(' ').length).reduce((a, b) => a + b, 0);
  console.log(file.padEnd(38), page.sections.length + ' sections', String(words).padStart(5) + ' words');
}
