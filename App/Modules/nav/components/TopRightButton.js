import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as AuthSelectors from '../../auth/selectors'
import DriveActions from '../../drive/redux'
import * as DriveSelectors from '../../drive/selectors'

class TopRightButton extends Component {
  render () {
    return this.props.userClass === 'driver'
    ? (
      <TouchableOpacity
        style={{ paddingHorizontal: 20 }}
        onPress={() => this.props.toggleRiderDriver(this.props.activeUserClass)}
      >
        <Icon name='car' size={20} color={this.props.activeUserClass === 'driver' ? '#16AB74' : '#fff'} />
      </TouchableOpacity>
    ) : <View />
  }
}

const mapStateToProps = (state) => ({
  user: AuthSelectors.getUser(state),
  userClass: AuthSelectors.getUserClass(state),
  activeUserClass: DriveSelectors.getActiveUserClass(state)
})

const mapDispatchToProps = (dispatch) => ({
  toggleRiderDriver: (activeUserClass) => dispatch(DriveActions.toggleRiderDriver(activeUserClass))
})

export default connect(mapStateToProps, mapDispatchToProps)(TopRightButton)
