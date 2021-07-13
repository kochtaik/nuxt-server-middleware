module.exports = function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.NUXT_APP_CLIENT_URL)
  res.setHeader('Access-Control-Allow-Headers', 'authorization')
}
