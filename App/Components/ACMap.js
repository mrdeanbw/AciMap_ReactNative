import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import mapStyle from '../Themes/MapStyle'
import DriverMarker from '../Components/DriverMarker'
import DriverCallout from '../Components/DriverCallout'

class ACMap extends Component {
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
                  <MapView.Callout tooltip onPress={() => window.alert(driver.key)}>
                    <DriverCallout {...driver} />
                  </MapView.Callout>
                </MapView.Marker>
              )
            })}
          </MapView>
          : <Text>Waiting for location...</Text>
        }
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

export default connect(mapStateToProps, null)(ACMap)
