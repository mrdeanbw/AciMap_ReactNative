import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import { userLogin, userSuccess } from './UserSagas'
import { findNearbyDrivers } from './NearbySagas'
import { addDriverBeacon } from './DriverSagas'

const api = API.create()

export default function * root () {
  yield [
  	takeLatest('USER_LOGIN', userLogin, api),
  	takeLatest('USER_SUCCESS', userSuccess, api),
  	takeLatest('FIND_NEARBY_DRIVERS', findNearbyDrivers, api),
  	takeLatest('ADD_DRIVER_BEACON', addDriverBeacon, api)
  ]
}