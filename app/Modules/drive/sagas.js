// DRIVE SAGAS
import { store } from '../../Setup/App'
import firebase from '../../Setup/Config/FirebaseConfig'
import { NavigationActions } from 'react-navigation'
import DriveActions from './redux'
import AuthActions from '../auth/redux'
import * as AuthSelectors from '../auth/selectors'
import * as LocSelectors from '../loc/selectors'
const Geofire = require('geofire')

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
