import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import YouTubeEmbed from '../../components/YouTubeEmbed';

/* 1:1 replica of live /videos/ — the video library. All 34 YouTube embeds and
   their captions/links reproduced in live's order (the last five run without
   captions on live too). Internal caption links are domain-stripped. Noindexed
   on live (noindex, follow) — must stay noindexed. */

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

export default function VideosPage() {
  return (
    <PageShell>
      <PageHero title="Videos" />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl border border-black/5 p-4 flex flex-col gap-4"
              >
                {video.caption && (
                  <h2
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
                  </h2>
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
