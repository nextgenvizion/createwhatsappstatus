/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // ✅ Internationalization: Auto-routes like /hindi, /arabic, etc.
  i18n: {
    locales: [
      'en', 'hi', 'ar', 'es', 'fr', 'de', 'pt', 'bn', 'ru', 'ja',
      'ur', 'tr', 'ta', 'te', 'it', 'ko', 'mr', 'gu', 'pa', 'zh',
      'id', 'pl', 'nl', 'vi', 'th'
    ],
    defaultLocale: 'en',
    localeDetection: true,
  },

  // ✅ Images (if needed later)
  images: {
    domains: ['images.unsplash.com', 'cdn.createwhatsappstatus.com'],
    formats: ['image/webp'],
  },

  // ✅ SEO Optimizations (Optional Headers or Rewrites can go here)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },

  // ✅ Experimental if you're using next/font
  experimental: {
    fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }],
  },
}

module.exports = nextConfig
