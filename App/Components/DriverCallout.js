import React, { Component } from 'react'
import { View, Text } from 'react-native'
import RoundedButton from './RoundedButton'

export default class DriverCallout extends Component {
  render () {
    return (
      <View style={{width: 300}}>
        <RoundedButton
          text='See Profile'
          style={{alignSelf: 'center'}}
        />
      </View>
    )
  }
}
