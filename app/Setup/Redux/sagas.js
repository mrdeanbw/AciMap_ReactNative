import { spawn, takeLatest } from 'redux-saga/effects'
import codePushSaga from 'react-native-code-push-saga'
import { onSyncStatusChange, onDownloadProgress } from '../Services/codepush'

import { AuthTypes } from '../../Modules/auth/redux'
import { ChatTypes } from '../../Modules/chat/redux'
import { DriveTypes } from '../../Modules/drive/redux'
import { LocTypes } from '../../Modules/loc/redux'
import { RequestTypes } from '../../Modules/request/redux'
import { UsersTypes } from '../../Modules/users/redux'
import * as AuthSagas from '../../Modules/auth/sagas'
import * as ChatSagas from '../../Modules/chat/sagas'
import * as DriveSagas from '../../Modules/drive/sagas'
import * as LocSagas from '../../Modules/loc/sagas'
import * as RequestSagas from '../../Modules/request/sagas'
import * as UsersSagas from '../../Modules/users/sagas'

export default function * root () {
  yield [
    spawn(codePushSaga, {
      codePushStatusDidChange: onSyncStatusChange,
      codePushDownloadDidProgress: onDownloadProgress,
      syncOnStart: false,
      syncActionName: 'auth.SYNC_CODEPUSH',
      syncOnInterval: 30
    }),

    // auth
    takeLatest(AuthTypes.TRACK_EVENT, AuthSagas.trackEvent),
    takeLatest(AuthTypes.USER_LOGIN, AuthSagas.userLogin),
    takeLatest(AuthTypes.USER_LOGIN_SUCCESS, AuthSagas.userLoginSuccess),
    takeLatest(AuthTypes.USER_WELCOMED, AuthSagas.userWelcomed),
    takeLatest(AuthTypes.USER_LOGOUT, AuthSagas.userLogout),

    // chat
    takeLatest(ChatTypes.INITIALIZE_CHAT, ChatSagas.initializeChat),
    takeLatest(ChatTypes.FETCH_ROOM_DATA, ChatSagas.fetchRoomData),
    takeLatest(ChatTypes.FETCH_OR_REGISTER_ROOM, ChatSagas.fetchOrRegisterRoom),
    takeLatest(ChatTypes.SEND_MESSAGE, ChatSagas.sendMessage),

    // drive
    takeLatest(DriveTypes.DRIVER_SIGNUP_SUBMIT, DriveSagas.driverSignupSubmit),
    takeLatest(DriveTypes.DRIVER_SIGNUP_SUCCESS, DriveSagas.driverSignupSuccess),
    takeLatest(DriveTypes.ADD_DRIVER_BEACON, DriveSagas.addDriverBeacon),
    takeLatest(DriveTypes.REMOVE_DRIVER_BEACON, DriveSagas.removeDriverBeacon),
    takeLatest(DriveTypes.LISTEN_FOR_NEARBY_REQUESTS, DriveSagas.listenForNearbyRequests),

    // loc
    takeLatest(LocTypes.FETCH_USER_LOC, LocSagas.fetchUserLoc),
    takeLatest(LocTypes.FETCH_USER_LOC_ERROR, LocSagas.fetchUserLocError),

    // request
    takeLatest(RequestTypes.REQUEST_SUBMITTED, RequestSagas.requestSubmitted),

    // users
    takeLatest(UsersTypes.LISTEN_FOR_NEARBY_DRIVERS, UsersSagas.listenForNearbyDrivers)
  ]
}
