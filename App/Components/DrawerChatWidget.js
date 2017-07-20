import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Fonts, Colors, Metrics } from '../Themes/'

class DrawerChatWidget extends Component {
  render() {
    return (
    	<View style={styles.container}>
	      <TouchableOpacity
	        style={{ paddingHorizontal: 20 }}
	        onPress={() => window.alert('woah!')}
	      >
	        <Text style={styles.text}>Chats:</Text>
	      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40
  },
  text: {
    fontFamily: Fonts.type.base,
    color: Colors.snow
  }
})

export default DrawerChatWidget