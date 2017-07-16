import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import NearbyActions from '../Redux/NearbyRedux'
import firebase from '../Lib/firebase'
import { store } from '../Containers/App'

export function * addDriverBeacon (api, action) {
	const { user, loc, driver } = action
  console.tron.log("In addDriverBeacon saga with user, loc, driver:")
  console.tron.log(user)
  console.tron.log(loc)
  console.tron.log(driver)
  console.tron.log('calling dat')
  const response = yield call(api.addDriverBeacon, user, loc, driver)
  console.tron.log(response)
  // yield put(NearbyActions.foundNearbyDrivers(response.data))
}
