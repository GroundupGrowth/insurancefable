import { getAllPosts } from '../../lib/blog';
import { SITE_URL } from '../../lib/content';

/* RSS 2.0 feed at /feed/ — WordPress served one at this path and feed
   readers / aggregators still poll it (404s in the 2026-09-11 log). Newest
   50 published posts, hourly ISR. Advertised via the layout's
   alternates.types link. */

export const revalidate = 3600;

const escape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function GET() {
  const posts = (await getAllPosts()).slice(0, 50);
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/${post.slug}/`;
      const date = post.publishedAt ? new Date(post.publishedAt).toUTCString() : '';
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>${date ? `\n      <pubDate>${date}</pubDate>` : ''}${
        post.category ? `\n      <category>${escape(post.category.name)}</category>` : ''
      }${post.excerpt ? `\n      <description>${escape(post.excerpt)}</description>` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Insurance &amp; Estates</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/feed/" rel="self" type="application/rss+xml" />
    <description>Whole life, infinite banking, and estate planning strategies from Insurance &amp; Estates.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
