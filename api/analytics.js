const firebase = require('../firebase-service.js')

const database = firebase.admin.database(firebase.app)
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
