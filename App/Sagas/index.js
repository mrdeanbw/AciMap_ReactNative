import { takeLatest } from 'redux-saga/effects'

import { AuthTypes } from '../_auth/redux'
import { trackEvent, userLogin, userLoginSuccess, userWelcomed, userLogout, initializeFirebase } from '../_auth/sagas'

import { LocTypes } from '../_loc/redux'
import { fetchUserLoc } from '../_loc/sagas'

import { DriveTypes } from '../_drive/redux'
import { driverSignupSubmit, driverSignupSuccess, addDriverBeacon } from '../_drive/sagas'

import { findNearbyDrivers } from './NearbySagas'
import { initializeChat, messageSent, fetchRoomData,
    setActiveChatRoom, fetchOrRegisterRoom } from './ChatSagas'

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

    // New Drive
    takeLatest(DriveTypes.DRIVER_SIGNUP_SUBMIT, driverSignupSubmit),
    takeLatest(DriveTypes.DRIVER_SIGNUP_SUCCESS, driverSignupSuccess),
    takeLatest(DriveTypes.ADD_DRIVER_BEACON, addDriverBeacon),

    // New Users
    // takeLatest(UsersTypes.FETCH_NEARBY_DRIVERS, fetchNearbyDrivers),
    // takeLatest(UsersTypes.ADD_USER, addUser),

    // New Chatrooms
    // takeLatest(ChatroomsTypes.FETCH_ACTIVE_CHATROOMS, fetchActiveChatrooms),
    // takeLatest(ChatroomsTypes.ADD_CHATROOM, addChatroom),

    // New Messages
    // takeLatest(ChatroomsTypes.ADD_MESSAGE, addMessage),

    // Old Nearby
    takeLatest('FIND_NEARBY_DRIVERS', findNearbyDrivers),

    // Old Chat
    takeLatest('INITIALIZE_CHAT', initializeChat),
    takeLatest('MESSAGE_SENT', messageSent),
    takeLatest('FETCH_ROOM_DATA', fetchRoomData),
    takeLatest('SET_ACTIVE_CHAT_ROOM', setActiveChatRoom),
    takeLatest('FETCH_OR_REGISTER_ROOM', fetchOrRegisterRoom)
  ]
}
