import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/content';

/* Strategic AI-crawler split: search-visibility crawlers (citation upside)
   allowed; training-only crawlers blocked. Admin and API never crawled. */
export default function robots(): MetadataRoute.Robots {
  const disallowInternal = ['/admin/', '/api/'];
  return {
    rules: [
      // search-visibility AI crawlers — allow for citations
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: disallowInternal },
      { userAgent: 'PerplexityBot', allow: '/', disallow: disallowInternal },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: disallowInternal },
      // training-only crawlers — block
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'Meta-ExternalAgent', disallow: '/' },
      // everyone else (Googlebot, Bingbot, ...)
      { userAgent: '*', allow: '/', disallow: disallowInternal },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
