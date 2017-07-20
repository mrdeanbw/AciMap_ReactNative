import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import { userLogin, userLoginSuccess } from './UserSagas'
import { findNearbyDrivers } from './NearbySagas'
import { addDriverBeacon } from './DriverSagas'
import { initializeChat, messageSent } from './ChatSagas'

const api = API.create()

export default function * root () {
  yield [
    takeLatest('USER_LOGIN', userLogin, api),
    takeLatest('USER_LOGIN_SUCCESS', userLoginSuccess, api),
    takeLatest('FIND_NEARBY_DRIVERS', findNearbyDrivers, api),
    takeLatest('ADD_DRIVER_BEACON', addDriverBeacon, api),
    takeLatest('INITIALIZE_CHAT', initializeChat, api),
    takeLatest('MESSAGE_SENT', messageSent, api)
  ]
}
