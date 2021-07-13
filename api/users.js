const firebase = require('../firebase-service.js')

const database = firebase.admin.database(firebase.app)

async function getUserSubscriptionPlan(requestParams) {
  const userId = requestParams.get('userId')
  return await database
    .ref(userId)
    .child('profile/plan')
    .once('value')
    .then((snapshot) => snapshot.val())
}

export { getUserSubscriptionPlan }
