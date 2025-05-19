/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // This ensures images are displayed in development
    unoptimized: process.env.NODE_ENV === 'development',
    // Add domains for local development
    domains: ['localhost'],
  },
  // Add compression
  compress: true,
  // Increase performance budget
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
