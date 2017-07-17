import { call, put } from 'redux-saga/effects'
import NearbyActions from '../Redux/NearbyRedux'
import firebase from '../Lib/firebase'
const geofire = require('geofire');

export function * findNearbyDrivers (api, action) {
	const { user, loc } = action


  var gloc = [loc.latitude, loc.longitude]

  const geofireRef = new geofire(firebase.database().ref('geofire'))
  console.tron.log('In findNearbyDrivers saga. We have geofire ref ')
  console.tron.log(geofireRef)

  console.tron.log('Adding Geofire query with loc')
  console.tron.log(gloc)

  // Create a GeoQuery centered at userLoc
  var geoQuery = geofireRef.query({
    center: gloc,
    radius: 100
  });

  // Attach event callbacks to the GeoQuery
  // Tell us when a driver/beacon is within the GeoQuery
  var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {
    console.tron.log(key + " entered the geoquery - " + distance.toFixed(2) + " km from center");
  });

  // const response = yield call(api.findNearbyDrivers, user, loc)
  // yield put(NearbyActions.foundNearbyDrivers(response.data))
}