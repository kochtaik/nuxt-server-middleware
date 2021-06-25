export default async (req, res, next) => {
  const urlSegments = req._parsedUrl.pathname
    .replace(/^\/+|\/+$|\.+/g, '')
    .split('/')
  const method = urlSegments.pop()
  const controllerName = urlSegments.slice(1).join('/')
  const api = require('../api/' + controllerName)
  /* fully rewrite to async/await syntax */
  await api[method](req.params).then((output) => {
    res.end(JSON.stringify(output))
  })
}
