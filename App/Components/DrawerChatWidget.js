import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Fonts, Colors } from '../Themes/'
import ChatActions from '../Redux/ChatRedux'
import _ from 'lodash'

class DrawerChatWidget extends Component {
  state = {
    arr: []
  }

  _selectChat (roomKey) {
    this.props.setActiveChatRoom(roomKey)
    this.props.navigation.navigate('ChatScreen')
  }

  componentWillUpdate () {
    if (this.state.arr.length === 0) {
      this.setState({
        arr: _.values(this.props.rooms)
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Chats:</Text>
        {this.state.arr.map(room => {
          return (
            <TouchableOpacity
              style={{ paddingHorizontal: 20 }}
              onPress={() => this._selectChat(room.roomKey)}
              key={'a4g4gaggdfg'}
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
  roomKey: state.chat.roomKey,
  rooms: state.chat.rooms
})

const mapDispatchToProps = (dispatch) => ({
  setActiveChatRoom: (roomKey) => dispatch(ChatActions.setActiveChatRoom(roomKey))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerChatWidget)
