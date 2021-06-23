export default async (req, res, next) => {
  const urlSegments = req._parsedUrl.pathname
    .replace(/^\/+|\/+$|\.+/g, '')
    .split('/')
  const method = urlSegments.pop()
  const controllerName = urlSegments.slice(1).join('/')
  const api = require('../api/' + controllerName)
  const result = await api[method](req.params)

  res.end(JSON.stringify(result))
}
