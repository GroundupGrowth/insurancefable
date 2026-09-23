/* Backlink checker helpers: find every link on a fetched page that points at
   insuranceandestates.com. Used by /api/admin/backlinks/check/. */

const OUR_HOSTS = new Set(['insuranceandestates.com', 'www.insuranceandestates.com']);

export interface FoundLink {
  href: string;
  anchor: string;
  rel: 'dofollow' | 'nofollow' | 'sponsored' | 'ugc';
}

export function isPublicHttpUrl(raw: string): URL | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
  const host = url.hostname.toLowerCase();
  if (
    host === 'localhost' ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    /^(127\.|10\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host) ||
    host.includes(':') // raw IPv6
  ) {
    return null;
  }
  return url;
}

const decode = (text: string) =>
  text
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();

export function findLinks(html: string, base: URL): FoundLink[] {
  const links: FoundLink[] = [];
  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = match[1];
    const href = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const rawHref = href?.[1] ?? href?.[2] ?? href?.[3];
    if (!rawHref) continue;
    let target: URL;
    try {
      target = new URL(decode(rawHref), base);
    } catch {
      continue;
    }
    if (!OUR_HOSTS.has(target.hostname.toLowerCase())) continue;
    const relAttr = (attrs.match(/\brel\s*=\s*["']?([^"'>]*)/i)?.[1] ?? '').toLowerCase();
    const rel = relAttr.includes('sponsored')
      ? 'sponsored'
      : relAttr.includes('ugc')
        ? 'ugc'
        : relAttr.includes('nofollow')
          ? 'nofollow'
          : 'dofollow';
    const imgAlt = match[2].match(/<img[^>]*\balt\s*=\s*["']([^"']*)/i)?.[1];
    links.push({
      href: target.toString(),
      anchor: decode(match[2]) || (imgAlt ? `[image] ${imgAlt}` : '[image]'),
      rel,
    });
  }
  return links;
}

/* Fallback for pages that build their links with JavaScript (YouTube, many
   profile platforms): no <a href> in the HTML, but our URL sits in the page
   data, often percent-encoded inside a redirect link. Counts as present, with
   follow/nofollow unknown. */
export function findMention(html: string): string | null {
  const match = html.match(
    /https?(?::|%3A)(?:\/\/|%2F%2F|\\\/\\\/)(?:www\.)?insuranceandestates\.com(?:[^"'\s<>\\&%]|%2F|\\\/)*/i
  );
  if (!match) return null;
  const decoded = match[0].replace(/\\\//g, '/').replace(/%3A/gi, ':').replace(/%2F/gi, '/');
  try {
    return new URL(decoded).toString();
  } catch {
    return null;
  }
}
