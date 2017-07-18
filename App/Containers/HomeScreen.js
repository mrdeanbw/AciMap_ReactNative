import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Metrics, Colors } from '../Themes/'
import ACMap from '../Components/ACMap'
import LoginWidget from '../Components/LoginWidget'
import RiderWidget from '../Components/RiderWidget'
import DriverWidget from '../Components/DriverWidget'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Arcade City',
    headerTintColor: 'white'
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={{ flex: 1, paddingBottom: '10%', backgroundColor: Colors.acnavy }}>
        <ACMap />
        <View style={{position: 'absolute', bottom: 0, alignItems: 'center', width: Metrics.screenWidth}}>
          { !this.props.user ? <LoginWidget /> : <View /> }
          { this.props.user && !this.props.driver ? <RiderWidget navigate={navigate} /> : <View /> }
          { this.props.user && this.props.driver ? <DriverWidget /> : <View /> }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.obj || null,
  driver: state.driver.formData || null
})

export default connect(mapStateToProps, null)(HomeScreen)
