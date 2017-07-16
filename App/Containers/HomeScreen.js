import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import NearbyActions from '../Redux/NearbyRedux'
import UserActions from '../Redux/UserRedux'
import DriverActions from '../Redux/DriverRedux'
import mapStyle from './mapStyle';
import { Fonts, Metrics, Colors } from '../Themes/'
import LoginButton from '../Components/LoginButton'
import RoundedButton from '../Components/RoundedButton'
import DriverCallout from '../Components/DriverCallout'
import Icon from 'react-native-vector-icons/FontAwesome';

const ASPECT_RATIO = Metrics.screenWidth / Metrics.screenHeight;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Arcade City',
    headerTintColor: 'white'
  };

  componentDidMount() {
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
        this.props.updateUserLoc(loc)
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, paddingBottom: '10%', backgroundColor: Colors.acnavy }}>
        <View style={styles.container}>
        { this.props.loc ? 
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={this.props.loc}>
            {this.props.nearbyDrivers.map(driver => {
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
        <View style={{position: 'absolute', bottom: 0, alignItems: 'center', width: Metrics.screenWidth}}>

        { !this.props.user ? 
          <View style={{alignItems: 'center', backgroundColor: Colors.darktrans, marginBottom: 100, paddingHorizontal: 50, paddingVertical: 30, borderRadius: 15}}>
            <Text style={{paddingBottom: 25, color: 'white', fontFamily: 'Avenir-Book', fontSize: 24}}>Log in to see drivers near you.</Text>
            <LoginButton />
          </View>          
          : <View /> }

        { this.props.user && !this.props.driver ? 
          <View style={{alignItems: 'center', backgroundColor: Colors.darktrans, marginBottom: 20, paddingHorizontal: 50, paddingVertical: 30, borderRadius: 15}}>
            <Text style={{paddingBottom: 25, color: 'white', fontFamily: 'Avenir-Book', fontSize: 24}}>Drivers nearby: {this.props.nearbyDrivers.length}</Text>
            <Text 
              style={{paddingBottom: 25, color: 'white', fontFamily: 'Avenir-Book', fontSize: 16}}
              onPress={() => navigate('DriverSignupScreen')}>
              Sign up to drive
            </Text>
          </View>        
          : <View /> }

        { this.props.user && this.props.driver ? 
          <View style={{alignItems: 'center', backgroundColor: Colors.darktrans, marginBottom: 100, paddingHorizontal: 50, paddingVertical: 30, borderRadius: 15}}>
            <Text style={{paddingBottom: 25, color: 'white', fontFamily: 'Avenir-Book', fontSize: 24}}>Set Driver Beacon</Text>
            <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={() => this.props.addDriverBeacon(this.props.user, this.props.loc, this.props.driver)} style={styles.button}>
              <Text style={styles.buttonText}>&nbsp;Set Driver Beacon</Text>
            </Icon.Button>
          </View>          
          : <View /> }

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

const mapStateToProps = (state) => ({   
  user: state.user.obj || null,
  driver: state.driver.formData || null,
  loc: state.user.loc,
  nearbyDrivers: state.nearby.drivers || []
})

const mapDispatchToProps = (dispatch) => ({  
  userSuccess: (obj) => dispatch(UserActions.userSuccess(obj)),
  updateUserLoc: (loc) => dispatch(UserActions.updateUserLoc(loc)),
  addDriverBeacon: (user, loc, driver) => dispatch(DriverActions.addDriverBeacon(user, loc, driver))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)