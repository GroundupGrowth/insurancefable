/* Writes src/data/youtube-meta.json: real uploadDate + duration for every
   YouTube video embedded in a published article, for VideoObject schema.
   YouTube doesn't serve these to Vercel's servers, so run this locally after
   publishing an article with a new video, then commit the JSON:
     node --env-file=.env.local scripts/youtube-meta.mjs */
import fs from 'node:fs';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const res = await fetch(`${url}/rest/v1/posts?select=body_html&_status=eq.published`, {
  headers: { apikey: key, authorization: `Bearer ${key}` },
});
const posts = await res.json();
const ids = new Set();
for (const p of posts)
  for (const m of (p.body_html ?? '').matchAll(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/gi)) ids.add(m[1]);

const out = fs.existsSync('src/data/youtube-meta.json')
  ? JSON.parse(fs.readFileSync('src/data/youtube-meta.json', 'utf8'))
  : {};
for (const id of [...ids].sort()) {
  if (out[id]?.uploadDate) continue;
  const html = await (
    await fetch(`https://www.youtube.com/watch?v=${id}`, {
      headers: { 'accept-language': 'en-US,en;q=0.9', cookie: 'SOCS=CAI; CONSENT=YES+1' },
    })
  ).text();
  const pick = (prop) => html.match(new RegExp(`itemprop="${prop}" content="([^"]+)"`))?.[1] ?? null;
  out[id] = { uploadDate: pick('uploadDate') ?? pick('datePublished'), duration: pick('duration') };
  if (!out[id].uploadDate) {
    // private (403) or deleted (404): the embed is dead, emit no VideoObject for it
    const oembed = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}`);
    if (oembed.status === 403 || oembed.status === 404) out[id].unavailable = true;
  }
  console.log(id, out[id].uploadDate ?? 'NOT FOUND', out[id].duration ?? '');
}
fs.writeFileSync('src/data/youtube-meta.json', JSON.stringify(out, null, 1) + '\n');
console.log(`${ids.size} videos, ${Object.values(out).filter((v) => v.uploadDate).length} with dates`);
