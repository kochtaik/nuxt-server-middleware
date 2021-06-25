var admin = require('firebase-admin')
var serviceAccount = require(process.env.NUXT_APP_FIREBASE_SERVICE_ACCOUNT)

let app
if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NUXT_APP_DATABASE_URL,
  })
}
const database = admin.database(app)
const EVENT_TYPES = {
  ROUTE_CHANGE: 'ROUTE_CHANGE',
  BUTTON_CLICK: 'BUTTON_CLICK',
}

async function getEventsByType(requestParams) {
  const eventType = requestParams.get('type')
  if (!eventType in EVENT_TYPES) return

  return await database
    .ref('analytics')
    .once('value')
    .then((snapshot) => {
      const analyticsData = Object.values(snapshot.val())
      return analyticsData.filter((entry) => entry.eventType === eventType)
    })
}

export { getEventsByType }
