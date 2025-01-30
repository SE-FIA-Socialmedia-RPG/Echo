// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@prisma/nuxt", "nuxt-file-storage"],
  compatibilityDate: "2025-01-23",
  fileStorage: {
    mount: "test-img"
  }
})