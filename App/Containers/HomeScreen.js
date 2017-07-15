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
import DriverCallout from '../Components/DriverCallout'

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
      error: null,
      user: null,
      fetchingDrivers: null
    };
  }

  static navigationOptions = {
    title: 'Arcade City',
    headerTintColor: 'white'
  };

  componentDidMount() {
    console.tron.log('HomeScreen initialized')
    this._getLocation()
  }

  _getNearbyDrivers() {
    // Wait until we have both user loc and logged in
    // Only let this run once
    if (!this.state.user) {
      console.tron.log('Trying to fetch nearby drivers but we arent yet logged in')
      return false
    } else if (!this.state.loc) {
      console.tron.log('Trying to fetch nearby drivers but we arent yet logged in')
      return false
    } else if (this.state.fetchingDrivers) {
      console.tron.log('Already fetching drivers. Byebye...')
      return false
    }

    console.tron.log('Okay we have user and loc. Lets check for nearby drivers...')
    this.setState({ // Hm
      fetchingDrivers: true
    })

    this.props.findNearbyDrivers(this.state.user, this.state.loc)
    
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
        this._getNearbyDrivers()
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  // User hit button to login with Facebook.
  _tryLogin() {
    this.setState({
      fetchingDrivers: false
    })
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
          this.setState({
            user: currentUser.toJSON()
          })
          console.tron.log("Updated user info in component state. State is now")
          console.tron.log(this.state)
          this.props.userSuccess(currentUser.toJSON())
          this._getNearbyDrivers()
        }
      })
      .catch((error) => {
        console.log(`Login fail with error: ${error}`);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, paddingBottom: '10%', backgroundColor: Colors.acnavy }}>
        <View style={styles.container}>
        { this.state.loc ? 
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={this.state.loc}>
            {this.props.nearbyDrivers.map(driver => {
              // console.tron.log(driver)
              return (
              <MapView.Marker
                key={driver.key}
                coordinate={{latitude: driver.location[0], longitude: driver.location[1]}}
                title={"Test Name"}
                description={"Test Description"}
                onCalloutPress={ () => alert('touch') }
                >
                <MapView.Callout tooltip={true} onPress={ () => alert('o?' ) }> 
                  <DriverCallout />
                </MapView.Callout>
              </MapView.Marker>
              

            )})}
          </MapView>
        : <Text>Waiting for location...</Text>
      }

        </View>
        <View style={{position: 'absolute', bottom: 0, height: 100, alignItems: 'center', width: width}}>
        { !this.state.user ? 
          <RoundedButton
            text='Login'
            onPress={this._tryLogin.bind(this)}
            style={{alignSelf: 'center'}}
          />
          : 
          <RoundedButton
            text='Sign up to Drive'
            onPress={() => navigate('DriverSignupScreen')}
            style={{alignSelf: 'center'}}
          /> 
        }

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

const mapStateToProps = (state) => ({ nearbyDrivers: state.nearby.drivers || [] })

const mapDispatchToProps = (dispatch) => ({
  findNearbyDrivers: (user, loc) => dispatch(NearbyActions.findNearbyDrivers(user, loc)),
  userSuccess: (obj) => dispatch(UserActions.userSuccess(obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)