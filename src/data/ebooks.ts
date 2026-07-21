/* Default eBook/guide catalog for /ebooks-and-guides/. The Books section in
   /admin stores an edited copy in Supabase (site_ebooks); when any rows exist
   there, they replace this list entirely. Each book's opt-in embed lives in
   embed_slots under `ebook:<slug>`. */

/* 'journey' items are the /start-your-journey/ lead magnets — they get landing
   pages like any book but stay off the /ebooks-and-guides/ catalog (as live). */
export type EbookCategory = 'featured' | 'free-ebook' | 'free-guide' | 'journey';

export interface EbookImage {
  src: string;
  alt: string;
}

export interface Ebook {
  slug: string;
  category: EbookCategory;
  eyebrow: string;
  title: string;
  text?: string;
  /** External landing page (WordPress) used until an embed is pasted; free items anchor to the request form. */
  href: string;
  /** Internal landing-page route for this book (e.g. '/kingdom-money/'). The
      catalog card links here; the landing page shows the book's opt-in form
      (embed_slots `ebook:<slug>`) immediately. Matches the live URL where live
      has one; a clean root slug otherwise. Code-owned like `image` and optional
      for the same reason — it is never part of the site_ebooks round-trip;
      getEbooks() re-attaches it by slug, so catalogs from Supabase still have it. */
  landingPath?: string;
  sort: number;
  /* Cover art, localized under public/wp-content/uploads/. Covers are code-owned
     and deliberately NOT part of the site_ebooks round-trip: the admin editor
     never sends or wipes them, and getEbooks() re-attaches the cover by slug
     after loading Supabase overrides. So no `image` column is needed on
     site_ebooks — see the note in src/lib/content.ts. Most are portrait book
     covers (~2:3); cards must render them with object-contain because one
     (The Intentional Wealth Effect) is a landscape marketing composite. */
  image?: EbookImage;
}

/* Featured books fall back to the on-site request form until their opt-in
   embed is pasted at /admin → Books (then the card opens the embed inline). */
const REQUEST = '/ebooks-and-guides/#request-a-guide';

/** Cover art for a slug, from the code defaults. Used to re-attach covers to
    catalogs loaded from Supabase, which does not store them. */
export function ebookCover(slug: string): EbookImage | undefined {
  return ebookDefaults.find((book) => book.slug === slug)?.image;
}

/** Landing-page route for a slug, from the code defaults. Re-attached to
    catalogs loaded from Supabase (which does not store it), same as covers.
    Falls back to a root-level slug for any book not in the defaults. */
export function ebookLandingPath(slug: string): string {
  return ebookDefaults.find((book) => book.slug === slug)?.landingPath ?? `/${slug}/`;
}

/** The book at a given landing route (or slug). Used by the landing pages and
    their metadata. */
export function ebookByLandingPath(path: string): Ebook | undefined {
  return ebookDefaults.find((book) => book.landingPath === path);
}

export const ebookDefaults: Ebook[] = [
  {
    slug: 'self-banking-blueprint',
    landingPath: '/self-banking-blueprint/',
    category: 'featured',
    eyebrow: 'The Ultimate Free Download',
    title: 'The Self Banking Blueprint',
    text: 'A Modern Approach to the Infinite Banking Concept.',
    href: REQUEST,
    sort: 10,
    image: {
      src: '/wp-content/uploads/icon-THE-SELF-BANKING-BLUEPRINT-Book-Cover-219x300.webp',
      alt: 'The Self Banking Blueprint book cover',
    },
  },
  {
    slug: 'kingdom-money',
    landingPath: '/kingdom-money/',
    category: 'featured',
    eyebrow: 'Featured eBook',
    title: 'Kingdom Money',
    text: 'What wealthy families have quietly done for 100 years, and why your advisor never mentioned it.',
    href: REQUEST,
    sort: 20,
    image: {
      src: '/wp-content/uploads/kingdom-money-217x300.webp',
      alt: 'Kingdom Money book cover',
    },
  },
  {
    slug: 'generational-transfer',
    landingPath: '/generational-transfer/',
    category: 'featured',
    eyebrow: 'Featured eBook',
    title: 'The Generational Transfer',
    text: 'Why Most Family Wealth Disappears and How to Stop It.',
    href: REQUEST,
    sort: 30,
    image: {
      src: '/wp-content/uploads/generational-transfer-cover-146x200.webp',
      alt: 'The Generational Transfer book cover',
    },
  },
  {
    slug: 'the-ultimate-asset',
    landingPath: '/the-ultimate-asset-ebook/',
    category: 'featured',
    eyebrow: 'Volume Based Infinite Banking',
    title: 'The Ultimate Asset®',
    text: 'Nash proved the concept. This is the system that scales it.',
    href: REQUEST,
    sort: 40,
    image: {
      src: '/wp-content/uploads/Ultimate-Asset-Cover-Silver-133x200.webp',
      alt: 'The Ultimate Asset book cover',
    },
  },
  {
    slug: 'intentional-wealth-effect',
    landingPath: '/intentional-wealth-effect/',
    category: 'featured',
    eyebrow: 'Featured eBook',
    title: 'The Intentional Wealth Effect',
    text: "Recapture your earnings and build wealth on purpose — principles inspired by Nelson Nash's Infinite Banking Concept.",
    href: REQUEST,
    sort: 50,
    /* Landscape marketing composite, not a portrait cover — this is the only
       art live uses for this title on /ebooks-and-guides/. */
    image: {
      src: '/wp-content/uploads/The-Intentional-Wealth-Effect-Marketing-Page-Graphic-2-600x362.webp',
      alt: 'The Intentional Wealth Effect, shown in ebook, paperback and audiobook editions',
    },
  },
  {
    slug: 'money-secrets-of-the-wealthy',
    landingPath: '/money-secrets/',
    category: 'free-ebook',
    eyebrow: 'Free eBook',
    title: 'Money Secrets of the Wealthy',
    href: '#request-a-guide',
    sort: 60,
    image: {
      src: '/wp-content/uploads/money-secrets-of-the-wealthy_sm-128x200.jpg',
      alt: 'Money Secrets of the Wealthy book cover',
    },
  },
  {
    slug: 'estate-planners-tactical-guide',
    landingPath: '/estate-planners-tactical-guide/',
    category: 'free-ebook',
    eyebrow: 'Free eBook',
    title: "Estate Planner's Tactical Guide",
    href: '#request-a-guide',
    sort: 70,
    image: {
      src: '/wp-content/uploads/Estate-Planners-Tactical-Guide-Book-Cover-2020-128x200.jpg',
      alt: "Estate Planner's Tactical Guide book cover",
    },
  },
  {
    slug: 'financial-planning-has-failed',
    landingPath: '/financial-planning-has-failed/',
    category: 'free-ebook',
    eyebrow: 'Free eBook',
    title: 'Financial Planning Has Failed',
    href: '#request-a-guide',
    sort: 80,
    image: {
      src: '/wp-content/uploads/financial-planning-has-failed-cover-167x200.jpg',
      alt: 'Financial Planning Has Failed book cover',
    },
  },
  {
    slug: '5-important-estate-planning-steps',
    landingPath: '/5-important-estate-planning-steps/',
    category: 'free-guide',
    eyebrow: 'Free Guide',
    title: '5 Important Estate Planning Steps',
    href: '#request-a-guide',
    sort: 90,
    image: {
      src: '/wp-content/uploads/5ImportantEstatePlanningSteps-167x200.jpg',
      alt: '5 Important Estate Planning Steps guide cover',
    },
  },
  {
    slug: 'estate-planning-tactical-checklist',
    landingPath: '/estate-planning-tactical-checklist/',
    category: 'free-guide',
    eyebrow: 'Free Guide',
    title: 'Estate Planning Tactical Checklist',
    href: '#request-a-guide',
    sort: 100,
    image: {
      src: '/wp-content/uploads/EstatePlanningTacticalChecklist-167x200.jpg',
      alt: 'Estate Planning Tactical Checklist guide cover',
    },
  },
  {
    slug: 'life-insurance-essentials-report',
    landingPath: '/life-insurance-essentials-report/',
    category: 'free-guide',
    eyebrow: 'Free Guide',
    title: 'Life Insurance Essentials Report',
    href: '#request-a-guide',
    sort: 110,
    image: {
      src: '/wp-content/uploads/Life-Insurance-Essentials-Report-small-copy-165x200.jpg',
      alt: 'Life Insurance Essentials Report guide cover',
    },
  },
  {
    slug: 'anti-banking-starter-guide',
    landingPath: '/anti-banking-starter-guide/',
    category: 'journey',
    eyebrow: 'Free Download',
    title: 'The Anti-Banking Starter Guide',
    text: "Stop financing your bank's empire and start building your own.",
    href: REQUEST,
    sort: 100,
    image: {
      src: '/wp-content/uploads/Anti-Banking-Starter-Guide.webp',
      alt: 'Anti Banking Starter Guide cover',
    },
  },
  {
    slug: 'debt-free-plan',
    landingPath: '/debt-free-plan/',
    category: 'journey',
    eyebrow: 'Free Download',
    title: 'The Purpose-Driven Wealth Plan',
    text: "You don't have to wait until the debt is gone to start building wealth.",
    href: REQUEST,
    sort: 101,
    image: {
      src: '/wp-content/uploads/Component-17.webp',
      alt: 'The Purpose-Driven Wealth Plan cover',
    },
  },
  {
    slug: 'iul-retirement',
    landingPath: '/iul-retirement/',
    category: 'journey',
    eyebrow: 'Free Download',
    title: 'Tax-Free Retirement Income Without Limits',
    text: 'The guide to tax free retirement income with IUL.',
    href: REQUEST,
    sort: 102,
    image: {
      src: '/wp-content/uploads/Component-10.webp',
      alt: 'Tax-Free Retirement Income Without Limits cover',
    },
  },
  {
    slug: 'ibc-modules',
    landingPath: '/ibc-modules/',
    category: 'journey',
    eyebrow: 'Free Video Training',
    title: '10 Modules on Infinite Banking',
    text: 'Step-by-step video training to build your financial infrastructure correctly.',
    href: REQUEST,
    sort: 103,
    image: {
      src: '/wp-content/uploads/10-Modules-on-Infinite-Banking-.webp',
      alt: '10 Modules on Infinite Banking cover',
    },
  },
];
