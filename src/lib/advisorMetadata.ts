import type { Metadata } from 'next';
import { getAdvisor } from './content';

/* One SERP-title pattern for every advisor page — "Name, Specialty" — built
   from the live advisor record so admin edits propagate. Replaces the
   hand-written per-page titles, which had drifted ("Jason K", a stale
   "Founder & CEO", bare "Pro Client Guide" with no specialty). */
export async function advisorMetadata(slug: string, description?: string): Promise<Metadata> {
  const profile = await getAdvisor(slug);
  return {
    /* `absolute` skips the 48-char site template — with it the profile
       titles ran to ~115 chars and Google truncated the specialty away. */
    title: { absolute: `${profile.name}, ${profile.subtitle ?? profile.role} | Insurance & Estates` },
    description: description ?? profile.intro,
    alternates: { canonical: `/proclientguide/${slug}/` },
  };
}
