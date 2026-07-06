/* Blog authors. The Payload import carried no structured author data (the
   authors table is empty and attribution was inconsistent inside post HTML),
   so authorship is resolved per post from the advisor links in the body with
   an admin override — see src/lib/authors.ts. These are the writers; their
   profile pages already live at /proclientguide/<slug>/.

   This module is the static, client-safe half (used by the admin dropdowns);
   the resolved Author (with live name/photo/bio from the advisor record) is
   built server-side in src/lib/authors.ts. */

export interface AuthorMeta {
  /** advisor slug — also the /proclientguide/<slug>/ route */
  slug: string;
  shortName: string;
  /** concise byline subtitle */
  credential: string;
}

export const AUTHOR_META: AuthorMeta[] = [
  { slug: 'steve', shortName: 'Steve Gibbs', credential: 'Estate Planning Attorney · Co-Founder of I&E' },
  { slug: 'jasonk', shortName: 'Jason Kenyon', credential: 'Attorney · CEO & Co-Founder of I&E' },
  { slug: 'barry', shortName: 'Barry Brooksby', credential: 'Authorized Infinite Banking Practitioner' },
  { slug: 'jasonh', shortName: 'Jason Herring', credential: 'Overfunded Life & Retirement Income Specialist' },
  { slug: 'denise', shortName: 'Denise Boisvert', credential: 'IBC, Debt Elimination & College Funding Strategist' },
];

/** Default writer when a post links no specific advisor (the founder). */
export const HOUSE_AUTHOR_SLUG = 'steve';

export const authorMeta = (slug: string): AuthorMeta | undefined =>
  AUTHOR_META.find((author) => author.slug === slug);
