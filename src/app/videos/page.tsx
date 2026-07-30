import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import YouTubeEmbed from '../../components/YouTubeEmbed';
import VideoFacade from '../../components/VideoFacade';
import { YouTubeLogo, SubscribeButton } from '../../components/YouTubeBrand';
import { getChannelStats, getLatestVideos, YOUTUBE_CHANNEL_URL } from '../../lib/youtube';

/* The video library: an auto-updating "latest uploads" feed from the YouTube
   channel RSS (new posts appear here within ~30 min, no manual step), above
   the curated library carried over from live — all 34 embeds and captions in
   live's order (the last five run without captions on live too). Internal
   caption links are domain-stripped. Noindexed on live (noindex, follow) —
   must stay noindexed. */

export const revalidate = 1800;

export const metadata: Metadata = {
  title: { absolute: 'Videos – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    '4 Ways to Escape Your 401k Without Penalties Why Paid Up Additions is the Key to Your Modern Cash Value Policy Design Why Dave Ramsey is Wrong About Whole Life',
  robots: { index: false, follow: true },
  alternates: { canonical: '/videos/' },
};

/** One caption run — live links some captions to their article page. */
interface CaptionRun {
  text: string;
  href?: string;
}

interface Video {
  id: string;
  caption?: CaptionRun[];
}

/* Order, captions and video ids verbatim from the capture. */
const videos: Video[] = [
  { id: 'prf_IMFH-NU', caption: [{ text: '4 Ways to Escape Your 401k Without Penalties' }] },
  {
    id: 'VAw-8oOMMaM',
    caption: [{ text: 'Why Paid Up Additions is the Key to Your Modern Cash Value Policy Design' }],
  },
  {
    id: 'w9GannOuleg',
    caption: [{ text: 'Why Dave Ramsey is Wrong About Whole Life and Infinite Banking' }],
  },
  {
    id: 'wnrYfRLrgIQ',
    caption: [{ text: 'How to leverage cash value in a mutual whole life insurance policy?' }],
  },
  {
    id: 'y5eanaM9C40',
    caption: [
      { text: 'How we pick our companies for infinite banking and other high cash value life strategies.' },
    ],
  },
  {
    id: 'EAGAq4uKxnU',
    caption: [{ text: 'Why banks are collapsing and an alternative for storing wealth reserves.' }],
  },
  {
    id: 'OZgHoXyQ3mY',
    caption: [{ text: 'Why Dave Ramsey Doesn’t Understand Fixed Index Annuities' }],
  },
  { id: 'NyKRMmZgNUE', caption: [{ text: 'Live Coverage – 2022 Penn Mutual Conference' }] },
  {
    id: 'HEK3JJMN3CQ',
    caption: [{ text: 'What is Infinite Banking? – Short Whiteboard Overview' }],
  },
  { id: 'moKCGy8Wpho', caption: [{ text: 'Welcome to I&E' }] },
  { id: 'VH3R__svaKs', caption: [{ text: 'Choosing a Life Insurance Agent' }] },
  {
    id: '1pdE9khK-NA',
    caption: [
      {
        text: 'Best Whole Life Insurance',
        href: '/top-10-best-dividend-paying-whole-life-insurance-companies/',
      },
    ],
  },
  {
    id: 'RnCGfoAr6YM',
    caption: [{ text: 'Whole Life vs Term Life', href: '/whole-life-vs-term-life/' }],
  },
  {
    id: 'NczWdt1GUxs',
    caption: [{ text: 'Universal Life [IUL vs VUL]', href: '/top-10-pros-cons-variable-universal-life-insurance/' }],
  },
  {
    id: '29MGc59JCpc',
    caption: [
      {
        text: 'Strategic Self Banking, AKA Infinite Banking',
        href: '/pros-and-cons-of-the-infinite-banking-concept/',
      },
    ],
  },
  {
    id: 'd3SaVUh9mm0',
    caption: [
      { text: 'Life Insurance for Young Adults', href: '/top-10-best-life-insurance-companies/' },
    ],
  },
  { id: 'cjoTver6Iuk', caption: [{ text: 'What is an Annuity?', href: '/best-annuity-companies/' }] },
  {
    id: 'drOxf3vT7ko',
    caption: [
      { text: '1035 Exchange for Life Insurance', href: '/1035-exchange/' },
      { text: ' & ' },
      { text: '1035 Exchange for Annuities', href: '/1035-exchange/' },
    ],
  },
  {
    id: '3_CM49DhRBA',
    caption: [{ text: 'Life Insurance and Annuity Review', href: '/best-annuity-companies/' }],
  },
  {
    id: 'mlnKPn8XhBk',
    caption: [
      { text: 'Redefining Cash Value Life Insurance', href: '/cash-value-life-insurance/' },
    ],
  },
  {
    id: 'DuELkzhkUFc',
    caption: [
      {
        text: 'Modified Endowment Contract (MEC)',
        href: '/mec-modified-endowment-contract/',
      },
    ],
  },
  {
    id: 'hscppcU0mR8',
    caption: [
      { text: 'What is Long Term Care Insurance', href: '/long-term-care-insurance/' },
    ],
  },
  {
    id: 'TytuVlbYL18',
    caption: [
      {
        text: 'Strategic Self-Banking with Life Insurance',
        href: '/be-your-own-bank/',
      },
    ],
  },
  {
    id: 'LQpkHaIUZZM',
    caption: [
      {
        text: 'What is Dividend Paying Whole Life Insurance',
        href: '/top-10-best-dividend-paying-whole-life-insurance-companies/',
      },
    ],
  },
  {
    id: 'gvPEoHEEk4Q',
    caption: [
      { text: 'Life Insurance and Estate Planning', href: '/estate-planning-life-insurance-guide/' },
    ],
  },
  {
    id: 'zo21IVFBMg4',
    caption: [{ text: 'Living Trust Benefits', href: '/high-net-worth-estate-planning/' }],
  },
  {
    id: '0byAX6PrVhM',
    caption: [{ text: 'Good Estate Planning', href: '/estate-planning-life-insurance-guide/' }],
  },
  {
    id: 'NWqG1cpqg-w',
    caption: [
      {
        text: 'Business Continuity Succession Planning',
        href: '/business-continuity-and-succession-planning/',
      },
    ],
  },
  {
    id: 'J4X83qg4-Mw',
    caption: [
      { text: 'Wealth Building with Cash Value Life Insurance', href: '/wealth-building-using-life-insurance/' },
    ],
  },
  // Live's final five embeds carry no caption.
  { id: 'bZMfVz6AWGw' },
  { id: 'y8VRQA5D6-E' },
  { id: 'Gj3U0W4qW3s' },
  { id: 'f5mYpy-TJZc' },
  { id: 'orW26Itjer4' },
];

function captionText(video: Video): string {
  return video.caption?.map((run) => run.text).join('') ?? 'YouTube video player';
}

const formatFeedDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Los_Angeles',
  });

export default async function VideosPage() {
  const curatedIds = new Set(videos.map((video) => video.id));
  const [latestAll, stats] = await Promise.all([getLatestVideos(), getChannelStats()]);
  const latest = latestAll.filter((video) => !curatedIds.has(video.id));
  const latestVideos = latest.filter((video) => !video.isShort);
  const latestShorts = latest.filter((video) => video.isShort);

  return (
    <PageShell>
      <PageHero title="Videos" />

      {/* Channel banner: this page is the channel, on the site */}
      <section className="px-6 pb-12">
        <div className="max-w-[88rem] mx-auto bg-white rounded-3xl border border-black/5 px-6 py-6 md:px-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <YouTubeLogo className="w-12 h-auto" />
            <div>
              <p className="text-[#0D1B3D] text-lg font-medium leading-tight">
                InsuranceandEstates.com
              </p>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm transition-colors duration-200"
              >
                @InsuranceandEstates on YouTube
              </a>
              {stats && (
                <p className="text-[#0D1B3D]/60 text-sm mt-0.5">
                  {[
                    stats.subscribers && `${stats.subscribers} subscribers`,
                    stats.videos && `${stats.videos} videos`,
                    stats.views && `${stats.views} views`,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}
            </div>
          </div>
          <SubscribeButton />
        </div>
      </section>

      {/* Latest uploads, straight from the channel RSS feed (auto-updating) */}
      {latestVideos.length > 0 && (
        <section className="px-6 pb-16">
          <div className="max-w-[88rem] mx-auto">
            <h2
              className="text-[#0D1B3D] text-3xl md:text-4xl font-medium mb-8"
              style={{ letterSpacing: '-0.03em' }}
            >
              Latest Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl border border-black/5 p-4 flex flex-col gap-3"
                >
                  <VideoFacade id={video.id} title={video.title} />
                  <div className="px-1 pb-1">
                    <p className="text-[#0D1B3D] text-base font-medium leading-snug">
                      {video.title}
                    </p>
                    <p className="text-[#0D1B3D]/50 text-sm mt-1">
                      {formatFeedDate(video.published)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {latestShorts.length > 0 && (
        <section className="px-6 pb-16">
          <div className="max-w-[88rem] mx-auto">
            <h2
              className="text-[#0D1B3D] text-3xl md:text-4xl font-medium mb-8"
              style={{ letterSpacing: '-0.03em' }}
            >
              Latest Shorts
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {latestShorts.map((short) => (
                <a
                  key={short.id}
                  href={`https://www.youtube.com/shorts/${short.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[9/16] rounded-2xl overflow-hidden bg-[#0D1B3D]"
                >
                  {/* oar2 is YouTube's vertical Shorts thumbnail */}
                  <img
                    src={`https://i.ytimg.com/vi/${short.id}/oar2.jpg`}
                    alt={short.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1B3D]/90 to-transparent p-3 pt-10">
                    <span className="text-white text-xs font-medium leading-snug line-clamp-3">
                      {short.title}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-3xl md:text-4xl font-medium mb-8"
            style={{ letterSpacing: '-0.03em' }}
          >
            Video Library
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl border border-black/5 p-4 flex flex-col gap-4"
              >
                {video.caption && (
                  <h3
                    className="text-[#0D1B3D] text-lg font-medium leading-snug px-1 pt-1"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {video.caption.map((run, index) =>
                      run.href ? (
                        <a
                          key={index}
                          href={run.href}
                          className="hover:text-[#FF6352] transition-colors duration-200"
                        >
                          {run.text}
                        </a>
                      ) : (
                        <span key={index}>{run.text}</span>
                      ),
                    )}
                  </h3>
                )}
                <div className="mt-auto">
                  <YouTubeEmbed id={video.id} title={captionText(video)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
