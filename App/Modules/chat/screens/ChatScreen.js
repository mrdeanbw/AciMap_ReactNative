import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../../../Theme/'
import ChatActions from '../redux'
import * as ChatSelectors from '../selectors'
import * as AuthSelectors from '../../auth/selectors'
import { GiftedChat } from 'react-native-gifted-chat'

class ChatScreen extends Component {
  onSend (messages = []) {
    this.props.sendMessage(this.props.roomKey, this.props.roomUser.uid, messages[0].text)
  }

  render () {
    return (
      this.props.roomUser ? <GiftedChat
        messages={this.props.messages}
        onSend={(messages) => this.onSend(messages)}
        showUserAvatar
        user={{
          _id: this.props.userId
        }}
        style={{marginTop: 200, backgroundColor: Colors.silver}}
      /> : <View />
    )
  }
}

const mapStateToProps = (state) => ({
  userId: AuthSelectors.getUserId(state),
  roomKey: ChatSelectors.getActiveRoomKey(state),
  room: ChatSelectors.getActiveRoom(state),
  roomUser: ChatSelectors.getActiveRoomUser(state),
  messages: ChatSelectors.getActiveMessages(state)
})

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (roomKey, rid, text) => dispatch(ChatActions.sendMessage(roomKey, rid, text))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
