import { call } from 'redux-saga/effects'

export function * findNearbyDrivers (api, action) {
	const { user, loc } = action
	console.tron.log('In findNearbyDrivers saga with user and loc:')
	console.tron.log(user)
	console.tron.log(loc)
  const response = yield call(api.findNearbyDrivers, user, loc)
  console.tron.log(response.data)
  alert(JSON.stringify(response.data))
}