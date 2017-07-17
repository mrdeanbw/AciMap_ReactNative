import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import DriverActions from '../Redux/DriverRedux'
import { Metrics, Colors } from '../Themes/'
import LoginWidget from '../Components/LoginWidget'
import RiderWidget from '../Components/RiderWidget'
import DriverWidget from '../Components/DriverWidget'
import ACMap from '../Components/ACMap'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Arcade City',
    headerTintColor: 'white'
  }

  render () {
    return (
      <View style={{ flex: 1, paddingBottom: '10%', backgroundColor: Colors.acnavy }}>
        <ACMap />
        <View style={{position: 'absolute', bottom: 0, alignItems: 'center', width: Metrics.screenWidth}}>
          { !this.props.user ? <LoginWidget /> : <View /> }
          { this.props.user && !this.props.driver ? <RiderWidget /> : <View /> }
          { this.props.user && this.props.driver ? <DriverWidget /> : <View /> }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.obj || null,
  driver: state.driver.formData || null,
  loc: state.user.loc,
  nearbyDrivers: state.nearby.drivers || []
})

const mapDispatchToProps = (dispatch) => ({
  addDriverBeacon: (user, loc, driver) => dispatch(DriverActions.addDriverBeacon(user, loc, driver))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
