// const firebase = require('../firebase-service.js')
// const database = firebase.admin.database(firebase.app)
// const doesPlanExist = require('../utils/checkIfPlanExists')

// async function getPlanDetails(requestParams) {
//   const requestedPlan = requestParams.get('plan')
//   if (!doesPlanExist(requestedPlan)) throw new Error('Invalid plan')

//   const snapshot = await database
//     .ref('plans')
//     .child(requestedPlan)
//     .once('value')
//   return snapshot.val()
// }

// export { getPlanDetails }
