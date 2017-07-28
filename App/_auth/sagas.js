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