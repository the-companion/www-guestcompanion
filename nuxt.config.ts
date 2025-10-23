export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "@nuxtjs/tailwindcss", "@nuxt/icon"],

  // Suppress the missing plugin warning
  nitro: {
    experimental: {
      wasm: false
    }
  },

  i18n: {
    defaultLocale: "en",
    langDir: "locales",
    types: "composition",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: false,
      fallbackLocale: "en"
    },
    locales: [
      { code: "en", file: "en.json", iso: "en-US", name: "English" },
      { code: "fr", file: "fr.json", iso: "fr-FR", name: "Français" },
      { code: "ar", file: "ar.json", iso: "ar-AR", name: "العربية", dir: "rtl" },
    ],
  },

  compatibilityDate: "2024-12-27",
});
