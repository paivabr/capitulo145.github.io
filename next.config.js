/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'instagram.com', 'cdn.instagram.com', 'scontent.cdninstagram.com'],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY: process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY,
    NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN: process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN,
  },
}

module.exports = nextConfig
