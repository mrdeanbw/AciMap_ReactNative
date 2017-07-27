import { NavigationActions } from 'react-navigation'
import ChatActions from '../Redux/ChatRedux'
import NearbyActions from '../Redux/NearbyRedux'
import UiActions from '../Redux/UiRedux'
import UserActions from '../Redux/UserRedux'
import firebase from '../Config/FirebaseConfig'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { Metrics } from '../Themes/'
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

export function * userLogout (action) {
  LoginManager.logOut()
  store.dispatch(NavigationActions.navigate({ routeName: 'LoginScreen' }))
}

export function * trackEvent ({ name, payload }) {
  const user = store.getState().user
  if (!user.obj) return
  firebase.database().ref('tracking/' + user.obj.uid).push().set({
    name, payload, timestamp: Date.now()
  })
  firebase.analytics().logEvent(name, payload)
}

export function * userWelcomed () {
  const user = store.getState().user
  firebase.database().ref('users/' + user.obj.uid).update({
    welcomed: true
  })
}

export function * fetchUserLoc () {
  const ASPECT_RATIO = Metrics.screenWidth / Metrics.screenHeight
  const LATITUDE_DELTA = 0.0922
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
  navigator.geolocation.getCurrentPosition(
    (position) => {
      var loc = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      store.dispatch(UserActions.updateUserLoc(loc))
    },
    (error) => window.alert(error.message),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 180000 }
   )
}
