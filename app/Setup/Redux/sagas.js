import { spawn, takeLatest } from 'redux-saga/effects'
import codePushSaga from 'react-native-code-push-saga'
import { onSyncStatusChange, onDownloadProgress } from '../Services/codepush'

import { AuthTypes } from '../../Modules/auth/redux'
import { ChatTypes } from '../../Modules/chat/redux'
import { DriveTypes } from '../../Modules/drive/redux'
import { LocTypes } from '../../Modules/loc/redux'
import { UsersTypes } from '../../Modules/users/redux'
import { trackEvent, userLogin, userLoginSuccess, userWelcomed, userLogout } from '../../Modules/auth/sagas'
import { initializeChat, fetchRoomData, fetchOrRegisterRoom, sendMessage } from '../../Modules/chat/sagas'
import { driverSignupSubmit, driverSignupSuccess, addDriverBeacon, removeDriverBeacon } from '../../Modules/drive/sagas'
import { fetchUserLoc, fetchUserLocError } from '../../Modules/loc/sagas'
import { listenForNearbyDrivers } from '../../Modules/users/sagas'

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
    takeLatest(AuthTypes.TRACK_EVENT, trackEvent),
    takeLatest(AuthTypes.USER_LOGIN, userLogin),
    takeLatest(AuthTypes.USER_LOGIN_SUCCESS, userLoginSuccess),
    takeLatest(AuthTypes.USER_WELCOMED, userWelcomed),
    takeLatest(AuthTypes.USER_LOGOUT, userLogout),

    // chat
    takeLatest(ChatTypes.INITIALIZE_CHAT, initializeChat),
    takeLatest(ChatTypes.FETCH_ROOM_DATA, fetchRoomData),
    takeLatest(ChatTypes.FETCH_OR_REGISTER_ROOM, fetchOrRegisterRoom),
    takeLatest(ChatTypes.SEND_MESSAGE, sendMessage),

    // drive
    takeLatest(DriveTypes.DRIVER_SIGNUP_SUBMIT, driverSignupSubmit),
    takeLatest(DriveTypes.DRIVER_SIGNUP_SUCCESS, driverSignupSuccess),
    takeLatest(DriveTypes.ADD_DRIVER_BEACON, addDriverBeacon),
    takeLatest(DriveTypes.REMOVE_DRIVER_BEACON, removeDriverBeacon),

    // loc
    takeLatest(LocTypes.FETCH_USER_LOC, fetchUserLoc),
    takeLatest(LocTypes.FETCH_USER_LOC_ERROR, fetchUserLocError),

    // users
    takeLatest(UsersTypes.LISTEN_FOR_NEARBY_DRIVERS, listenForNearbyDrivers)
  ]
}
