import { takeLatest } from 'redux-saga/effects'

import { AuthTypes } from '../../Modules/auth/redux'
import { trackEvent, userLogin, userLoginSuccess, userWelcomed, userLogout } from '../../Modules/auth/sagas'

import { LocTypes } from '../../Modules/loc/redux'
import { fetchUserLoc } from '../../Modules/loc/sagas'

import { DriveTypes } from '../../Modules/drive/redux'
import { driverSignupSubmit, driverSignupSuccess, addDriverBeacon } from '../../Modules/drive/sagas'

import { UsersTypes } from '../../Modules/users/redux'
import { fetchNearbyDrivers } from '../../Modules/users/sagas'

import { ChatTypes } from '../../Modules/chat/redux'
import { initializeChat, fetchRoomData, fetchOrRegisterRoom, setActiveChatroom, sendMessage } from '../../Modules/chat/sagas'

export default function * root () {
  yield [
    // auth
    takeLatest(AuthTypes.TRACK_EVENT, trackEvent),
    takeLatest(AuthTypes.USER_LOGIN, userLogin),
    takeLatest(AuthTypes.USER_LOGIN_SUCCESS, userLoginSuccess),
    takeLatest(AuthTypes.USER_WELCOMED, userWelcomed),
    takeLatest(AuthTypes.USER_LOGOUT, userLogout),

    // chat
    takeLatest(ChatTypes.INITIALIZE_CHAT, initializeChat),
    takeLatest(ChatTypes.FETCH_ROOM_DATA, fetchRoomData),
    takeLatest(ChatTypes.FETCH_OR_REGISTER_ROOM, fetchOrRegisterRoom),
    takeLatest(ChatTypes.SET_ACTIVE_CHATROOM, setActiveChatroom),
    takeLatest(ChatTypes.SEND_MESSAGE, sendMessage),

    // drive
    takeLatest(DriveTypes.DRIVER_SIGNUP_SUBMIT, driverSignupSubmit),
    takeLatest(DriveTypes.DRIVER_SIGNUP_SUCCESS, driverSignupSuccess),
    takeLatest(DriveTypes.ADD_DRIVER_BEACON, addDriverBeacon),

    // loc
    takeLatest(LocTypes.FETCH_USER_LOC, fetchUserLoc),

    // users
    takeLatest(UsersTypes.FETCH_NEARBY_DRIVERS, fetchNearbyDrivers)
  ]
}
