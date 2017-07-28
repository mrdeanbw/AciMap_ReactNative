// AUTH SAGAS
import { store } from '../Containers/App'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import firebase from '../Config/FirebaseConfig'
import { NavigationActions } from 'react-navigation'
import AuthActions from './redux'
import * as AuthSelectors from './selectors'

import ChatActions from '../Redux/ChatRedux'
import NearbyActions from '../Redux/NearbyRedux'
import UiActions from '../Redux/UiRedux'

/*
trackEvent
*/
export function * trackEvent ({ name, payload }) {
  const user = store.getState()._auth // reselectize
  if (!user.obj) return
  firebase.database().ref('tracking/' + user.obj.uid).push().set({
    name, payload, timestamp: Date.now()
  })
  firebase.analytics().logEvent(name, payload)
}

/*
userLogin
- User clicked login button. Authenticate with Firebase & Facebook; fire success action to save user object.
*/

export function * userLogin (action) {
  LoginManager
    .logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        store.dispatch(AuthActions.userLoginError('Facebook login cancelled'))
        return false
      }
      return AccessToken.getCurrentAccessToken()
    })
    .then(data => {
      if (!data) return false
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
      return firebase.auth().signInWithCredential(credential)
    })
    .then((currentUser) => {
      if (!currentUser) return false
      store.dispatch(AuthActions.userLoginSuccess(currentUser.toJSON()))
      // store.dispatch(AuthActions.initializeFirebase())
      store.dispatch(AuthActions.trackEvent('userLogin'))
    })
    .catch((error) => {
      console.tron.log(`Login fail with error: ${error}`)
      window.alert(error)
      store.dispatch(AuthActions.userLoginError(error))
    })
}

/*
userLoginSuccess
User logged in successfully. Look up user object in db to see status (welcomed/driver).
Fire action to set up Firebase listeners.
*/
export function * userLoginSuccess ({ obj }) {
  store.dispatch(AuthActions.initializeFirebase())

  const user = obj
  const uid = obj.uid
  console.tron.log('Looking up user ' + uid + ' in Firebase...')

  firebase.database().ref(`users/${uid}`).once('value', snap => {
    const userFromFirebase = snap.val()
    if (!userFromFirebase) {
      const newFirebaseUserObj = {
        createdAt: Date.now(),
        email: user.email,
        emailVerified: user.emailVerified,
        fbid: user.providerData[0].uid,
        name: user.displayName,
        photo: user.photoURL
      }
      firebase.database().ref(`users/${uid}`).set(newFirebaseUserObj)
      store.dispatch(NavigationActions.navigate({ routeName: 'WelcomeScreen' }))
    } else if (!user.welcomed) {
      console.tron.log('Not welcomed, now to welcome screen')
      store.dispatch(NavigationActions.navigate({ routeName: 'WelcomeScreen' }))
    } else if (user.driver) {
      console.tron.log('Welcomed driver')
      const loc = store.getState().user.loc
      if (loc) {
        store.dispatch(NearbyActions.findNearbyDrivers(loc))
      }
      store.dispatch(UiActions.setClass('driver'))
      // store.dispatch(NavigationActions.navigate({ routeName: 'HomeScreen' }))
    } else {
      console.tron.log('Welcomed not driver')
      const loc = store.getState().user.loc
      if (loc) {
        store.dispatch(NearbyActions.findNearbyDrivers(loc))
      }
      store.dispatch(UiActions.setClass('rider'))
      // store.dispatch(NavigationActions.navigate({ routeName: 'HomeScreen' }))
    }
  })
}

/*
userLogout
User clicked logout button. Log out from Facebook (and Firebase?) and redirect to homescreen.
[ Delete localStorage? ]
*/
export function * userLogout () {
  LoginManager.logOut()
  store.dispatch(NavigationActions.navigate({ routeName: 'LoginScreen' }))
}

/* userWelcomed
User has been through the welcome sequence. Set flag on firebase userObj so we skip it next time.
*/
export function * userWelcomed () {
  const user = AuthSelectors.getUser(store.getState())
  const uid = user.uid
  firebase.database().ref('users/' + uid).update({
    welcomed: true
  })
}

/*
initializeFirebase
User just logged in successfully and their info is in redux. Set up all relevant Firebase listeners.
*/

export function * initializeFirebase () {
  console.tron.log('Setting up Firebase listeners...')

  const user = AuthSelectors.getUser(store.getState())
  const uid = user.uid

  console.tron.log('Listening for user chatrooms...')
  firebase.database().ref(`users/${uid}/rooms`).on('value', rooms => {
    rooms.forEach(room => {
      // Add that room with user info to redux for DrawerChatWidget
      store.dispatch(ChatActions.fetchRoomData(room.key))
      // Listen to each room's messages
      console.tron.log(`Found user chatroom with key ${room.key}, now listening for messages.`)
      firebase.database().ref(`messages/${room.key}`).orderByKey().limitToLast(25).on('value', snap => {
        const messages = []
        snap.forEach(message => {
          const msg = message.val()
          messages.push({
            _id: message.key,
            text: msg.text,
            user: msg.user,
            createdAt: msg.createdAt
          })
        })
        messages.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        console.tron.log('Firing setChatRoomMessages action with messages:')
        console.tron.log(messages)
        store.dispatch(ChatActions.setChatRoomMessages(room.key, messages))
      })
    })
  })
}
