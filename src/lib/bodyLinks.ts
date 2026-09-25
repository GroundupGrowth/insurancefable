import legacyRedirects from '../../redirects.legacy.mjs';

/* SEO hygiene for imported article bodies, applied at render time so the
   stored WordPress HTML stays untouched:

   1. Internal links to legacy slugs point straight at their final URL instead
      of bouncing through a 308 (the 2026-09-25 crawl found 206 distinct
      redirecting targets across the bodies). Same map as next.config
      redirects, so the two can never disagree.
   2. A handful of bodies open with their own <h1>; the page template already
      renders the title as the H1, so body H1s become H2s. */

type Redirect = { source: string; destination: string };

const exact = new Map<string, string>();
for (const r of legacyRedirects as Redirect[]) {
  if (!r.source.includes(':')) exact.set(r.source.replace(/\/$/, ''), r.destination);
}

function resolve(path: string): string | null {
  const bare = path.replace(/\/$/, '');
  const hit = exact.get(bare);
  if (hit) return hit;
  if (bare.startsWith('/category/')) return '/blog/';
  return null;
}

const HREF = /href=(["'])(?:https?:\/\/(?:www\.)?insuranceandestates\.com)?(\/[^"'#?]*)([?#][^"']*)?\1/gi;

export function canonicalizeBodyLinks(html: string): string {
  return html.replace(HREF, (whole, quote: string, path: string, suffix = '') => {
    const target = resolve(path);
    return target ? `href=${quote}${target}${suffix}${quote}` : whole;
  });
}

export function demoteBodyH1(html: string): string {
  return html.replace(/<h1(\s|>)/gi, '<h2$1').replace(/<\/h1>/gi, '</h2>');
}
