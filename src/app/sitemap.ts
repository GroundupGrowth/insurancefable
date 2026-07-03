import type { MetadataRoute } from 'next';
import { pageDefaults } from '../data/pageContent';
import { SITE_URL } from '../lib/content';

/* Canonical, indexable URLs only. Blog posts join at Phase 3. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const advisorPaths = [
    '/proclientguide/steve/',
    '/proclientguide/barry/',
    '/proclientguide/jasonh/',
    '/proclientguide/jasonk/',
    '/proclientguide/denise/',
  ];
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
  ];
}
