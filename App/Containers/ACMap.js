import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import mapStyle from '../Themes/MapStyle'
import { Colors } from '../Themes/'
import { NavigationActions } from 'react-navigation'
import ChatActions from '../Redux/ChatRedux'
import NearbyActions from '../Redux/NearbyRedux'
import UiActions from '../Redux/UiRedux'
import DriverMarker from '../Components/DriverMarker'
import DriverCallout from '../Components/DriverCallout'

class ACMap extends Component {
  clickProfile (uid) {
    this.props.fetchOrRegisterRoom(uid)
  }
  render () {
    return (
      <View style={styles.container}>
        { this.props.loc
          ? <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={this.props.loc}
            onMarkerPress={e => this.props.setActiveDriver(e.nativeEvent.id)}>
            {this.props.driverInfoLoaded ? this.props.nearbyDrivers.map(driver => {
              return (
                <MapView.Marker
                  key={driver.key}
                  identifier={driver.key}
                  coordinate={{latitude: driver.loc[0], longitude: driver.loc[1]}}
                  title={driver.key}
                  description={'Test Description'}
                  >
                  <DriverMarker color={'green'} />
                  <MapView.Callout tooltip onPress={() => this.clickProfile(driver.key)}>
                    <DriverCallout driver={driver} />
                  </MapView.Callout>
                </MapView.Marker>
              )
            }) : <View />}
          </MapView>
          : <Text style={{color: 'white'}}>Waiting for location...</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.acnavy
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

const mapStateToProps = (state) => ({
  loc: state.user.loc,
  nearbyDrivers: state.nearby.drivers || [],
  driverInfoLoaded: state.nearby.driversInfoLoaded
})

const mapDispatchToProps = (dispatch) => ({
  setActiveDriver: (key) => dispatch(NearbyActions.setActiveDriver(key)),
  toggleDriverProfile: () => dispatch(UiActions.toggleDriverProfile()),
  navigateTo: (route) => dispatch(NavigationActions.navigate({ routeName: route })),
  fetchOrRegisterRoom: (uid) => dispatch(ChatActions.fetchOrRegisterRoom(uid))
})

export default connect(mapStateToProps, mapDispatchToProps)(ACMap)
