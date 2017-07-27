import NearbyActions from '../Redux/NearbyRedux'
import firebase from '../Config/FirebaseConfig'
import { store } from '../Containers/App'
const Geofire = require('geofire')

export function * findNearbyDrivers ({ loc }) {
  const gloc = [loc.latitude, loc.longitude]
  const geofireRef = new Geofire(firebase.database().ref('geofire'))

  var geoQuery = geofireRef.query({
    center: gloc,
    radius: 10000
  })

  geoQuery.on('ready', function () {
    // Loop through keys of nearby drivers, grab driver profile info from Firebase
    var drivers = store.getState().nearby.drivers
    drivers.forEach(function (driver) {
      firebase.database()
        .ref('users/' + driver.key)
        .on('value', (snapshot) => {
          const value = snapshot.val()
          store.dispatch(NearbyActions.updateDriverInfo(driver.key, value))
        })
    })
  })

  geoQuery.on('key_entered', function (key, loc, distance) {
    store.dispatch(NearbyActions.updateDriverLoc(key, loc, distance))
    firebase.database()
      .ref('users/' + key)
      .on('value', (snapshot) => {
        const value = snapshot.val()
        store.dispatch(NearbyActions.updateDriverInfo(key, value))
      })
  })

  geoQuery.on('key_exited', function (key, loc, distance) {
    store.dispatch(NearbyActions.updateDriverLoc(key, loc, distance))
  })

  geoQuery.on('key_moved', function (key, loc, distance) {
    store.dispatch(NearbyActions.updateDriverLoc(key, loc, distance))
  })
}
