import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Colors } from '../Theme/'
import ChatActions from '../Redux/ChatRedux'
import { GiftedChat } from 'react-native-gifted-chat'

class ChatScreen extends Component {
  componentDidUpdate () {
    console.tron.log(this.props)
  }

  onSend (messages = []) {
    this.props.messageSent(this.props.roomKey, this.props.room.user.uid, messages[0].text) // Fmu6D27WD8ZYecsxt2cu6KuvPH93
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
  roomKey: state.chat.roomKey,
  room: state.chat.rooms[state.chat.roomKey],
  messages: state.chat.rooms[state.chat.roomKey].messages || []
})

const mapDispatchToProps = (dispatch) => ({
  messageSent: (roomKey, rid, text) => dispatch(ChatActions.messageSent(roomKey, rid, text))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
