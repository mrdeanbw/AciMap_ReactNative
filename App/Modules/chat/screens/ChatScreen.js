import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Colors } from '../../../Theme/'
import ChatActions from '../redux'
import * as ChatSelectors from '../selectors'
import { GiftedChat } from 'react-native-gifted-chat'

class ChatScreen extends Component {
  onSend (messages = []) {
    this.props.sendMessage(this.props.roomKey, this.props.room.user.uid, messages[0].text)
  }

  render () {
    return (
      <GiftedChat
        messages={this.props.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: this.props.room.user.uid
        }}
        style={{marginTop: 200, backgroundColor: Colors.silver}}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  roomKey: ChatSelectors.getActiveRoomKey(state),
  room: ChatSelectors.getActiveRoom(state),
  messages: ChatSelectors.getActiveMessages(state)
})

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (roomKey, rid, text) => dispatch(ChatActions.sendMessage(roomKey, rid, text))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
