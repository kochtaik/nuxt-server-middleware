const doesPlanExist = require('../utils/checkIfPlanExists')

const firebase = require('../firebase-service')
const database = firebase.admin.database(firebase.app)

module.exports = {
  verifyToken: async (req, res) => {
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
  },

  setSearchParams: (req, res) => {
    const fullURL = new URL(`${req.headers.origin}${req.originalUrl}`)
    req.params = fullURL.searchParams
  },

  subscribeUserToPremium: async (req, res) => {
    try {
      if (req.method === 'OPTIONS') {
        return res.end()
      }
      const { userId, planType } = req.body
      if (!userId || !planType) {
        throw new Error('Both userId and planType must be specified')
      }
      /* get details of the requested plan from Firebase */
      const requestedPlanDetailsRes = await module.exports.getPlanDetails(
        planType
      )
      const requestedPlanDetails = JSON.parse(requestedPlanDetailsRes)

      /* change 'plan' field in the user profile and return plan details */
      await database
        .ref(userId)
        .child('profile')
        .child('plan')
        .set(requestedPlanDetails)
      res.end()
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      res.end()
    }
  },

  setCORSHeaders: (res) => {
    res.setHeader(
      'Access-Control-Allow-Origin',
      process.env.NUXT_APP_CLIENT_URL
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  },

  getPlanDetails: async (requestedPlanType) => {
    if (!doesPlanExist(requestedPlanType)) throw new Error('Invalid plan type')

    const snapshot = await database
      .ref('plans')
      .child(requestedPlanType)
      .once('value')
    return JSON.stringify(snapshot.val())
  },
}
