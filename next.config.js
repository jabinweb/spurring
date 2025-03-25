/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.worldvectorlogo.com',
      'pytorch.org',
      'upload.wikimedia.org',
      'www.vectorlogo.zone'
    ],
  },
}

module.exports = nextConfig
