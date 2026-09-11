import legacyRedirects from './redirects.legacy.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // live WordPress URLs all end in a slash; keeping them identical means zero redirects at cutover
  trailingSlash: true,
  // ...zero redirects for CURRENT URLs. Legacy slugs (renamed posts, retired
  // webinar/category paths) still get live's 301 treatment — the imported
  // article bodies link to many of them. See redirects.legacy.mjs.
  async redirects() {
    return legacyRedirects;
  },
  /* Safari and many crawlers request the legacy apple-touch-icon names
     (plain, -precomposed, -120x120…); Next only emits /apple-icon.png. Serve
     that file for all of them instead of 404s. */
  async rewrites() {
    return [{ source: '/:icon(apple-touch-icon.*\\.png)', destination: '/apple-icon.png' }];
  },
};

export default nextConfig;
