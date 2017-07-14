import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import NearbyActions from '../Redux/NearbyRedux'
import mapStyle from './mapStyle';
import firebase from '../Lib/firebase'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 30.2672;
const LONGITUDE = -97.7431;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class LaunchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  tryLogin() {
    LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.resolve('cancelled');
        }
        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
        // get the access token
        return AccessToken.getCurrentAccessToken();
      })
      .then(data => {
        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        // login with credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then((currentUser) => {
        if (currentUser === 'cancelled') {
          console.log('Login cancelled');
        } else {
          // now signed in
          console.warn(JSON.stringify(currentUser.toJSON()));
        }
      })
      .catch((error) => {
        console.log(`Login fail with error: ${error}`);
      });
  }
  componentDidMount() {
    console.log('Hey we mounted')
    this.tryLogin()
    this.props.findNearbyDrivers()

    firebase.database().ref('users').push()
      .set({
        driver: {
          loc: [31.1613, -97.1891]
        }
      })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
     ...StyleSheet.absoluteFillObject,
  },
});

const mapDispatchToProps = (dispatch) => ({
  findNearbyDrivers: () => dispatch(NearbyActions.findNearbyDrivers())
})

export default connect(null, mapDispatchToProps)(LaunchScreen)