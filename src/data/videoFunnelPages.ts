/* Webinar / video funnel pages migrated from WordPress — the 16 noindexed
   "Schedule a Conversation with Barry!" pages that share one live template:
   H1 + Vimeo webinar embed + a collapsible "Schedule a Conversation with Barry!"
   panel containing the I&E Meeting Prep Gravity Form (form id 13).

   Source of truth: extraction/site/pages/<slug>.html (live capture) and
   extraction/parsed/<slug>.json. All videos are hosted on VIMEO (not YouTube) —
   every page embeds player.vimeo.com. The Gravity Form itself is not rebuilt;
   the CTA links to Barry Brooksby's GHL booking scheduler instead (external,
   opens in a new tab), matching the booking target used on his advisor profile.

   Copy is reproduced verbatim from the live pages — do not "fix" it without
   checking live. Meta descriptions are the live Slim SEO auto-generated values,
   reproduced byte-for-byte for 1:1 parity (most start with a non-breaking space
   and are truncated mid-word, e.g. "…Your information is kep").

   All pages are noindexed on live and must stay noindexed (see route files).

   Link remaps applied vs. live:
   - insuranceandestates.com/... internal links -> domain-stripped local paths
   - api.leadconnectorhq.com (GHL) links        -> kept absolute, new tab */

export interface FunnelLink {
  text: string;
  href: string;
}

export interface FunnelCta {
  label: string;
  href: string;
}

/** A paragraph is a sequence of plain-text runs and inline links. */
export type FunnelInline = string | FunnelLink;

export interface VideoFunnelPageData {
  /** URL path with trailing slash, exactly as on live. */
  path: string;
  /** Document <title> — used verbatim (absolute, no template suffix). */
  title: string;
  /** Live meta description (Slim SEO auto-generated), verbatim. */
  metaDescription: string;
  /** On-page H1, verbatim from live. */
  heading: string;
  /** Vimeo video id from the live player.vimeo.com embed. */
  vimeoId: string;
  /** Primary CTA (replaces the live Gravity Form spoiler). */
  cta: FunnelCta;
  /** Copy paragraphs rendered after the CTA (verbatim from live), if any. */
  paragraphs?: FunnelInline[][];
}

/* Copy shown inside the live "Schedule a Conversation with Barry!" spoiler,
   identical on all 16 pages — rendered by VideoFunnelPage above the CTA. */
export const MEETING_PREP_HEADING =
  'I&E Meeting Prep – Help Us Get To Know You By Responding To A Few Short Questions.';
export const MEETING_PREP_NOTE =
  'Your information is kept secure and only used for confidential consultative services.';

/* Barry Brooksby's GHL booking scheduler (same target as his advisor profile). */
const BARRY_SCHEDULER =
  'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/barrybrooksby';

const SCHEDULE_CTA: FunnelCta = {
  label: 'Schedule a Conversation with Barry!',
  href: BARRY_SCHEDULER,
};

/* Live Slim SEO descriptions come in two variants: pages whose post content
   starts with an "&nbsp;" line get a leading non-breaking space and truncate at
   "…is kep"; the two without it truncate at "…is kept secure". */
const META_WITH_NBSP =
  '  Schedule a Conversation with Barry! I&E Meeting Prep – Help Us Get To Know You By Responding To A Few Short Questions. Your information is kep';
const META_PLAIN =
  'Schedule a Conversation with Barry! I&E Meeting Prep – Help Us Get To Know You By Responding To A Few Short Questions. Your information is kept secure';

const SUFFIX = ' – I&E | Whole Life & Infinite Banking Strategies';

export const videoFunnelPages: VideoFunnelPageData[] = [
  {
    path: '/boost-real-estate-income-infinite-banking/',
    title: `How to Boost Your Real Estate Income with Infinite Banking${SUFFIX}`,
    metaDescription: META_PLAIN,
    heading: 'How to Boost Your Real Estate Income with Infinite Banking',
    vimeoId: '407295180',
    cta: SCHEDULE_CTA,
    paragraphs: [
      [
        'Building wealth with real estate using the infinite banking concept is a powerful combination that can supercharge your journey towards financial freedom.',
      ],
      [
        'In this webinar, Barry and Steve cover the details of how a properly designed ',
        {
          text: 'dividend paying whole life insurance policy',
          href: '/top-10-best-dividend-paying-whole-life-insurance-companies/',
        },
        ', combined with real estate investing, equals huge returns.',
      ],
      [
        'For more on this subject, please check out our article on ',
        {
          text: 'real estate wealth building using infinite banking',
          href: '/real-estate-wealth-building-strategies-with-infinite-banking/',
        },
        '.',
      ],
    ],
  },
  {
    path: '/debunking-dave-ramsey-claim-infinite-banking-scam/',
    title: `Debunking Dave Ramsey’s Claims that Infinite Banking is a Scam${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'Debunking Dave Ramsey’s Claims that Infinite Banking is a Scam',
    vimeoId: '493930821',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/estate-planning-secret-asset/',
    title: `How to Maximize Your Estate Plan Using the Secret Asset Strategy${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'How to Maximize Your Estate Plan Using the Secret Asset Strategy',
    vimeoId: '418542810',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/infinite-banking-for-wealth-building/',
    title: `Infinite Banking for Wealth Building${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'Infinite Banking for Wealth Building',
    vimeoId: '723026864',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/infinite-banking-properly-structured-policy-with-pua/',
    title: `Infinite Banking: A Properly Structured Policy With PUA${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'Infinite Banking: A Properly Structured Policy With PUA',
    vimeoId: '418246500',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/infinite-banking-video/',
    title: `Infinite Banking${SUFFIX}`,
    metaDescription: META_PLAIN,
    heading: 'Infinite Banking',
    vimeoId: '419023468',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/infinite-banking-vs-stock-market-investments/',
    title: `Infinite Banking vs. Stock Market Investments${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'Infinite Banking vs. Stock Market Investments',
    vimeoId: '478179866',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/insurance-protection-101/',
    title: `Insurance Protection 101${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'Insurance Protection 101',
    vimeoId: '418239421',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/life-insurance-planning-after-the-secure-act/',
    title: `Life Insurance Planning After the SECURE Act${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'Life Insurance Planning After the SECURE Act',
    vimeoId: '434480749',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/life-insurance-planning-case-studies-for-retirement-and-wealth-transfer/',
    title: `Life Insurance Planning Case Studies For Retirement and Wealth Transfer${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'Life Insurance Planning Case Studies For Retirement and Wealth Transfer',
    vimeoId: '434478349',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/modern-infinite-banking-advantages-doctors/',
    title: `Modern Infinite Banking Advantages for Doctors${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'Modern Infinite Banking Advantages for Doctors',
    vimeoId: '538879778',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/top-10-faqs-about-infinite-banking/',
    title: `Top 10 FAQs About Infinite Banking${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'Top 10 FAQs About Infinite Banking',
    vimeoId: '570441125',
    cta: SCHEDULE_CTA,
  },
  {
    // NOTE: same live title/H1 as /top-5-benefits-of-high-cash-value-whole-life-insurance/
    // (the slug's "cash-high-value" transposition is live's, not a typo here) —
    // only the video differs between the two pages.
    path: '/top-5-benefits-of-cash-high-value-whole-life-insurance/',
    title: `Top 5 Benefits of High Cash Value Whole Life Insurance${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'Top 5 Benefits of High Cash Value Whole Life Insurance',
    vimeoId: '658757094',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/top-5-benefits-of-high-cash-value-whole-life-insurance/',
    title: `Top 5 Benefits of High Cash Value Whole Life Insurance${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'Top 5 Benefits of High Cash Value Whole Life Insurance',
    vimeoId: '676363172',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/triple-real-estate-returns/',
    title: `How to Triple Your Real Estate Returns Without Taking More Risks${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'How to Triple Your Real Estate Returns Without Taking More Risks',
    vimeoId: '451226637',
    cta: SCHEDULE_CTA,
  },
  {
    path: '/your-maximum-potential-how-to-hold-on-to-more-money/',
    title: `Your Maximum Potential – How To Hold On To More Money${SUFFIX}`,
    metaDescription: META_WITH_NBSP,
    heading: 'Your Maximum Potential – How To Hold On To More Money',
    vimeoId: '420441884',
    cta: SCHEDULE_CTA,
  },
];

export function getVideoFunnelPage(path: string): VideoFunnelPageData {
  const page = videoFunnelPages.find((candidate) => candidate.path === path);
  if (!page) throw new Error(`Unknown video funnel page: ${path}`);
  return page;
}
