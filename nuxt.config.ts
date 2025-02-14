// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxt/ui", "@prisma/nuxt", "@vueuse/nuxt"],
  compatibilityDate: "2025-01-23",
  runtimeConfig: {
    imagesPath:
      process.env.NUXT_IMAGE_PATH ||
      "C:/Users/z005060a/Programmieren/Echo/images",
  },
});
