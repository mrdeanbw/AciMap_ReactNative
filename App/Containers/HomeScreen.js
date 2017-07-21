import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Metrics, Colors } from '../Themes/'
import ACMap from '../Containers/ACMap'
import ACChat from '../Containers/ACChat'
import LoginWidget from '../Components/LoginWidget'
import RiderWidget from '../Components/RiderWidget'
import DriverWidget from '../Components/DriverWidget'
import Icon from 'react-native-vector-icons/FontAwesome'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Arcade City',
    headerTintColor: 'white',
    drawerLabel: 'Home',
    drawerIcon: () => (
      <Icon name='car' size={30} color={Colors.snow} />
    ),
    headerStyle: {
      backgroundColor: Colors.acnavy
    },
    headerTitleStyle: { fontFamily: 'Avenir-Black' },
    headerBackTitleStyle: { fontFamily: 'Avenir-Book' }
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={{ flex: 1, paddingBottom: '10%', backgroundColor: Colors.acnavy }}>
        <ACChat />
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
