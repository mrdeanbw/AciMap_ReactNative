import React, { Component } from 'react'
import { Text, Modal } from 'react-native'
import { connect } from 'react-redux'
import UserActions from '../Redux/UserRedux'

class DriverProfile extends Component {
  render () {
    return (
      <Modal
        visible={this.props.driverProfileVisible}
        animationType={'slide'}
        >
        <Text onPress={() => this.props.toggleDriverProfile()} style={{marginTop: 50}}>Close Modal</Text>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  driverProfileVisible: state.user.profileVisible
})

const mapDispatchToProps = (dispatch) => ({
  toggleDriverProfile: () => dispatch(UserActions.toggleDriverProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(DriverProfile)
