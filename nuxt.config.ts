// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    ssr: false,
    modules: ['@nuxt/ui', '@prisma/nuxt', '@vueuse/nuxt'],
    compatibilityDate: '2025-01-23',
    vite: {
        resolve: {
            alias: {
		'.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js'
            }
        }
    }
})
