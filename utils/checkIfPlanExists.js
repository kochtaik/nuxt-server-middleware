/* simulate TypeScript enum */

let availablePlans
;(function (availablePlans) {
  availablePlans['premium'] = 'premium'
  availablePlans['default'] = 'default'
})(availablePlans || (availablePlans = {}))

module.exports = function (planType) {
  return planType in availablePlans
}
