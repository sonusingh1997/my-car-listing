/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // output: 'export',
  assetPrefix: isProd ? '/my-car-listing' : '',
  basePath: isProd ? '/my-car-listing' : '',
};

module.exports = nextConfig;
