import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import NearbyActions from '../Redux/NearbyRedux'
import UserActions from '../Redux/UserRedux'
import mapStyle from './mapStyle';
import firebase from '../Lib/firebase'
import { Fonts, Metrics, Colors } from '../Themes/'
import RoundedButton from '../Components/RoundedButton'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const INIT_LATITUDE = 30.2672;
const INIT_LONGITUDE = -97.7431;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loc: null,
      error: null
    };
  }

  componentDidMount() {
    console.tron.log('HomeScreen initialized')
    this._getLocation()
  }

  _getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
        this.setState({
          loc: loc,
          error: null
        });
        console.tron.log("Updated component loc state with user location:")
        console.tron.log(loc)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  // User hit button to login with Facebook.
  _tryLogin() {
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
          console.log(JSON.stringify(currentUser.toJSON()));
          // alert(JSON.stringify(currentUser.toJSON()))
          // Send dat to REDUXgasm 
          this.props.userSuccess(currentUser.toJSON())
        }
      })
      .catch((error) => {
        console.log(`Login fail with error: ${error}`);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, paddingBottom: '10%', backgroundColor: Colors.acnavy }}>
        <View style={styles.container}>
        { this.state.loc ? 
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={this.state.loc}
          />
        : <Text>Waiting for location...</Text>
      }

        </View>
        <View style={{position: 'absolute', bottom: 0, height: 120, alignItems: 'center', width: width}}>
          <RoundedButton
            text='Login'
            onPress={this._tryLogin.bind(this)}
            style={{alignSelf: 'center'}}
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
  findNearbyDrivers: () => dispatch(NearbyActions.findNearbyDrivers()),
  userSuccess: (obj) => dispatch(UserActions.userSuccess(obj))
})

export default connect(null, mapDispatchToProps)(HomeScreen)