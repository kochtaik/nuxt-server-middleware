const handlers = require('./server-middleware/handlers')

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
      handler: require('body-parser').json(),
    },
    {
      path: '/api',
      handler: async (req, res, next) => {
        handlers.setCORSHeaders(res)
        await handlers.verifyToken(req, res)
        handlers.setSearchParams(req)
        next()
      },
    },
    {
      path: '/api/plans/subscribeUserToPremium',
      handler: async (req, res) =>
        await handlers.subscribeUserToPremium(req, res),
    },
    {
      path: '/api/plans/getPlanDetails',
      handler: async (req, res, next) => {
        const [, requestedPlan] = req.originalUrl.split('plan=')

        res.end(await handlers.getPlanDetails(requestedPlan))
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
