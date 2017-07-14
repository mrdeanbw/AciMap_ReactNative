import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
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
  componentDidMount() {
    console.log('Hey we mounted')
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