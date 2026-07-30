import { SITE_URL } from './content';
import { toSiteIso } from './dates';
import type { BlogPost } from './blog';

/* Structured data derived from the imported article bodies. The old WordPress
   site carried hand-added FAQPage/VideoObject JSON-LD inside the post HTML;
   the Payload import stripped script tags, so only the visible content came
   across (audited 2026-07-30: 118 posts have a visible FAQ section, 48 have
   YouTube embeds, 2 still have inline schema). These helpers regenerate the
   schema from that visible content at render time, so every post gets it
   without touching the bodies. */

const jsonLdString = (value: unknown) =>
  // <-escape so extracted content can never close the <script> tag
  JSON.stringify(value).replace(/</g, '\\u003c');

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />
  );
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '–',
  mdash: '—',
  hellip: '…',
  rsquo: '’',
  lsquo: '‘',
  rdquo: '”',
  ldquo: '“',
};

function htmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m)
    .replace(/\s+/g, ' ')
    .trim();
}

interface FaqPair {
  question: string;
  answer: string;
}

/* Finds the visible FAQ section (an h2-h6 titled "FAQ(s)" / "Frequently
   Asked …"), then reads each deeper heading inside it as a question and the
   content until the next heading as its answer. Posts whose FAQ uses another
   markup shape simply get no FAQ schema — never a wrong one. */
export function extractFaq(bodyHtml: string): FaqPair[] {
  const headings = [...bodyHtml.matchAll(/<h([2-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: htmlToText(m[2]),
    start: m.index,
    end: m.index + m[0].length,
  }));

  const faqIndex = headings.findIndex((h) => /^(faqs?\b|frequently asked)/i.test(h.text));
  if (faqIndex === -1) return [];
  const faqLevel = headings[faqIndex].level;

  const pairs: FaqPair[] = [];
  for (let i = faqIndex + 1; i < headings.length; i++) {
    const h = headings[i];
    if (h.level <= faqLevel) break;
    const next = headings[i + 1];
    const answer = htmlToText(bodyHtml.slice(h.end, next ? next.start : undefined)).slice(0, 1500);
    if (h.text && answer) pairs.push({ question: h.text, answer });
  }
  // A single pair is more likely a mis-parse than a real FAQ
  return pairs.length >= 2 ? pairs : [];
}

export function faqJsonLd(bodyHtml: string): object | null {
  // A couple of posts still carry their original hand-added schema — keep it
  if (/FAQPage/.test(bodyHtml)) return null;
  const pairs = extractFaq(bodyHtml);
  if (pairs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map((pair) => ({
      '@type': 'Question',
      name: pair.question,
      acceptedAnswer: { '@type': 'Answer', text: pair.answer },
    })),
  };
}

/* One VideoObject per embedded YouTube video. Title and thumbnail come from
   YouTube's oEmbed endpoint (cached by Next's fetch cache, so one request per
   video per deploy); a failed lookup falls back to the post's own metadata
   rather than dropping the video. YouTube doesn't expose the upload date
   without an API key, so the post's publish date stands in — same trade-off
   the WordPress SEO plugins make. */
export async function videoJsonLds(post: BlogPost): Promise<object[]> {
  if (/VideoObject/.test(post.bodyHtml)) return [];
  const ids = [
    ...new Set(
      [...post.bodyHtml.matchAll(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/gi)].map(
        (m) => m[1]
      )
    ),
  ];

  return Promise.all(
    ids.map(async (id) => {
      let title: string | null = null;
      let thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      try {
        const res = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(
            `https://www.youtube.com/watch?v=${id}`
          )}&format=json`,
          { cache: 'force-cache' }
        );
        if (res.ok) {
          const data = (await res.json()) as { title?: string; thumbnail_url?: string };
          title = data.title ?? null;
          if (data.thumbnail_url) thumbnail = data.thumbnail_url;
        }
      } catch {
        /* fall back to post metadata */
      }
      return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: title ?? `${post.title} (video)`,
        description: post.metaDescription ?? post.excerpt ?? title ?? post.title,
        thumbnailUrl: thumbnail,
        embedUrl: `https://www.youtube.com/embed/${id}`,
        ...(post.publishedAt ? { uploadDate: toSiteIso(post.publishedAt) } : {}),
      };
    })
  );
}

/* Home → Category → Article, matching the visible "Category:" line above the
   headline. Categories have no standalone pages, so the middle crumb points at
   the /blog/ index section for that category. */
export function breadcrumbJsonLd(post: BlogPost): object {
  const items = [
    { name: 'Home', item: `${SITE_URL}/` },
    ...(post.category
      ? [{ name: post.category.name, item: `${SITE_URL}/blog/#${post.category.slug}` }]
      : [{ name: 'Blog', item: `${SITE_URL}/blog/` }]),
    { name: post.title, item: `${SITE_URL}/${post.slug}/` },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}
