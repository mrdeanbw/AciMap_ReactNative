import React, { Component } from 'react'
import { Text, View } from 'react-native'
import RoundedButton from '../../ui/components/RoundedButton'

export default class DriverCallout extends Component {
  componentWillMount () {
    console.tron.log(this.props)
  }
  render () {
    return (
      <View style={{width: 200}}>
        <Text style={{color: 'white'}}>{this.props.user.name}</Text>
        <Text style={{color: 'white'}}>{this.props.user.driver.vehicle}</Text>
        <Text style={{color: 'white'}}>{this.props.user.driver.self}</Text>
        { !this.props.same ? 
          <RoundedButton
            text='Open Chat'
            style={{alignSelf: 'center'}}
          /> : <View />
        }
      </View>
    )
  }
}
