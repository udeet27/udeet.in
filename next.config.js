/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'pbs.twimg.com' },
        { protocol: 'https', hostname: 'abs.twimg.com' },
        { protocol: 'https', hostname: 'i.scdn.co' },
      ],
    },
    reactStrictMode: false,
    productionBrowserSourceMaps: false,
  }
  
  module.exports = nextConfig