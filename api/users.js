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

async function getUserSubscriptionPlan(requestParams) {
  const userId = requestParams.get('userId')
  return await database
    .ref(userId)
    .child('profile/plan')
    .once('value')
    .then((snapshot) => snapshot.val())
}

export { getUserSubscriptionPlan }
