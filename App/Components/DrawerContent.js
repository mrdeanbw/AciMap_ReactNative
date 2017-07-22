import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Fonts, Colors } from '../Themes/'
import DrawerChatWidget from './DrawerChatWidget'

class DrawerContent extends Component {
  render () {
    const { navigation } = this.props // routes,
    // console.tron.log(this.props)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <View style={{width: 25, alignItems: 'center' }}>
          <Icon name="map-o" size={20} color="#fff" />
          </View>
          <Text style={styles.text}>City Map</Text>          
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => navigation.navigate('DriverScreen')}
        >
          <View style={{width: 25, alignItems: 'center' }}>
          <Icon name="car" size={20} color="#fff"/>
          </View>
          <Text style={styles.text}>Drive for Arcade City</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => navigation.navigate('DriverScreen')}
        >
          <View style={{width: 25, alignItems: 'center' }}>
          <Icon name="bullhorn" size={20} color="#fff" />
          </View>
          <Text style={styles.text}>Give Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => navigation.navigate('DriverScreen')}
        >
          <View style={{width: 25, alignItems: 'center' }}>
          <Icon name="handshake-o" size={20} color="#fff"/>
          </View>
          <Text style={styles.text}>Connect</Text>
        </TouchableOpacity>

        <DrawerChatWidget navigation={navigation} />
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
    fontSize: Fonts.size.h5,
    marginLeft: 20
  }
})

export default DrawerContent
