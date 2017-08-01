import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Colors } from '../../../Theme/'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Loading extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.acnavy}}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
}
