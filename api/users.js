const firebase = require('../firebase-service.js')

const database = firebase.admin.database(firebase.app)

/* simulate TypeScript enum */
let availablePlans
;(function (availablePlans) {
  availablePlans['premium'] = 'premium'
  availablePlans['default'] = 'default'
})(availablePlans || (availablePlans = {}))

async function getUserProfile(requestParams) {
  const userId = requestParams.get('userId')
  if (!userId) throw new Error('User ID is not defined')

  return await database
    .ref(userId)
    .child('profile')
    .once('value')
    .then((snapshot) => snapshot.val())
}

async function getUserSubscriptionPlan(requestParams) {
  const userProfile = await getUserProfile(requestParams)

  return userProfile.plan
}

async function setUserSubscriptionPlan(requestParams) {
  const requestedPlan = requestParams.get('plan')
  if (!requestedPlan in availablePlans) throw new Error('Invalid plan')

  const userProfile = await getUserProfile(requestParams)
  const userId = requestParams.get('userId')

  userProfile.plan = {
    type: requestedPlan,
    price: await getPlanPrice(requestParams),
  }

  await database.ref(userId).child('profile').set(userProfile)
  return userProfile.plan
}

async function getPlanPrice(requestParams) {
  const plan = requestParams.get('plan')
  if (!plan in availablePlans) throw new Error('Invalid plan')

  const snapshot = await database.ref('prices').child(plan).once('value')
  return Number(snapshot.val())
}

export { getUserSubscriptionPlan, setUserSubscriptionPlan, getPlanPrice }
