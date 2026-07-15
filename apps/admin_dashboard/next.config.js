/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@preparena/shared'],
  images: {
    domains: ['localhost', 'preparena.com'],
  },
};

module.exports = nextConfig;
