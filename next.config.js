/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ja', 'zh-CN', 'zh-TW', 'ko', 'es', 'fr', 'de', 'ru', 'ar', 'th', 'vi'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
