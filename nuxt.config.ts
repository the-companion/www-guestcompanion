export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "@nuxtjs/tailwindcss", "nuxt-icon"],

  i18n: {
    defaultLocale: "en",
    langDir: "locales",
    types: "composition",
    locales: [
      { code: "en", file: "en.json", iso: "en-US" },
      { code: "fr", file: "fr.json", iso: "fr-FR" },
      { code: "ar", file: "ar.json", iso: "ar-AR" },
    ],
  },

  compatibilityDate: "2024-12-27",
});
