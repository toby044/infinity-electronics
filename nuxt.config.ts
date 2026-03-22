// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],
  image: {
    domains: ['images.unsplash.com'],
  },

  modules: [
    "@nuxt/a11y",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/test-utils",
    "nuxt-swiper",
    "@unocss/nuxt",
  ],

  fonts: {
    families: [
      {
        name: "Inter",
        provider: "google",
        weights: [400, 500, 600, 700, 800],
        styles: ["normal"],
        // Variable font subset — smaller payload than full Latin
        subsets: ["latin"],
      },
    ],
  },
});
