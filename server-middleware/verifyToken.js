const firebase = require('../firebase-service')

module.exports = async function verifyToken(req, res) {
  const rawToken = req.headers.authorization
  if (!rawToken) return

  try {
    const [, parsedToken] = rawToken.split(' ')

    await firebase.admin.auth().verifyIdToken(parsedToken)
  } catch (e) {
    const UNAUTHORIZED_CODE = 401
    res.writeHead(UNAUTHORIZED_CODE, { 'Content-Type': 'text/html' })
    return res.end('User is not authorized')
  }
}
