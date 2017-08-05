// LOC SAGAS
import { Platform, PermissionsAndroid } from 'react-native'
import { store } from '../../Setup/App'
import LocActions from './redux'
import { Metrics } from '../../Theme/'

/*
fetchUserLoc
Called from anywhere. Grab the user loc (what re permissions?) and call updateUserLoc action.
*/
export function * fetchUserLoc () {
  if (Platform.OS === 'android') {
    grabPermissionsAndroid()
  } else {
    actuallyFetchUserLoc()
  }
}

async function grabPermissionsAndroid () {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location needed',
        'message': 'Arcade City needs your location to show drivers near you'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      actuallyFetchUserLoc()
    } else {
      window.alert('Location required to use app')
    }
  } catch (err) {
    console.warn(err)
  }
}

function actuallyFetchUserLoc () {
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
  window.alert('Location needed to use app. Error: "' + error + '"')
}
