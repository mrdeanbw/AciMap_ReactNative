// LOC SAGAS
import { store } from '../../Setup/App'
import LocActions from './redux'
import { Metrics } from '../../Theme/'

/*
fetchUserLoc
Called from anywhere. Grab the user loc (what re permissions?) and call updateUserLoc action.
*/
export function * fetchUserLoc () {
  const ASPECT_RATIO = Metrics.screenWidth / Metrics.screenHeight
  const LATITUDE_DELTA = 0.0922
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
  navigator.geolocation.getCurrentPosition(
    (position) => {
      var loc = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      store.dispatch(LocActions.updateUserLoc(loc))
    },
    (error) => store.dispatch(LocActions.fetchUserLocError(error.message)),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 180000 }
   )

  this.watchID = navigator.geolocation.watchPosition((position) => {
    if (position) {
      var loc = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      store.dispatch(LocActions.updateUserLoc(loc))
    }
  })

}

export function * fetchUserLocError ({ error }) {
  window.alert(error)
}
