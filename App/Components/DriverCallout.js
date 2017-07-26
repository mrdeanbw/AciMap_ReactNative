import React, { Component } from 'react'
import { Text, View } from 'react-native'
import RoundedButton from './RoundedButton'

export default class DriverCallout extends Component {
  render () {
    return (
      <View style={{width: 200}}>
        <Text style={{color: 'white'}}>{this.props.driver.profile.name}</Text>
        <Text style={{color: 'white'}}>{this.props.driver.profile.driver.vehicle}</Text>
        <Text style={{color: 'white'}}>{this.props.driver.profile.driver.self}</Text>
        <Text style={{color: 'white'}}>Distance: {Math.round(this.props.driver.distance * 10) / 10} km</Text>
        <RoundedButton
          text='Open Chat'
          style={{alignSelf: 'center'}}
        />
      </View>
    )
  }
}
