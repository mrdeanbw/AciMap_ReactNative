import { call } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import { store } from '../Containers/App'

export function * addDriverBeacon (api, action) {
  const { user, loc, driver } = action
  store.dispatch(UserActions.trackEvent('addDriverBeacon', loc))
  yield call(api.addDriverBeacon, user, loc, driver)
}
