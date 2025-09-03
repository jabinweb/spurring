/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'custom.typingmind.com',
      },
      {
        protocol: 'https',
        hostname: 'registry.npmmirror.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
      }
    ]
  },
  // Reduce bundle size by excluding server-only packages from client bundle
  serverExternalPackages: ['bcryptjs', '@prisma/client'],
  // Optimize webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Handle bcryptjs for client-side bundling
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        fs: false,
        net: false,
        tls: false,
        stream: false,
        util: false,
        buffer: false,
        path: false,
        os: false,
      };
      // Exclude server-only packages from client bundle completely
      config.externals = config.externals || [];
      config.externals.push('bcryptjs', '@prisma/client');
    }
    
    return config;
  },
}

module.exports = nextConfig
