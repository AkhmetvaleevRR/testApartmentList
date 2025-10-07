export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  css: ['~/assets/main.css','~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *;',
        },
      },
    },
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=PT+Root+UI:wght@400;500;700&display=swap'
        }
      ]
    }
  },
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './assets/icons'
    }]
  }
})