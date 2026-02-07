import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'f4.bcbits.com',
      },
    ],
  },
  turbopack: {
    // Avoid Next.js picking up unrelated lockfiles outside this repo.
    root: __dirname,
  },
};

export default nextConfig;
