/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  images: {
    unoptimized: true, // Disable image optimization (required for static export)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  output: 'export', // Enable static export
  assetPrefix: isProd ? '/my-car-listing/' : '', // Replace with your repo name
};

module.exports = nextConfig;
