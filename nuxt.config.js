const verifyToken = require('./server-middleware/verifyToken.js')
const setCORS = require('./server-middleware/setCORSHeaders.js')
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-demo',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  serverMiddleware: [
    {
      path: '/api',
      handler: require('body-parser').urlencoded({ extended: true }),
    },
    {
      path: '/api/plans/setPlan',
      handler: require('./server-middleware/handlers/setPlan'),
    },
    {
      path: '/api',
      handler: async (req, res, next) => {
        setCORS(res)

        const rawToken = req.headers.authorization
        verifyToken(rawToken, res)

        const fullURL = new URL(`${req.headers.origin}${req.originalUrl}`)
        req.params = fullURL.searchParams
        next()
      },
    },
    {
      path: '/api',
      handler: '~/server-middleware/api-server.js',
    },
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
