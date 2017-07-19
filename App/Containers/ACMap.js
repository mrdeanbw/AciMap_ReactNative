import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import mapStyle from '../Themes/MapStyle'
import UiActions from '../Redux/UiRedux'
import NearbyActions from '../Redux/NearbyRedux'
import DriverMarker from '../Components/DriverMarker'
import DriverCallout from '../Components/DriverCallout'
import DriverProfile from '../Components/DriverProfile'

class ACMap extends Component {
  clickProfile (key) {
    this.props.setActiveDriver(key)
    this.props.toggleDriverProfile()
  }
  render () {
    return (
      <View style={styles.container}>
        { this.props.loc
          ? <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={this.props.loc}>
            {this.props.nearbyDrivers.map(driver => {
              return (
                <MapView.Marker
                  key={driver.key}
                  coordinate={{latitude: driver.loc[0], longitude: driver.loc[1]}}
                  title={driver.key}
                  description={'Test Description'}
                  >
                  <DriverMarker {...driver} color={'green'} />
                  <MapView.Callout tooltip onPress={() => this.clickProfile(driver.key)}>
                    <DriverCallout {...driver} />
                  </MapView.Callout>
                </MapView.Marker>
              )
            })}
          </MapView>
          : <Text>Waiting for location...</Text>
        }
        <DriverProfile />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

const mapStateToProps = (state) => ({
  loc: state.user.loc,
  nearbyDrivers: state.nearby.drivers || []
})

const mapDispatchToProps = (dispatch) => ({
  setActiveDriver: (key) => dispatch(NearbyActions.setActiveDriver(key)),
  toggleDriverProfile: () => dispatch(UiActions.toggleDriverProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(ACMap)
