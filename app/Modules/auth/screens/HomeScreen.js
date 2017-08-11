import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Metrics, Colors } from '../../../Theme/'
import ACMap from '../../request/components/ACMap'
import RiderWidget from '../../request/components/RiderWidget'
import DriverWidget from '../../drive/components/DriverWidget'
import LocActions from '../../loc/redux'
import UsersActions from '../../users/redux'
import ChatActions from '../../chat/redux'
import AuthActions from '../../auth/redux'
import * as AuthSelectors from '../../auth/selectors'
import { getActiveUserClass } from '../../drive/selectors'

class HomeScreen extends Component {
  componentWillMount () {
    this.props.fetchUserLoc()
    this.props.listenForNearbyDrivers()
    this.props.initializeChat()
    this.props.syncCodepush()
  }

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

const mapDispatchToProps = (dispatch) => ({
  fetchUserLoc: () => dispatch(LocActions.fetchUserLoc()),
  listenForNearbyDrivers: () => dispatch(UsersActions.listenForNearbyDrivers()),
  initializeChat: () => dispatch(ChatActions.initializeChat()),
  syncCodepush: () => dispatch(AuthActions.syncCodepush())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
