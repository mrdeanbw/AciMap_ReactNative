import React, { Component } from 'react'
import { Animated, Easing, View } from 'react-native'
import { Colors } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Loading extends Component {
  state = {
    spinValue: new Animated.Value(0)
  }

  componentDidMount () {
    Animated.loop(
      Animated.timing(
        this.state.spinValue, {
          toValue: this.props.toValue || 1,
          duration: this.props.duration || 2000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ),
      {iterations: 80}
    ).start()
  }

  render () {
    let spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.acnavy}}>
        <Animated.View
          style={{
            height: 80,
            width: 80,
            transform: [{rotate: spin}]
          }}>
          <Icon name='cog' size={80} color='#fff' />
        </Animated.View>
      </View>
    )
  }
}
