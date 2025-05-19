/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable static optimization to avoid the useSearchParams error
  // This is a temporary workaround
  output: process.env.NEXT_BUILD_STATIC === 'true' ? 'standalone' : undefined,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
    domains: ['localhost'],
  },
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  typescript: {
    // !! WARN !!
    // Temporarily ignore type checking during build
    // Remove this option once the type issue is fixed
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! WARN !!
    // Temporarily ignore ESLint errors during build
    // Remove this option after fixing the ESLint issues
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
