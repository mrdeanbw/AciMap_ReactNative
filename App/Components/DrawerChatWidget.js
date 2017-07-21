import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Fonts, Colors } from '../Themes/'

class DrawerChatWidget extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Chats:</Text>
        {this.props.rooms.map(room => {
          return (
            <TouchableOpacity
              style={{ paddingHorizontal: 20 }}
              onPress={() => window.alert(room.user.photo)}
              key={room.roomKey}
            >
              <Text style={styles.text}>{room.user.name}</Text>
            </TouchableOpacity>
          )
        })}        
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

const mapStateToProps = (state) => ({
  rooms: state.chat.rooms
})

export default connect(mapStateToProps)(DrawerChatWidget)
