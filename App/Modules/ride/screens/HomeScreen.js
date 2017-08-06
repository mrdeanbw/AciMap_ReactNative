import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Metrics, Colors } from '../../../Theme/'
import ACMap from '../components/ACMap'
import RiderWidget from '../components/RiderWidget'
import DriverWidget from '../../drive/components/DriverWidget'
import * as AuthSelectors from '../../auth/selectors'
import { getActiveUserClass } from '../../drive/selectors'

class HomeScreen extends Component {
  render () {
    const { navigation } = this.props.navigation
    return (
      <View style={{ flex: 1, paddingBottom: '10%', backgroundColor: Colors.acnavy }}>
        <ACMap navigation={navigation} />
        <View style={{position: 'absolute', bottom: 0, alignItems: 'center', width: Metrics.screenWidth}}>
          { this.props.activeUserClass === 'driver' ? <DriverWidget /> : <RiderWidget /> }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  user: AuthSelectors.getUser(state),
  activeUserClass: getActiveUserClass(state)
})

export default connect(mapStateToProps, null)(HomeScreen)
