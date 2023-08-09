/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["resizer.otstatic.com"],
  },
};

module.exports = nextConfig;
