import type { Metadata } from 'next';
import { getAdvisor } from './content';

/* One SERP-title pattern for every advisor page — "Name, Specialty" — built
   from the live advisor record so admin edits propagate. Replaces the
   hand-written per-page titles, which had drifted ("Jason K", a stale
   "Founder & CEO", bare "Pro Client Guide" with no specialty). */
export async function advisorMetadata(slug: string, description?: string): Promise<Metadata> {
  const profile = await getAdvisor(slug);
  return {
    title: `${profile.name}, ${profile.subtitle ?? profile.role}`,
    description: description ?? profile.intro,
    alternates: { canonical: `/proclientguide/${slug}/` },
  };
}
