import React, { Component } from 'react'
import { View } from 'react-native'
import RoundedButton from './RoundedButton'

export default class DriverCallout extends Component {
  componentDidUpdate () {
    // console.tron.log(this.props)
  }
  render () {
    return (
      <View style={{width: 200}}>
        <RoundedButton
          text='See Profile'
          style={{alignSelf: 'center'}}
        />
      </View>
    )
  }
}
