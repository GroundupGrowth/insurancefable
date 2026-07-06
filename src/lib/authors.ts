import { getAdvisor, serverClient } from './content';
import { AUTHOR_META, HOUSE_AUTHOR_SLUG, authorMeta, type AuthorMeta } from '../data/authors';

/* Resolves the author (and reviewer) shown on a blog article. There is no
   author field in the imported data, so the DEFAULT author is detected from
   the advisor links in the post body; an admin row in site_post_authors
   overrides it. Name/photo/bio come from the live advisor record, so editing
   an agent in /admin updates their byline everywhere. */

export interface Author extends AuthorMeta {
  /** display name with credentials, e.g. "Steve Gibbs, JD, AEP®" */
  name: string;
  photo?: string;
  /** one-sentence bio teaser for the bottom author card */
  bio?: string;
  href: string;
}

const ALIAS: Record<string, string> = { 'barry-brooksby': 'barry' };
const KNOWN = new Set(AUTHOR_META.map((author) => author.slug));

/* Most-linked real advisor in the body wins; ties break by AUTHOR_META order.
   The team-hub link (/proclientguide/introduction/) and unknown slugs are
   ignored, so a post that only links the hub falls back to the house author. */
export function detectAuthorSlug(bodyHtml: string): string {
  const counts: Record<string, number> = {};
  const pattern = /\/proclientguide\/([a-z0-9-]+)\//g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(bodyHtml))) {
    const slug = ALIAS[match[1]] ?? match[1];
    if (KNOWN.has(slug)) counts[slug] = (counts[slug] ?? 0) + 1;
  }
  let best = HOUSE_AUTHOR_SLUG;
  let bestCount = 0;
  for (const author of AUTHOR_META) {
    const count = counts[author.slug] ?? 0;
    if (count > bestCount) {
      best = author.slug;
      bestCount = count;
    }
  }
  return best;
}

async function buildAuthor(slug: string): Promise<Author | null> {
  const meta = authorMeta(slug);
  if (!meta) return null;
  const advisor = await getAdvisor(slug);
  const firstSentence = advisor.intro.split(/(?<=[.!?])\s/)[0]?.trim();
  return {
    ...meta,
    name: advisor.name,
    photo: advisor.photo?.src,
    bio: firstSentence || advisor.intro,
    href: `/proclientguide/${slug}/`,
  };
}

/* House pattern: cross-review by the two principals — the founder reviews
   everyone else's articles, and the CEO reviews the founder's. Overridable. */
function defaultReviewerSlug(authorSlug: string): string {
  return authorSlug === 'steve' ? 'jasonk' : 'steve';
}

export interface PostAuthorship {
  author: Author | null;
  reviewer: Author | null;
}

export async function getPostAuthorship(postSlug: string, bodyHtml: string): Promise<PostAuthorship> {
  let authorSlug = detectAuthorSlug(bodyHtml);
  let reviewerSlug: string | null = defaultReviewerSlug(authorSlug);

  const supabase = serverClient();
  if (supabase) {
    try {
      const { data } = await supabase
        .from('site_post_authors')
        .select('author_slug, reviewer_slug')
        .eq('post_slug', postSlug)
        .maybeSingle();
      if (data) {
        // An explicit row is authoritative: reviewer_slug null means "none".
        if (data.author_slug) authorSlug = data.author_slug;
        reviewerSlug = data.reviewer_slug ?? null;
      }
    } catch {
      /* fall back to detected defaults */
    }
  }

  const author = (await buildAuthor(authorSlug)) ?? (await buildAuthor(HOUSE_AUTHOR_SLUG));
  const reviewer =
    reviewerSlug && reviewerSlug !== authorSlug ? await buildAuthor(reviewerSlug) : null;
  return { author, reviewer };
}
