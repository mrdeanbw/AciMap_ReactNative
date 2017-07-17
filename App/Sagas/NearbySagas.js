import { call, put } from 'redux-saga/effects'
import NearbyActions from '../Redux/NearbyRedux'
import firebase from '../Lib/firebase'
import { store } from '../Containers/App'
const geofire = require('geofire');

export function * findNearbyDrivers (api, action) {
	const { user, loc } = action

  var gloc = [loc.latitude, loc.longitude]

  const geofireRef = new geofire(firebase.database().ref('geofire'))

  // Create a GeoQuery centered at userLoc
  var geoQuery = geofireRef.query({
    center: gloc,
    radius: 100
  });

  // Attach event callbacks to the GeoQuery. 
	var onReadyRegistration = geoQuery.on("ready", function() {
	  console.tron.log("GeoQuery has loaded and fired all other events for initial data");
	});

	var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, loc, distance) {
	  console.tron.log(key + " entered query at " + loc + " (" + distance + " km from center)");
	  store.dispatch(NearbyActions.updateDriverLoc(key, loc, distance))
	});

	var onKeyExitedRegistration = geoQuery.on("key_exited", function(key, loc, distance) {
	  console.tron.log(key + " exited query to " + loc + " (" + distance + " km from center)");
	  store.dispatch(NearbyActions.updateDriverLoc(key, loc, distance))
	});

	var onKeyMovedRegistration = geoQuery.on("key_moved", function(key, loc, distance) {
	  console.tron.log(key + " moved within query to " + loc + " (" + distance + " km from center)");
	  store.dispatch(NearbyActions.updateDriverLoc(key, loc, distance))
	});

	geofireRef.set("tester2", [37.728433, -122.102])
	geofireRef.set("tester3", [37.721433, -122.102])
	geofireRef.set("tester4", [37.724433, -122.102])
}