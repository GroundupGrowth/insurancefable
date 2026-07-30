/* Latest uploads from the I&E YouTube channel, via YouTube's public RSS feed
   (no API key, no quota). The feed carries the 15 most recent uploads; pages
   consume it with ISR so new videos appear on the site automatically within
   the revalidate window. */

export const YOUTUBE_CHANNEL_ID = 'UCHwHtSUS9RIK0eLU5DVKchA';
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@InsuranceandEstates';
export const YOUTUBE_SUBSCRIBE_URL = `${YOUTUBE_CHANNEL_URL}?sub_confirmation=1`;

export interface ChannelVideo {
  id: string;
  title: string;
  /** ISO date from the feed */
  published: string;
  /** Uploaded as a YouTube Short (vertical) */
  isShort: boolean;
}

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

export interface ChannelStats {
  /** e.g. "6.5K" */
  subscribers: string | null;
  /** e.g. "940" */
  videos: string | null;
  /** e.g. "1.2M" */
  views: string | null;
}

/* "6.52K subscribers" / "6,52k abonnenter" / "1,220,683 views" -> a number.
   Handles K/M suffixes with dot or comma decimals, and plain counts with
   thousands separators (comma, space, or NBSP). */
function parseCount(text: string | undefined): number | null {
  if (!text) return null;
  const m = text.match(/([\d.,\s ]+)([KkMm])?/);
  if (!m) return null;
  const suffix = m[2]?.toUpperCase();
  if (suffix) {
    const n = parseFloat(m[1].replace(/[\s ]/g, '').replace(',', '.'));
    if (!Number.isFinite(n)) return null;
    return Math.round(n * (suffix === 'M' ? 1e6 : 1e3));
  }
  const n = parseInt(m[1].replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : null;
}

function formatCount(n: number | null): string | null {
  if (n === null) return null;
  if (n >= 1e6) return `${(Math.round(n / 1e5) / 10).toString().replace(/\.0$/, '')}M`;
  if (n >= 1e3) return `${(Math.round(n / 100) / 10).toString().replace(/\.0$/, '')}K`;
  return n.toLocaleString('en-US');
}

/* Subscriber/video/view counts from the public channel About page (YouTube's
   Data API needs a key just for this). The numbers sit in the page's initial
   data as plain strings; hl=en + Accept-Language pin the locale so parsing is
   stable. Refreshed every 6h via the fetch cache; any failure returns null
   and callers render without the stats line. */
export async function getChannelStats(): Promise<ChannelStats | null> {
  try {
    const res = await fetch(`${YOUTUBE_CHANNEL_URL}/about?hl=en`, {
      headers: {
        'accept-language': 'en-US,en;q=0.9',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
      },
      next: { revalidate: 21600 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const stats: ChannelStats = {
      subscribers: formatCount(parseCount(html.match(/"subscriberCountText":"([^"]+)"/)?.[1])),
      videos: formatCount(parseCount(html.match(/"videoCountText":"([^"]+)"/)?.[1])),
      views: formatCount(parseCount(html.match(/"viewCountText":"([^"]+)"/)?.[1])),
    };
    return stats.subscribers || stats.videos || stats.views ? stats : null;
  } catch {
    return null;
  }
}

const decodeEntities = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

export async function getLatestVideos(): Promise<ChannelVideo[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 1800 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = xml.split('<entry>').slice(1);
    const videos: ChannelVideo[] = [];
    for (const entry of entries) {
      const id = entry.match(/<yt:videoId>([\w-]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      if (!id || !title || !published) continue;
      videos.push({
        id,
        title: decodeEntities(title.trim()),
        published,
        isShort: entry.includes(`https://www.youtube.com/shorts/${id}`),
      });
    }
    return videos;
  } catch {
    // Feed down -> sections that consume it simply don't render
    return [];
  }
}
