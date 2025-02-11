// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@prisma/nuxt"],
  compatibilityDate: "2025-01-23",
  runtimeConfig: {
    imagesPath: process.env.NUXT_IMAGE_PATH || '/Users/friedrich/code/siemens/2025/Echo/images'
  },
})