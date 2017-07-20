import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Fonts, Colors, Metrics } from '../Themes/'
import DrawerChatWidget from './DrawerChatWidget'

class DrawerContent extends Component {
  render() {
    const { routes, navigation } = this.props
    console.tron.log(this.props)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() => window.alert('woah!')}
        >
          <Text style={styles.text} onPress={() => navigation.navigate('HomeScreen')}>City Home</Text>
          <Text style={styles.text} onPress={() => navigation.navigate('DriverScreen')}>Drive for Arcade City</Text>
        </TouchableOpacity>
        <DrawerChatWidget />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: Colors.acturq,
    flex: 1
  },
  text: {
    fontFamily: Fonts.type.base,
    color: Colors.snow,
    marginVertical: 10,
    fontSize: Fonts.size.h5
  }
})

export default DrawerContent;
