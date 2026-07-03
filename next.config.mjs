/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // live WordPress URLs all end in a slash; keeping them identical means zero redirects at cutover
  trailingSlash: true,
};

export default nextConfig;
