/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Отключаем функции, которые не работают со статическим экспортом
  experimental: {
    // Отключаем App Router features которые не работают со static export
  },
  // Убираем middleware для статического экспорта
  skipTrailingSlashRedirect: true,
  // Директория для статического экспорта
  distDir: '.next',
}

module.exports = nextConfig
