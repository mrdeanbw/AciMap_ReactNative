import React, { Component } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome'

// Marker is yellow for noobs, light green for new official drivers, darker is better/cooler

export default class DriverMarker extends Component {
  constructor (props) {
    super(props)
    this.props.color === 'green' ? this.iconColor = '#16AB74' : this.iconColor = '#F5E949'
  }
  render () {
    return (
      <Icon name='car' size={30} color={this.iconColor} />
    )
  }
}
