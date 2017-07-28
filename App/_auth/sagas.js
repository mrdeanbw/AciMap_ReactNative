// AUTH SAGAS
import { store } from '../Containers/App'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import firebase from '../Config/FirebaseConfig'
import AuthActions from './redux'

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
      store.dispatch(AuthActions.userLoginError(error))
    })
}

/*
userLoginSuccess
User logged in successfully. Look up user object in db to see status (welcomed/driver).
[ Should this be separate from userLogin? ]
*/
export function * userLoginSuccess (action) {
  const { obj } = action
  store.dispatch(ChatActions.initializeChat())
  firebase.database().ref(`users/${obj.uid}`).once('value', snap => {
    const user = snap.val()
    if (!user) {
      const userObj = {
        createdAt: Date.now(),
        email: obj.email,
        emailVerified: false,
        fbid: obj.providerData[0].uid,
        name: obj.displayName,
        photo: obj.photoURL
      }
      firebase.database().ref(`users/${obj.uid}`).set(userObj)
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
      store.dispatch(NavigationActions.navigate({ routeName: 'HomeScreen' }))
    } else {
      console.tron.log('Welcomed not driver')
      const loc = store.getState().user.loc
      if (loc) {
        store.dispatch(NearbyActions.findNearbyDrivers(loc))
      }
      store.dispatch(UiActions.setClass('rider'))
      store.dispatch(NavigationActions.navigate({ routeName: 'HomeScreen' }))
    }
  })
}

/*
userLogout
User clicked logout button. Log out from Facebook (and Firebase?) and redirect to homescreen.
[ Delete localStorage? ]
*/

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