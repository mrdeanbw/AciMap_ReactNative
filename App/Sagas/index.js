import { takeLatest } from 'redux-saga/effects'
import { userLogin, userLoginSuccess, userLogout, trackEvent } from './UserSagas'
import { findNearbyDrivers } from './NearbySagas'
import { addDriverBeacon } from './DriverSagas'
import { initializeChat, messageSent, fetchRoomData, setActiveChatRoom, fetchOrRegisterRoom } from './ChatSagas'

export default function * root () {
  yield [
    takeLatest('USER_LOGIN', userLogin),
    takeLatest('USER_LOGIN_SUCCESS', userLoginSuccess),
    takeLatest('FIND_NEARBY_DRIVERS', findNearbyDrivers),
    takeLatest('ADD_DRIVER_BEACON', addDriverBeacon),
    takeLatest('INITIALIZE_CHAT', initializeChat),
    takeLatest('MESSAGE_SENT', messageSent),
    takeLatest('FETCH_ROOM_DATA', fetchRoomData),
    takeLatest('SET_ACTIVE_CHAT_ROOM', setActiveChatRoom),
    takeLatest('USER_LOGOUT', userLogout),
    takeLatest('TRACK_EVENT', trackEvent),
    takeLatest('FETCH_OR_REGISTER_ROOM', fetchOrRegisterRoom)
  ]
}
