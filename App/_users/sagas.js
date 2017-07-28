// USERS SAGAS
import { store } from '../Containers/App'
import firebase from '../Config/FirebaseConfig'
// import UsersActions from '../_users/redux'
import * as LocSelectors from '../_loc/selectors'
const Geofire = require('geofire')

export function * fetchNearbyDrivers () {
  const loc = LocSelectors.getUserLoc(store.getState())
  const gloc = [loc.latitude, loc.longitude]
  const geofireRef = new Geofire(firebase.database().ref('geofire'))

  var geoQuery = geofireRef.query({
    center: gloc,
    radius: 10000 // tie this to an auth(?) selector, set from userobj..
  })

  geoQuery.on('ready', function () {
    // Loop through keys of nearby drivers, grab driver profile info from Firebase
    // var drivers = store.getState().nearby.drivers
    console.tron.log('geoQuery - ready')
    const drivers = []
    drivers.forEach(function (driver) {
      firebase.database()
        .ref('users/' + driver.key)
        .on('value', (snapshot) => {
          // const value = snapshot.val()
          // store.dispatch(NearbyActions.updateDriverInfo(driver.key, value))
        })
    })
  })

  geoQuery.on('key_entered', function (key, loc, distance) {
    console.tron.log(`geoQuery - key_entered - key ${key}, distance ${distance}, loc:`)
    console.tron.log(loc)
    // store.dispatch(NearbyActions.updateDriverLoc(key, loc, distance))
    // firebase.database()
    //   .ref('users/' + key)
    //   .on('value', (snapshot) => {
    //     const value = snapshot.val()
    //     store.dispatch(NearbyActions.updateDriverInfo(key, value))
    //   })
  })

  geoQuery.on('key_exited', function (key, loc, distance) {
    // store.dispatch(NearbyActions.updateDriverLoc(key, loc, distance))
    console.tron.log(`geoQuery - key_exited - key ${key}, distance ${distance}, loc:`)
    console.tron.log(loc)
  })

  geoQuery.on('key_moved', function (key, loc, distance) {
    // store.dispatch(NearbyActions.updateDriverLoc(key, loc, distance))
    console.tron.log(`geoQuery - key_moved - key ${key}, distance ${distance}, loc:`)
    console.tron.log(loc)
  })
}
