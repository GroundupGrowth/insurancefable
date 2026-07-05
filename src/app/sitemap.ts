import type { MetadataRoute } from 'next';
import { pageDefaults } from '../data/pageContent';
import { SITE_URL } from '../lib/content';
import { getWikiTerms } from '../lib/wiki';

/* Canonical, indexable URLs only. Blog posts join with the full import. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const advisorPaths = [
    '/proclientguide/steve/',
    '/proclientguide/barry/',
    '/proclientguide/jasonh/',
    '/proclientguide/jasonk/',
    '/proclientguide/denise/',
  ];
  const wikiTerms = await getWikiTerms();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    ...Object.values(pageDefaults).map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...advisorPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/wiki/`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    ...wikiTerms.map((term) => ({
      url: `${SITE_URL}/wiki/${term.slug}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}
