/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Для Cloudflare Pages
  experimental: {
    // Отключаем App Router features которые не работают со static export
  },
}

module.exports = nextConfig