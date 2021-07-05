const firebase = require('../firebase-service')

module.exports = async function verifyToken(token, response) {
  if (!token) return

  try {
    const [, parsedToken] = token.split(' ')

    await firebase.admin.auth().verifyIdToken(parsedToken)
  } catch (e) {
    const UNAUTHORIZED_CODE = 401
    response.writeHead(UNAUTHORIZED_CODE, { 'Content-Type': 'text/html' })
    return response.end('User is not authorized')
  }
}
