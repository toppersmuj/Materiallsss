/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  async rewrites() {
    if (process.env.NODE_ENV !== 'development') {
      return [];
    }

    return [
      {
        source: '/api/turnstile/verify',
        destination: 'http://localhost:3000/api/turnstile/verify',
      },
    ];
  },


  // Image optimization
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'docs.google.com',
      },
      {
        protocol: 'https',
        hostname: 'www.googleapis.com',
      },
    ],
  },

  // Compression
  compress: true,

  // Production optimizations
  poweredByHeader: false,
  generateEtags: true,

  // Disable dev indicators in production
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
