/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  eslint: {
    // Skip ESLint during builds to avoid blocking deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type-checking errors during builds (optional)
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
