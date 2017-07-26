import { NavigationActions } from 'react-navigation'
import UserActions from '../Redux/UserRedux'
import ChatActions from '../Redux/ChatRedux'
import firebase from '../Config/FirebaseConfig'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { store } from '../Containers/App'

export function * userLogin (api, action) {
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
        store.dispatch(UserActions.userLoginSuccess(currentUser.toJSON()))
        firebase.analytics().setAnalyticsCollectionEnabled(true)
        store.dispatch(UserActions.trackEvent('userLogin'))
      }
    })
    .catch((error) => {
      console.log(`Login fail with error: ${error}`)
    })
}

// todo: initialFetch should encompass userLoginSuccess?
export function * userLoginSuccess (api, action) {
  const { obj } = action
  console.tron.log(obj)
  store.dispatch(ChatActions.initializeChat())
  // Look up user in database to see whether they went through welcome sequence / are a driver
  firebase.database().ref(`users/${obj.uid}`).once('value', snap => {
    const user = snap.val()
    console.tron.log(user)

    if (!user.welcomed) {
      console.tron.log('Not welcomed, now to welcome screen')
      store.dispatch(NavigationActions.navigate({ routeName: 'WelcomeScreen' }))
    }

    else if (user.driver) {
      console.tron.log('Driver, lets go to driverview')
      store.dispatch(NavigationActions.navigate({ routeName: 'DriverScreen' }))
    }

    else {
      console.tron.log('Welcomed and not driver, lets go to riderview')
      store.dispatch(NavigationActions.navigate({ routeName: 'RiderScreen' }))
    }    
  })
}

export function * userLogout (api, action) {
  LoginManager.logOut()
}

export function * trackEvent (api, { name, payload }) {
  const user = store.getState().user
  firebase.database().ref('tracking/' + user.obj.uid).push().set({
    name, payload, timestamp: Date.now()
  })
  firebase.analytics().logEvent(name, payload)
}
