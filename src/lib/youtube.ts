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
    // Feed down → sections that consume it simply don't render
    return [];
  }
}
