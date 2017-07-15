import { call, put } from 'redux-saga/effects'
import NearbyActions from '../Redux/NearbyRedux'

export function * findNearbyDrivers (api, action) {
	const { user, loc } = action
  const response = yield call(api.findNearbyDrivers, user, loc)
  yield put(NearbyActions.foundNearbyDrivers(response.data))
}