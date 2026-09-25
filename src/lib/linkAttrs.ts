/* Undo the Tiptap Link defaults that leaked into saved article HTML.

   Until 2026-09-25 the editor stamped target="_blank" rel="noopener noreferrer
   nofollow" on every link it touched. The WordPress originals had no nofollow on
   any of their 6,882 internal links, so:

   - internal links (root-relative, #anchor, or our own domain) lose `nofollow`,
     so they pass ranking signal again;
   - on links that carried the editor's stamp (nofollow present), internal
     page links also lose target="_blank";
   - #anchor links (tables of contents) never open a new tab.

   External links are left exactly as written. Runs at render (so every page is
   clean now, whatever is stored) and on save in /admin/blog (so stored HTML
   converges). No imports: it ships in the admin client bundle too. */

const INTERNAL = /^(\/|#|https?:\/\/(www\.)?insuranceandestates\.com(\/|$|#|\?))/i;

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return m ? m[2] : null;
}

function drop(tag: string, name: string): string {
  return tag.replace(new RegExp(`\\s${name}\\s*=\\s*(["']).*?\\1`, 'i'), '');
}

export function cleanLinkAttrs(html: string): string {
  return html.replace(/<a\b[^>]*>/gi, (tag) => {
    const href = attr(tag, 'href');
    if (!href || !INTERNAL.test(href)) return tag;
    let out = tag;
    const rel = attr(out, 'rel');
    const stamped = rel !== null && /\bnofollow\b/i.test(rel);
    if (href.startsWith('#') || stamped) out = drop(out, 'target');
    if (stamped) {
      // noopener/noreferrer only matter with target=_blank, which is gone now
      out = drop(out, 'rel');
    }
    return out;
  });
}
