import type { MetadataRoute } from 'next';
import { pageDefaults } from '../data/pageContent';
import { SITE_URL } from '../lib/content';
import { getWikiTerms } from '../lib/wiki';
import { getAllPosts } from '../lib/blog';
import { ebookDefaults } from '../data/ebooks';
import { explainers } from '../data/explainers';

/* Canonical, indexable URLs only. Revalidates hourly so articles published
   through /admin/blog appear without a redeploy. */
export const revalidate = 3600;

/* lastmod is only sent where we know it (articles). Static pages used to stamp
   the build time on every request, which tells Google every page changed hourly
   and teaches it to ignore lastmod for the whole sitemap. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const advisorPaths = [
    '/proclientguide/steve/',
    '/proclientguide/barry/',
    '/proclientguide/jasonh/',
    '/proclientguide/jasonk/',
    '/proclientguide/denise/',
    '/proclientguide/tom/',
  ];
  const [wikiTerms, posts] = await Promise.all([getWikiTerms(), getAllPosts()]);
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    ...Object.values(pageDefaults).map((page) => ({
      url: `${SITE_URL}${page.path}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...advisorPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/life-insurance-needs-calculator/`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    { url: `${SITE_URL}/tools/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/generation-wealth/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/media/`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/explainers/`, changeFrequency: 'weekly', priority: 0.7 },
    ...explainers.map((entry) => ({
      url: `${SITE_URL}/explainers/${entry.slug}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...[
      'infinite-banking-calculator',
      'human-life-value-calculator',
      'compound-interest-calculator',
      'sp500-historical-calculator',
      'fire-calculator',
      'savings-goal-calculator',
      'inflation-calculator',
    ].map((slug) => ({
      url: `${SITE_URL}/tools/${slug}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/wiki/`, changeFrequency: 'weekly', priority: 0.7 },
    ...wikiTerms.map((term) => ({
      url: `${SITE_URL}/wiki/${term.slug}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...ebookDefaults
      .filter((book) => !book.noindexLanding)
      .map((book) => ({
        url: `${SITE_URL}${book.landingPath}`,
          changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    { url: `${SITE_URL}/blog/`, changeFrequency: 'weekly', priority: 0.7 },
    ...posts.map((post) => ({
      url: `${SITE_URL}/${post.slug}/`,
      ...(post.modifiedAt || post.publishedAt
        ? { lastModified: new Date((post.modifiedAt || post.publishedAt)!) }
        : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
