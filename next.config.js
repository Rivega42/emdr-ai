/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Директория для статического экспорта
  distDir: '.next',
  // Для Cloudflare Pages
  experimental: {
    // Отключаем App Router features которые не работают со static export
  },
  // Убеждаемся, что middleware правильно обрабатывается
  skipMiddlewareUrlNormalize: true,
}

module.exports = nextConfig
