import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import { findNearbyDrivers } from './NearbySagas'
import { driverSignupSubmit } from './UserSagas'

const api = API.create()

export default function * root () {
  yield [
    takeLatest('FIND_NEARBY_DRIVERS', findNearbyDrivers, api),
    takeLatest('DRIVER_SIGNUP_SUBMIT', driverSignupSubmit, api)
  ]
}