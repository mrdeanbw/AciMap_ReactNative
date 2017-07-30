import React, { Component } from 'react'
import { Text, View } from 'react-native'
import RoundedButton from './RoundedButton'

export default class DriverCallout extends Component {
  render () {
    return (
      <View style={{width: 200}}>
        <Text style={{color: 'white'}}>{this.props.user.name}</Text>
        <Text style={{color: 'white'}}>{this.props.user.driver.vehicle}</Text>
        <Text style={{color: 'white'}}>{this.props.user.driver.self}</Text>
        <RoundedButton
          text='Open Chat'
          style={{alignSelf: 'center'}}
        />
      </View>
    )
  }
}