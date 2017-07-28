import { NavigationActions } from 'react-navigation'
import firebase from '../Config/FirebaseConfig'
import { store } from '../Containers/App'
import AuthActions from '../_auth/redux'
import UiActions from '../Redux/UiRedux'
import NearbyActions from '../Redux/NearbyRedux'
const Geofire = require('geofire')

export function * addDriverBeacon ({ user, loc, driver }) {
  const geofireRef = new Geofire(firebase.database().ref('geofire'))

  var lat = loc.latitude
  var lon = loc.longitude
  var uid = user.uid

  geofireRef.set(uid, [lat, lon]).then(function () {
    console.tron.log(uid + ': successfully set position to [' + lat + ',' + lon + ']')
    store.dispatch(AuthActions.trackEvent('addDriverBeacon', loc))
    store.dispatch(NearbyActions.findNearbyDrivers(loc)) // do this again -- uh here not signupsuccess or waht?
  })
}

export function * driverSignupSuccess (action) {
  var user = store.getState().user
  store.dispatch(UiActions.setClass('driver'))
  store.dispatch(NavigationActions.navigate({ routeName: 'HomeScreen' }))
  store.dispatch(NearbyActions.findNearbyDrivers(user.loc)) // do this again.     user,
}
