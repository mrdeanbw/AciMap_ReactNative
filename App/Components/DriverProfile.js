import React, { Component } from 'react'
import { Text, Modal } from 'react-native'
import { connect } from 'react-redux'
import UiActions from '../Redux/UiRedux'

class DriverProfile extends Component {
  render () {
    const profile = this.props.activeDriver.profile
    return (
      <Modal
        visible={this.props.driverProfileVisible}
        animationType={'slide'}
        >
        <Text>{profile.name}</Text>
        <Text>{profile.fbid}</Text>
        <Text>{profile.createdAt}</Text>
        <Text>{profile.photo}</Text>
        <Text>{profile.driver.self}</Text>
        <Text>{profile.driver.vehicle}</Text>
        <Text onPress={() => this.props.toggleDriverProfile()} style={{marginTop: 50}}>Close Modal</Text>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  driverProfileVisible: state.ui.profileVisible,
  activeDriver: state.nearby.activeDriver
})

const mapDispatchToProps = (dispatch) => ({
  toggleDriverProfile: () => dispatch(UiActions.toggleDriverProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(DriverProfile)
