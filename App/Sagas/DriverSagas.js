import { call } from 'redux-saga/effects'

export function * addDriverBeacon (api, action) {
  const { user, loc, driver } = action
  yield call(api.addDriverBeacon, user, loc, driver)
}
