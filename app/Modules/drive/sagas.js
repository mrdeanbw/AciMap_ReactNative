// DRIVE SAGAS
import { store } from '../../Setup/App'
import firebase from '../../Setup/Config/FirebaseConfig'
import { NavigationActions } from 'react-navigation'
import DriveActions from './redux'
import AuthActions from '../auth/redux'
import * as AuthSelectors from '../auth/selectors'
import * as LocSelectors from '../loc/selectors'
const Geofire = require('geofire')

export function * listenForNearbyRequests () {
  const loc = LocSelectors.getUserLoc(store.getState())   // Get the current user location
  const gloc = [loc.latitude, loc.longitude]              // Format user location for geoquery
  const geofireRef = new Geofire(firebase.database().ref('geofire_requests'))    // Initialize Geofire and get firebase db ref
  let initialKeyFetchDone = false                         // Track when the partial fetch (geofire keys only) is done

  var geoQuery = geofireRef.query({                       // Create a 20-mile geoquery centered at user loc
    center: gloc,
    radius: 32.1869 // 20 miles                           // TODO: Tie this to an auth(?) selector, set from userobj..
  })

  geoQuery.on('ready', function () {                      // When initial geoquery fetch is done...
    initialKeyFetchDone = true
    console.tron.log('listenForNearbyRequests geoQuery ready!')
  })

  geoQuery.on('key_entered', function (key, loc) {
    console.tron.display({
      name: 'Request in area!',
      value: { key, loc },
      preview: 'Key: ' + key,
      important: true
    })
    fbListenForNewRequest(key, loc, initialKeyFetchDone)      // Set up firebase listener for this driver
  })

  geoQuery.on('key_exited', function (key) {
    store.dispatch(RequestActions.removeRequest(key))
    fbStopListeningForRequest(key)
  })
}

export function * driverSignupSubmit ({ formData }) {
  const user = AuthSelectors.getUser(store.getState())
  firebase.database().ref('users/' + user.uid).update({
    driver: {
      vehicle: formData.describeYourVehicle,
      self: formData.describeYourself
    }
  })
  .then(response => {
    if (response.status === 'success') {
      store.dispatch(DriveActions.driverSignupSuccess())
    } else {
      window.alert('Error, try again')
    }
  })
}

export function * driverSignupSuccess (action) {
  store.dispatch(AuthActions.setUserClass('driver'))
  store.dispatch(AuthActions.setWelcomed(true))
  store.dispatch(NavigationActions.navigate({ routeName: 'HomeScreen' }))
}

export function * addDriverBeacon () {
  const geofireRef = new Geofire(firebase.database().ref('geofire'))
  const state = store.getState()
  const user = AuthSelectors.getUser(state)
  const loc = LocSelectors.getUserLoc(state)
  const uid = user.uid
  const lat = loc.latitude
  const lon = loc.longitude

  geofireRef.set(uid, [lat, lon]).then(function () {
    console.tron.log(uid + ': successfully set position to [' + lat + ',' + lon + ']')
    store.dispatch(AuthActions.trackEvent('addDriverBeacon', loc))
  })
}

export function * removeDriverBeacon () {
  const geofireRef = new Geofire(firebase.database().ref('geofire'))
  const state = store.getState()
  const user = AuthSelectors.getUser(state)
  const uid = user.uid

  geofireRef.remove(uid)
  console.tron.log('Removed driver beacon for uid ' + uid)
}
