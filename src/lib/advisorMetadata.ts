import type { Metadata } from 'next';
import { getAdvisor } from './content';

/* One SERP-title pattern for every advisor page — "Name, Specialty" — built
   from the live advisor record so admin edits propagate. Replaces the
   hand-written per-page titles, which had drifted ("Jason K", a stale
   "Founder & CEO", bare "Pro Client Guide" with no specialty). */
export async function advisorMetadata(slug: string, description?: string): Promise<Metadata> {
  const profile = await getAdvisor(slug);
  const title = `${profile.name}, ${profile.subtitle ?? profile.role} | Insurance & Estates`;
  const desc = description ?? profile.intro;
  const path = `/proclientguide/${slug}/`;
  return {
    /* `absolute` skips the 48-char site template — with it the profile
       titles ran to ~115 chars and Google truncated the specialty away. */
    title: { absolute: title },
    description: desc,
    alternates: { canonical: path },
    // Without this og:url inherits the layout's '/' and shares land on the homepage
    openGraph: {
      title,
      description: desc,
      url: path,
      type: 'profile',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}
