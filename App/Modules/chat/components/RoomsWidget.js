import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native'
import { Fonts, Colors, Images } from '../../../Theme/'
import ChatActions from '../redux'
import * as ChatSelectors from '../selectors'
import _ from 'lodash'

class RoomsWidget extends Component {
  _selectChat (roomKey) {
    this.props.setActiveChatroom(roomKey)
    this.props.navigation.navigate('ChatScreen')
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Chats:</Text>
        {this.props.rooms.map(room => {
          if (!room.user) {
            return
          }
          return (
            <TouchableOpacity
              key={room.roomKey}
              onPress={() => this._selectChat(room.roomKey)}
              style={styles.chatButton}>
              <View style={styles.chatImageContainer}>
                <Image source={Images.travis} style={styles.userImage} />
              </View>
              <Text style={styles.userText}>{room.user.name}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 30
  },
  text: {
    fontFamily: Fonts.type.base,
    color: Colors.snow,
    fontSize: Fonts.size.regular,
    paddingVertical: 4
  },
  userText: {
    fontFamily: Fonts.type.base,
    color: Colors.snow,
    fontSize: Fonts.size.regular,
    paddingLeft: 15
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  chatButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  chatImageContainer: {
    width: 44,
    height: 40,
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => ({
  roomKey: ChatSelectors.getActiveRoomKey(state),
  rooms: _.values(ChatSelectors.getAllRooms(state))
})

const mapDispatchToProps = (dispatch) => ({
  setActiveChatroom: (roomKey) => dispatch(ChatActions.setActiveChatroom(roomKey))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomsWidget)

// <Image source={{ uri: room.user.photo }} style={styles.userImage} />
