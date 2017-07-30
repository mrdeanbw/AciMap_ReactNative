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
import { initializeChat } from '../../Modules/chat/sagas'

export default function * root () {
  yield [
    // New Auth
    takeLatest(AuthTypes.TRACK_EVENT, trackEvent),
    takeLatest(AuthTypes.USER_LOGIN, userLogin),
    takeLatest(AuthTypes.USER_LOGIN_SUCCESS, userLoginSuccess),
    takeLatest(AuthTypes.USER_WELCOMED, userWelcomed),
    takeLatest(AuthTypes.USER_LOGOUT, userLogout),

    // New Loc
    takeLatest(LocTypes.FETCH_USER_LOC, fetchUserLoc),

    // New Drive
    takeLatest(DriveTypes.DRIVER_SIGNUP_SUBMIT, driverSignupSubmit),
    takeLatest(DriveTypes.DRIVER_SIGNUP_SUCCESS, driverSignupSuccess),
    takeLatest(DriveTypes.ADD_DRIVER_BEACON, addDriverBeacon),

    // New Users
    takeLatest(UsersTypes.FETCH_NEARBY_DRIVERS, fetchNearbyDrivers),

    // New Chat
    takeLatest(ChatTypes.INITIALIZE_CHAT, initializeChat)
    // takeLatest(ChatroomsTypes.FETCH_ACTIVE_CHATROOMS, fetchActiveChatrooms),

    // New Messages
    // takeLatest(MessagesTypes.MESSAGE_SENT, messageSent),

  ]
}
