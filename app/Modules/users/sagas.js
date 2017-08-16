// USERS SAGAS
import { store } from '../../Setup/App'                   // store so we can fire actions and populate selectors
import firebase from '../../Setup/Config/FirebaseConfig'  // firebase so we can set up listeners for users (here?)
import { fbListenForNewDriver, fbStopListeningForDriver } from './firebase'   // Shove dat listener code elsewhere yoyoyo
import UsersActions from '../users/redux'                 // UsersActions so we can add users from listeners (here?)
import * as LocSelectors from '../loc/selectors'          // LocSelectors so we can get loc to pass to geoquery
const Geofire = require('geofire')                        // Geofire so we can check for nearby drivers

export function * listenForNearbyDrivers () {
  const loc = LocSelectors.getUserLoc(store.getState())   // Get the current user location
  const gloc = [loc.latitude, loc.longitude]              // Format user location for geoquery
  const geofireRef = new Geofire(firebase.database().ref('geofire'))    // Initialize Geofire and get firebase db ref
  let initialKeyFetchDone = false                         // Track when the partial fetch (geofire keys only) is done

  var geoQuery = geofireRef.query({                       // Create a 20-mile geoquery centered at user loc
    center: gloc,
    radius: 32.1869 // 20 miles                           // TODO: Tie this to an auth(?) selector, set from userobj..
  })

  geoQuery.on('ready', function () {                      // When initial geoquery fetch is done...
    initialKeyFetchDone = true
  })

  geoQuery.on('key_entered', function (key, loc) {
    fbListenForNewDriver(key, loc, initialKeyFetchDone)      // Set up firebase listener for this driver
  })

  geoQuery.on('key_exited', function (key) {
    store.dispatch(UsersActions.removeUser(key))
    fbStopListeningForDriver(key)
  })

  geoQuery.on('key_moved', function (key, loc) {
    store.dispatch(UsersActions.updateDriverLoc(key, loc))
  })
}
