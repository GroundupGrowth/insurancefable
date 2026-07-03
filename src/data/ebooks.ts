/* Default eBook/guide catalog for /ebooks-and-guides/. The Books section in
   /admin stores an edited copy in Supabase (site_ebooks); when any rows exist
   there, they replace this list entirely. Each book's opt-in embed lives in
   embed_slots under `ebook:<slug>`. */

export type EbookCategory = 'featured' | 'free-ebook' | 'free-guide';

export interface Ebook {
  slug: string;
  category: EbookCategory;
  eyebrow: string;
  title: string;
  text?: string;
  /** External landing page (WordPress) used until an embed is pasted; free items anchor to the request form. */
  href: string;
  sort: number;
}

const BASE = 'https://www.insuranceandestates.com';

export const ebookDefaults: Ebook[] = [
  {
    slug: 'self-banking-blueprint',
    category: 'featured',
    eyebrow: 'The Ultimate Free Download',
    title: 'The Self Banking Blueprint',
    text: 'A Modern Approach to the Infinite Banking Concept.',
    href: `${BASE}/self-banking-blueprint/`,
    sort: 10,
  },
  {
    slug: 'kingdom-money',
    category: 'featured',
    eyebrow: 'Featured eBook',
    title: 'Kingdom Money',
    text: 'What wealthy families have quietly done for 100 years, and why your advisor never mentioned it.',
    href: `${BASE}/kingdom-money/`,
    sort: 20,
  },
  {
    slug: 'generational-transfer',
    category: 'featured',
    eyebrow: 'Featured eBook',
    title: 'The Generational Transfer',
    text: 'Why Most Family Wealth Disappears and How to Stop It.',
    href: `${BASE}/generational-transfer/`,
    sort: 30,
  },
  {
    slug: 'the-ultimate-asset',
    category: 'featured',
    eyebrow: 'Volume Based Infinite Banking',
    title: 'The Ultimate Asset®',
    text: 'Nash proved the concept. This is the system that scales it.',
    href: `${BASE}/the-ultimate-asset-ebook/`,
    sort: 40,
  },
  {
    slug: 'intentional-wealth-effect',
    category: 'featured',
    eyebrow: 'Featured eBook',
    title: 'The Intentional Wealth Effect',
    text: "Recapture your earnings and build wealth on purpose — principles inspired by Nelson Nash's Infinite Banking Concept.",
    href: `${BASE}/intentional-wealth-effect/`,
    sort: 50,
  },
  {
    slug: 'money-secrets-of-the-wealthy',
    category: 'free-ebook',
    eyebrow: 'Free eBook',
    title: 'Money Secrets of the Wealthy',
    href: '#request-a-guide',
    sort: 60,
  },
  {
    slug: 'estate-planners-tactical-guide',
    category: 'free-ebook',
    eyebrow: 'Free eBook',
    title: "Estate Planner's Tactical Guide",
    href: '#request-a-guide',
    sort: 70,
  },
  {
    slug: 'financial-planning-has-failed',
    category: 'free-ebook',
    eyebrow: 'Free eBook',
    title: 'Financial Planning Has Failed',
    href: '#request-a-guide',
    sort: 80,
  },
  {
    slug: '5-important-estate-planning-steps',
    category: 'free-guide',
    eyebrow: 'Free Guide',
    title: '5 Important Estate Planning Steps',
    href: '#request-a-guide',
    sort: 90,
  },
  {
    slug: 'estate-planning-tactical-checklist',
    category: 'free-guide',
    eyebrow: 'Free Guide',
    title: 'Estate Planning Tactical Checklist',
    href: '#request-a-guide',
    sort: 100,
  },
  {
    slug: 'life-insurance-essentials-report',
    category: 'free-guide',
    eyebrow: 'Free Guide',
    title: 'Life Insurance Essentials Report',
    href: '#request-a-guide',
    sort: 110,
  },
];
