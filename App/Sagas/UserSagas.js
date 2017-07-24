import UserActions from '../Redux/UserRedux'
import NearbyActions from '../Redux/NearbyRedux'
import ChatActions from '../Redux/ChatRedux'
import firebase from '../Config/FirebaseConfig'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { store } from '../Containers/App'

export function * userLogin (api, action) {
  const { loc } = action
  LoginManager
    .logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        return Promise.resolve('cancelled')
      }
      return AccessToken.getCurrentAccessToken()
    })
    .then(data => {
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
      return firebase.auth().signInWithCredential(credential)
    })
    .then((currentUser) => {
      if (currentUser === 'cancelled') {
        console.log('Login cancelled')
      } else {
        store.dispatch(UserActions.userLoginSuccess(currentUser.toJSON(), loc))
      }
    })
    .catch((error) => {
      console.log(`Login fail with error: ${error}`)
    })
}

export function * userLoginSuccess (api, action) {
  const { obj, loc } = action
  store.dispatch(NearbyActions.findNearbyDrivers(obj, loc))
  store.dispatch(ChatActions.initializeChat())
}

export function * userLogout (api, action) {
  LoginManager.logOut()
}
