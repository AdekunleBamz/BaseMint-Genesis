/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['basescan.org'],
  },
  // Mark canvas as external for server components (it's a native Node.js module)
  experimental: {
    serverComponentsExternalPackages: ['canvas'],
  },
  webpack: (config, { isServer }) => {
    // Handle canvas module for server-side only
    if (isServer) {
      config.externals.push({
        canvas: 'commonjs canvas',
      })
    }
    return config
  },
}

module.exports = nextConfig
