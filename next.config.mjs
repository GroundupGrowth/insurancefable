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
};

export default nextConfig;
