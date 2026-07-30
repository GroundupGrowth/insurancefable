import type { MetadataRoute } from 'next';
import { pageDefaults } from '../data/pageContent';
import { SITE_URL } from '../lib/content';
import { getWikiTerms } from '../lib/wiki';
import { getAllPosts } from '../lib/blog';
import { ebookDefaults } from '../data/ebooks';
import { explainers } from '../data/explainers';

/* Canonical, indexable URLs only. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const advisorPaths = [
    '/proclientguide/steve/',
    '/proclientguide/barry/',
    '/proclientguide/jasonh/',
    '/proclientguide/jasonk/',
    '/proclientguide/denise/',
  ];
  const [wikiTerms, posts] = await Promise.all([getWikiTerms(), getAllPosts()]);
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
    {
      url: `${SITE_URL}/life-insurance-needs-calculator/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    { url: `${SITE_URL}/tools/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/explainers/`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    ...explainers.map((entry) => ({
      url: `${SITE_URL}/explainers/${entry.slug}/`,
      lastModified,
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
    ...ebookDefaults
      .filter((book) => !book.noindexLanding)
      .map((book) => ({
        url: `${SITE_URL}${book.landingPath}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    { url: `${SITE_URL}/blog/`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    ...posts.map((post) => ({
      url: `${SITE_URL}/${post.slug}/`,
      lastModified: post.modifiedAt ? new Date(post.modifiedAt) : lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
