import UserActions from '../Redux/UserRedux'
import NearbyActions from '../Redux/NearbyRedux'
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
        console.tron.log('We logged in...')
        console.tron.log(currentUser.toJSON())
        console.tron.log(loc)
        console.tron.log(store)
        console.tron.log(UserActions)
        console.tron.log(UserActions.userLoginSuccess)
        console.tron.log(UserActions.userLoginSuccess())
        console.tron.log(UserActions.userLoginSuccess(currentUser.toJSON(), loc))
        store.dispatch(UserActions.userLoginSuccess(currentUser.toJSON(), loc))
        console.tron.log('Did that work')
      }
    })
    .catch((error) => {
      console.log(`Login fail with error: ${error}`)
    })
}

export function * userLoginSuccess (api, action) {
  console.tron.log('userLoginSuccess saga...')
  const { obj, loc } = action
  store.dispatch(NearbyActions.findNearbyDrivers(obj, loc))
}
