export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'taddart-iw',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  loading: '~/components/loading/Loading',

  publicRuntimeConfig: {
    strapiBackendUrl: process.env.ENV === 'production' ? 'https://anebdal.tuddar-nat-abdelmumen.net' : 'http://localhost:1337'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/scss/tooltip.scss',
    '@/assets/style/scss/global.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/filters/dateTimeFilter/DateTimeFilter.js'},
    {src: '~/plugins/filters/strapiImage/defaultImage.js'},
    {src: '~/plugins/filters/strapiImage/thumbnailImage.js'},
    {src: '~/plugins/gallery.js', ssr: true},
    {src: '~/plugins/tooltip.js', ssr: true},
    {src: '~/plugins/wayPoint.js', mode: 'client'},
    {src: '~/plugins/cookies.js', mode: 'client'},
    {src: '~/plugins/directives/v-intersection.js', mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/strapi',
    '@nuxtjs/apollo',
    '@nuxtjs/style-resources',
    ['nuxt-i18n', {
      strategy: 'prefix_except_default',
      defaultLocale: 'kab',
    }],
    '@nuxtjs/axios',
  ],
  i18n: {
    locales: [
      {
        code: 'kab',
        file: 'kab-KAB.js'
      },
      {
        code: 'fr',
        file: 'fr-FR.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'kab',
    vueI18n: {
      fallbackLocale: 'kab',
    }
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.ENV === 'production' ? 'http://10.0.3.24:1337/graphql' : 'http://localhost:1337/graphql'
      }
    },
    errorHandler: '~/plugins/apollo-error-handler.js'
  },
  styleResources: {
    scss: '~/assets/style/scss/variables/*.scss'
  },
  strapi: {
    entities: ['header'],
    url: process.env.ENV === 'production' ? 'https://anebdal.tuddar-nat-abdelmumen.net' : 'http://localhost:1337',
    cookie: {
      path: '/',
    }
  },

  axios: {
    baseURL: process.env.ENV === 'production' ? 'https://anebdal.tuddar-nat-abdelmumen.net' : 'http://localhost:1337'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    host: process.env.ENV === 'production' ? '0.0.0.0' : 'localhost',
  }
}
