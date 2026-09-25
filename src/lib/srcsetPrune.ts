import uploads from '../data/uploads-manifest.json';

/* Imported WordPress <img> tags list resized variants (-300x278, -600x556 …)
   in srcset, but only the files actually referenced as src were migrated. A
   browser that picks a missing variant (retina/wide screens) gets a 403 and
   shows a broken image: 221 such variants across 38 articles on 2026-09-25.
   Drop srcset candidates under /wp-content/uploads/ that we don't have; when
   none or one remains, drop srcset (and sizes) so the plain src is used. */

const have = new Set<string>(uploads as string[]);

function exists(url: string): boolean {
  let path = url;
  try {
    path = decodeURIComponent(new URL(url, 'https://www.insuranceandestates.com').pathname);
  } catch {
    return true;
  }
  if (!path.startsWith('/wp-content/uploads/')) return true; // not ours to judge
  return have.has(path);
}

export function pruneSrcset(html: string): string {
  return html.replace(/<(img|source)\b[^>]*>/gi, (tag) => {
    const m = tag.match(/\ssrcset\s*=\s*(["'])(.*?)\1/i);
    if (!m) return tag;
    const kept = m[2]
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c && exists(c.split(/\s+/)[0]));
    if (kept.length === m[2].split(',').filter((c) => c.trim()).length) return tag;
    if (kept.length > 1 || tag.toLowerCase().startsWith('<source')) {
      return tag.replace(m[0], ` srcset=${m[1]}${kept.join(', ')}${m[1]}`);
    }
    return tag.replace(m[0], '').replace(/\ssizes\s*=\s*(["']).*?\1/i, '');
  });
}
