/* Default eBook/guide catalog for /ebooks-and-guides/. The Books section in
   /admin stores an edited copy in Supabase (site_ebooks); when any rows exist
   there, they replace this list entirely. Each book's opt-in embed lives in
   embed_slots under `ebook:<slug>`. */

export type EbookCategory = 'featured' | 'free-ebook' | 'free-guide';

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

export const ebookDefaults: Ebook[] = [
  {
    slug: 'self-banking-blueprint',
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
];
