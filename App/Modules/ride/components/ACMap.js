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
import * as AuthSelectors from '../../auth/selectors'
import * as UsersSelectors from '../../users/selectors'

class ACMap extends Component {

  componentDidUpdate () {
    console.tron.log('ACMap componentDidUpdate, props:')
    console.tron.log(this.props)
  }

  clickProfile (uid) {
    if (uid === this.props.userId) {
      alert('You clicked yourself')
    } else {
      this.props.fetchOrRegisterRoom(uid)
    }    
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
            initialRegion={this.props.loc}>
            {Object.keys(drivers).map((key) => {
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
                    <DriverCallout user={driver} same={key === this.props.userId} />
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
  nearbyDrivers: UsersSelectors.getNearbyDrivers(state),
  users: UsersSelectors.getUsersById(state),
  userId: AuthSelectors.getUserId(state)
})

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (route) => dispatch(NavigationActions.navigate({ routeName: route })),
  fetchOrRegisterRoom: (uid) => dispatch(ChatActions.fetchOrRegisterRoom(uid))
})

export default connect(mapStateToProps, mapDispatchToProps)(ACMap)
