// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    ssr: false,
    modules: ['@nuxt/ui', '@prisma/nuxt', '@vueuse/nuxt'],
    compatibilityDate: '2025-01-23',
    runtimeConfig: {
        defaultImageIds: {
            profile: 1,
            banner: 2,
            background: 3,
        },
    },
    vite: {
        resolve: {
            alias: {
                '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
            },
        },
    },
})
