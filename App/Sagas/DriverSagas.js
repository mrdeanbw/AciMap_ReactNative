import firebase from '../Config/FirebaseConfig'
import { store } from '../Containers/App'
import UserActions from '../Redux/UserRedux'
const Geofire = require('geofire')

export function * addDriverBeacon (api, { user, loc, driver }) {
  const geofireRef = new Geofire(firebase.database().ref('geofire'))

  var lat = loc.latitude
  var lon = loc.longitude
  var uid = user.uid

  geofireRef.set(uid, [lat, lon]).then(function () {
    console.tron.log(uid + ': successfully set position to [' + lat + ',' + lon + ']')
    store.dispatch(UserActions.trackEvent('addDriverBeacon', loc))
  })
}
