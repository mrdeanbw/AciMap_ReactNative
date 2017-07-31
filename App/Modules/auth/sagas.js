// AUTH SAGAS
import { store } from '../../Setup/App'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import firebase from '../../Setup/Config/FirebaseConfig'
import { NavigationActions } from 'react-navigation'
import AuthActions from './redux'
import UsersActions from '../users/redux'
import ChatActions from '../chat/redux'
import * as AuthSelectors from './selectors'
import { startDummyData } from '../../Setup/dummyData'

/*
trackEvent
*/
export function * trackEvent ({ name, payload }) {
  const user = AuthSelectors.getUser(store.getState())
  if (!user) return
  firebase.database().ref('tracking/' + user.uid).push().set({
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
      store.dispatch(AuthActions.setWelcomed(false))
      store.dispatch(NavigationActions.navigate({ routeName: 'WelcomeScreen' }))
    } else if (!userFromFirebase.welcomed) {
      store.dispatch(AuthActions.setWelcomed(false))
      store.dispatch(NavigationActions.navigate({ routeName: 'WelcomeScreen' }))
    } else if (userFromFirebase.driver) {
      store.dispatch(AuthActions.setUserClass('driver'))
      store.dispatch(AuthActions.setWelcomed(true))
      store.dispatch(UsersActions.fetchNearbyDrivers())
      store.dispatch(NavigationActions.navigate({ routeName: 'HomeScreen' }))
    } else {
      store.dispatch(AuthActions.setUserClass('rider'))
      store.dispatch(AuthActions.setWelcomed(true))
      store.dispatch(NavigationActions.navigate({ routeName: 'HomeScreen' }))
    }
  }).then(() => {
    store.dispatch(ChatActions.initializeChat())
    store.dispatch(UsersActions.fetchNearbyDrivers())
    startDummyData()
  })
}

/*
userLogout
User clicked logout button. Log out from Facebook (and Firebase?) and redirect to homescreen.
[ Delete localStorage? ]
*/
export function * userLogout () {
  firebase.auth().signOut()
    .then(() => {
      LoginManager.logOut()
      store.dispatch(NavigationActions.navigate({ routeName: 'LoginScreen' }))
    })
    .catch() // what
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
  store.dispatch(AuthActions.setWelcomed(true))
}
