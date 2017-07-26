import { NavigationActions } from 'react-navigation'
import ChatActions from '../Redux/ChatRedux'
import NearbyActions from '../Redux/NearbyRedux'
import UserActions from '../Redux/UserRedux'
import firebase from '../Config/FirebaseConfig'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { store } from '../Containers/App'

export function * userLogin (action) {
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

// User auth'd with Facebook and Firebase. Now we look up user object in our db to see status (welcomed / driver)
export function * userLoginSuccess (action) {
  const { obj } = action
  store.dispatch(ChatActions.initializeChat())
  firebase.database().ref(`users/${obj.uid}`).once('value', snap => {
    const user = snap.val()
    if (!user.welcomed) {
      console.tron.log('Not welcomed, now to welcome screen')
      store.dispatch(NavigationActions.navigate({ routeName: 'WelcomeScreen' }))
      console.tron.log('FOR NOW lets load drivers here')
      const loc = store.getState().user.loc
      store.dispatch(NearbyActions.findNearbyDrivers(obj, loc))
    } else if (user.driver) {
      console.tron.log('Driver, lets go to driverview')
      store.dispatch(NavigationActions.navigate({ routeName: 'DriverScreen' }))
    } else {
      console.tron.log('Welcomed and not driver, lets go to riderview. Assuming we have loc:')
      store.dispatch(NavigationActions.navigate({ routeName: 'RiderScreen' }))
      const loc = store.getState().user.loc
      store.dispatch(NearbyActions.findNearbyDrivers(obj, loc))
    }
  })
}

export function * userLogout (action) {
  LoginManager.logOut()
}

export function * trackEvent ({ name, payload }) {
  const user = store.getState().user
  firebase.database().ref('tracking/' + user.obj.uid).push().set({
    name, payload, timestamp: Date.now()
  })
  firebase.analytics().logEvent(name, payload)
}
