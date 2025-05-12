/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'cdn.worldvectorlogo.com',
      'pytorch.org',
      'upload.wikimedia.org',
      'www.vectorlogo.zone',
      'www.gstatic.com',
      'seeklogo.com',
      'custom.typingmind.com',
      'registry.npmmirror.com'
    ],
  },
}

module.exports = nextConfig
