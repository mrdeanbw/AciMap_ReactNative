import { takeLatest } from 'redux-saga/effects'
// import { userLogin, userLoginSuccess, userLogout, trackEvent, userWelcomed, fetchUserLoc } from './UserSagas'
import { userLoginSuccess, userLogout, userWelcomed } from './UserSagas'
import { findNearbyDrivers } from './NearbySagas'
import { addDriverBeacon, driverSignupSuccess } from './DriverSagas'
import { initializeChat, messageSent, fetchRoomData, setActiveChatRoom, fetchOrRegisterRoom } from './ChatSagas'

import { AuthTypes } from '../_auth/redux'
import { userLogin, trackEvent } from '../_auth/sagas'

import { LocTypes } from '../_loc/redux'
import { fetchUserLoc } from '../_loc/sagas'

export default function * root () {
  yield [
    // New
    takeLatest(AuthTypes.USER_LOGIN, userLogin),
    takeLatest(AuthTypes.TRACK_EVENT, trackEvent),
    takeLatest(LocTypes.FETCH_USER_LOC, fetchUserLoc),

    // Old
    // takeLatest('USER_LOGIN', userLogin),
    // takeLatest('TRACK_EVENT', trackEvent),
    // takeLatest('FETCH_USER_LOC', fetchUserLoc)
    takeLatest('USER_LOGIN_SUCCESS', userLoginSuccess),
    takeLatest('FIND_NEARBY_DRIVERS', findNearbyDrivers),
    takeLatest('ADD_DRIVER_BEACON', addDriverBeacon),
    takeLatest('INITIALIZE_CHAT', initializeChat),
    takeLatest('MESSAGE_SENT', messageSent),
    takeLatest('FETCH_ROOM_DATA', fetchRoomData),
    takeLatest('SET_ACTIVE_CHAT_ROOM', setActiveChatRoom),
    takeLatest('USER_LOGOUT', userLogout),
    takeLatest('FETCH_OR_REGISTER_ROOM', fetchOrRegisterRoom),
    takeLatest('DRIVER_SIGNUP_SUCCESS', driverSignupSuccess),
    takeLatest('USER_WELCOMED', userWelcomed)
  ]
}
