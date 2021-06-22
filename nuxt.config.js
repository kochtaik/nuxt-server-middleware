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
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  serverMiddleware: [
    { path: '/api', handler: require('body-parser').json() },
    {
      path: '/api',
      handler: (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
        /* refactor */
        res.setHeader('Access-Control-Allow-Headers', 'Origin')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Headers', 'Accept')

        const url = require('url')
        req.query = url.parse(req.url, true).query
        req.params = { ...req.query, ...req.body }
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
