/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  images: {
    domains: ["source.unsplash.com", "picsum.photos"],
  },
};

module.exports = nextConfig;
