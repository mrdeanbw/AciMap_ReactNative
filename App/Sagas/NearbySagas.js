import { call } from 'redux-saga/effects'

export function * findNearbyDrivers (api, action) {
  const response = yield call(api.findNearbyDrivers)
  console.tron.log(response.data)
}