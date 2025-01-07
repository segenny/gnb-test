/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_OUTPUT_DIR || '.next',
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
  },
};

module.exports = nextConfig; 