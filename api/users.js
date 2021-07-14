const firebase = require('../firebase-service.js')
const database = firebase.admin.database(firebase.app)
const doesPlanExist = require('../utils/checkIfPlanExists')

async function getUserProfile(requestParams) {
  const userId = requestParams.get('userId')
  if (!userId) throw new Error('User ID must be specified')

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
  if (!doesPlanExist(requestedPlan)) throw new Error('Invalid plan')

  /* get details of the requested plan from Firebase */
  const requestedPlanDetails = await getPlanDetails(requestParams)
  console.log('requested plan details:', userProfile.plan)

  /* change 'plan' field in the user profile and return plan details */
  const userId = requestParams.get('userId')
  await database
    .ref(userId)
    .child('profile')
    .child('plan')
    .set(requestedPlanDetails)
  return requestedPlanDetails
}

async function getPlanDetails(requestParams) {
  const requestedPlan = requestParams.get('plan')
  if (!doesPlanExist(requestedPlan)) throw new Error('Invalid plan')

  const snapshot = await database
    .ref('plans')
    .child(requestedPlan)
    .once('value')
  return snapshot.val()
}

export { getUserSubscriptionPlan, setUserSubscriptionPlan, getPlanDetails }
