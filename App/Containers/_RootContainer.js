import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { Metrics } from '../Themes/'
import UserActions from '../Redux/UserRedux'

const ASPECT_RATIO = Metrics.screenWidth / Metrics.screenHeight
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class RootContainer extends Component {
  componentDidMount () {
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
      (error) => window.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 180000 }
     )
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateUserLoc: (loc) => dispatch(UserActions.updateUserLoc(loc))
})

export default connect(null, mapDispatchToProps)(RootContainer)
