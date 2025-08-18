/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Remove env section since we're using Supabase, not Prisma
}

module.exports = nextConfig
