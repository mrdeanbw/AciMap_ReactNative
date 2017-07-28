import { takeLatest } from 'redux-saga/effects'
import { findNearbyDrivers } from './NearbySagas'
import { addDriverBeacon, driverSignupSuccess } from './DriverSagas'
import { initializeChat, messageSent, fetchRoomData, setActiveChatRoom, fetchOrRegisterRoom } from './ChatSagas'

import { AuthTypes } from '../_auth/redux'
import { trackEvent, userLogin, userLoginSuccess, userWelcomed, userLogout, initializeFirebase } from '../_auth/sagas'

import { LocTypes } from '../_loc/redux'
import { fetchUserLoc } from '../_loc/sagas'

export default function * root () {
  yield [
    // New Auth
    takeLatest(AuthTypes.TRACK_EVENT, trackEvent),
    takeLatest(AuthTypes.USER_LOGIN, userLogin),
    takeLatest(AuthTypes.USER_LOGIN_SUCCESS, userLoginSuccess),
    takeLatest(AuthTypes.USER_WELCOMED, userWelcomed),
    takeLatest(AuthTypes.USER_LOGOUT, userLogout),
    takeLatest(AuthTypes.INITIALIZE_FIREBASE, initializeFirebase),

    // New Loc
    takeLatest(LocTypes.FETCH_USER_LOC, fetchUserLoc),

    // Old Chat
    takeLatest('INITIALIZE_CHAT', initializeChat),
    takeLatest('MESSAGE_SENT', messageSent),
    takeLatest('FETCH_ROOM_DATA', fetchRoomData),
    takeLatest('SET_ACTIVE_CHAT_ROOM', setActiveChatRoom),
    takeLatest('FETCH_OR_REGISTER_ROOM', fetchOrRegisterRoom),

    // Old Driver
    takeLatest('ADD_DRIVER_BEACON', addDriverBeacon),
    takeLatest('DRIVER_SIGNUP_SUCCESS', driverSignupSuccess),

    // Old Nearby
    takeLatest('FIND_NEARBY_DRIVERS', findNearbyDrivers)
  ]
}
