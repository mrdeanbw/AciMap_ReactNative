import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'
import { Fonts, Colors } from '../Themes/'
import DrawerChatWidget from './DrawerChatWidget'

class DrawerContent extends Component {
  render () {
    const { navigation } = this.props // routes,
    // console.tron.log(this.props)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.text}>City Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() => navigation.navigate('DriverScreen')}
        >
          <Text style={styles.text}>Drive for Arcade City</Text>
        </TouchableOpacity>

        <DrawerChatWidget />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: Colors.acnavy,
    flex: 1
  },
  text: {
    fontFamily: Fonts.type.base,
    color: Colors.snow,
    marginVertical: 10,
    fontSize: Fonts.size.h5
  }
})

export default DrawerContent
