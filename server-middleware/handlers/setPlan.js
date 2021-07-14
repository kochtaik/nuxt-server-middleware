const doesPlanExist = require('../../utils/checkIfPlanExists')
const firebase = require('../../firebase-service')
const database = firebase.admin.database(firebase.app)

module.exports = async function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  const { userId, planType } = JSON.parse([Object.keys(req.body)])
  if (!userId || !planType) {
    throw new Error('Both userId and planType must be specified')
  }

  /* get details of the requested plan from Firebase */
  const requestedPlanDetails = await getPlanDetails(planType) // { type: 'premium', price: 0.01 }

  /* change 'plan' field in the user profile and return plan details */
  await database
    .ref(userId)
    .child('profile')
    .child('plan')
    .set(requestedPlanDetails)
  console.log(requestedPlanDetails)
  return res.end(JSON.stringify(requestedPlanDetails))
}

async function getPlanDetails(planType) {
  if (!doesPlanExist(planType)) throw new Error('Invalid plan')

  const snapshot = await database.ref('plans').child(planType).once('value')
  return snapshot.val()
}
