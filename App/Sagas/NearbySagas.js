import NearbyActions from '../Redux/NearbyRedux'
import firebase from '../Config/FirebaseConfig'
import { store } from '../Containers/App'
const Geofire = require('geofire')

export function * findNearbyDrivers (api, action) {
  const { loc } = action
  const gloc = [loc.latitude, loc.longitude]
  const geofireRef = new Geofire(firebase.database().ref('geofire'))

  // Create a GeoQuery centered at userLoc
  var geoQuery = geofireRef.query({
    center: gloc,
    radius: 100
  })

  // Attach event callbacks to the GeoQuery.
  geoQuery.on('ready', function () {
    // All driver beacons have been rendered. Was there something I wanted to do...
    // Look up the driver info of each driver and add to marker
  })

  geoQuery.on('key_entered', function (key, loc, distance) {
    store.dispatch(NearbyActions.updateDriverLoc(key, loc, distance))
  })

  geoQuery.on('key_exited', function (key, loc, distance) {
    store.dispatch(NearbyActions.updateDriverLoc(key, loc, distance))
  })

  geoQuery.on('key_moved', function (key, loc, distance) {
    store.dispatch(NearbyActions.updateDriverLoc(key, loc, distance))
  })
}
