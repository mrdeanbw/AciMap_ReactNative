// USERS SAGAS
import { store } from '../../Containers/App'
import firebase from '../../Config/FirebaseConfig'
import UsersActions from '../users/redux'
import * as LocSelectors from '../loc/selectors'
const Geofire = require('geofire')

export function * fetchNearbyDrivers () {
  const loc = LocSelectors.getUserLoc(store.getState())
  const gloc = [loc.latitude, loc.longitude]
  const geofireRef = new Geofire(firebase.database().ref('geofire'))

  var geoQuery = geofireRef.query({
    center: gloc,
    radius: 10000 // tie this to an auth(?) selector, set from userobj..
  })

  geoQuery.on('key_entered', function (key, loc) {
    firebase.database()
      .ref('users/' + key)
      .on('value', (snapshot) => {
        let user = snapshot.val()
        user.loc = loc
        store.dispatch(UsersActions.addUser(key, user))
      })
  })

  geoQuery.on('key_exited', function (key, loc) {
    // store.dispatch(UsersActions.removeUser(key))
    console.tron.log(`geoQuery - key_exited - key ${key}, loc:`)
    console.tron.log(loc)
  })

  geoQuery.on('key_moved', function (key, loc) {
    store.dispatch(UsersActions.updateDriverLoc(key, loc))
  })
}
