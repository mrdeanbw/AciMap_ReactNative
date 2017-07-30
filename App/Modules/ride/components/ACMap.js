import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import mapStyle from '../../../Theme/MapStyle'
import { Colors } from '../../../Theme/'
import { NavigationActions } from 'react-navigation'
import ChatActions from '../../chat/redux'
import DriverMarker from '../../drive/components/DriverMarker'
import DriverCallout from '../../drive/components/DriverCallout'
import * as LocSelectors from '../../loc/selectors'
import * as UsersSelectors from '../../users/selectors'

class ACMap extends Component {
  clickProfile (uid) {
    this.props.fetchOrRegisterRoom(uid)
  }
  render () {
    let drivers = this.props.nearbyDrivers
    return (
      <View style={styles.container}>
        { this.props.loc
          ? <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={this.props.loc}
            onMarkerPress={e => window.alert(e.nativeEvent.id)}>
            {Object.keys(drivers).map(function (key) {
              var driver = drivers[key]
              return (
                <MapView.Marker
                  key={key}
                  identifier={key}
                  coordinate={{latitude: driver.loc[0], longitude: driver.loc[1]}}
                  title={key}
                  description={'Test Description'}
                  >
                  <DriverMarker color={'green'} />
                  <MapView.Callout tooltip onPress={() => this.clickProfile(key)}>
                    <DriverCallout user={driver} />
                  </MapView.Callout>
                </MapView.Marker>
              )
            })}
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
  loc: LocSelectors.getUserLoc(state),
  nearbyDrivers: UsersSelectors.getNearbyDrivers(state)
})

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (route) => dispatch(NavigationActions.navigate({ routeName: route })),
  fetchOrRegisterRoom: (uid) => dispatch(ChatActions.fetchOrRegisterRoom(uid))
})

export default connect(mapStateToProps, mapDispatchToProps)(ACMap)
