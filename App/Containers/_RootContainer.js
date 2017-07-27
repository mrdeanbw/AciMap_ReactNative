import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import UserActions from '../Redux/UserRedux'
import Toast from '../Components/Toast'

class RootContainer extends Component {
  componentWillMount () {
    this.props.fetchUserLoc()
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
        <Toast />
      </View>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchUserLoc: () => dispatch(UserActions.fetchUserLoc())
})

export default connect(null, mapDispatchToProps)(RootContainer)
