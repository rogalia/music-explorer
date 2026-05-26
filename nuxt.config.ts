// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true
    },
    
    css: ['@/assets/css/main.css'],
    
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-icons'
    ],
    
    runtimeConfig: {
        public: {
            lastfmKey: process.env.NUXT_PUBLIC_LASTFM_KEY,
        },
    }
})
