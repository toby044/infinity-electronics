// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  runtimeConfig: {
    upstreamApiUrl: 'https://fakestoreapi.com',
  },
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },

  css: ["~/assets/css/main.css"],
  image: {
    domains: ['images.unsplash.com', 'fakestoreapi.com'],
  },

  routeRules: {
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
  },

  modules: [
    "@nuxt/a11y",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/test-utils",
    "nuxt-swiper",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
  ],

  fonts: {
    families: [
      {
        name: "Inter",
        provider: "google",
        weights: [400, 500, 600, 700, 800],
        styles: ["normal"],
        subsets: ["latin"],
      },
    ],
  },
});