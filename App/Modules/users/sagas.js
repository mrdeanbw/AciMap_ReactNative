// USERS SAGAS
import { store } from '../../Setup/App'
import firebase from '../../Setup/Config/FirebaseConfig'
import UsersActions from '../users/redux'
import * as LocSelectors from '../loc/selectors'
import _ from 'lodash'
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
    console.tron.log(`Key ${key} entered geoQuery!`)
    firebase.database()
      .ref('users/' + key)
      .on('value', (snapshot) => {
        const existingUserIds = UsersSelectors.getUserIds(store.getState())
        let user = snapshot.val()
        user.loc = loc
        if (!_.includes(existingUserIds, key)) {
          store.dispatch(UsersActions.addUser(key, user))
        } else {
          console.tron.log('this bro ' + key + ' already in the thing so no to dat')
        }
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
