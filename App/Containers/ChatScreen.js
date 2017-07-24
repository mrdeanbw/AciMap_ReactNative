import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Colors } from '../Themes/'
import ChatActions from '../Redux/ChatRedux'
import { GiftedChat } from 'react-native-gifted-chat'

class ChatScreen extends Component {

  onSend (messages = []) {
    this.props.messageSent('-KpMSK6RN0G33Tf5JDae', this.props.room.user.uid, messages[0].text) // Fmu6D27WD8ZYecsxt2cu6KuvPH93
  }

  render () {
    return (
      <GiftedChat
        messages={this.props.room.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1
        }}
        style={{marginTop: 200, backgroundColor: Colors.silver}}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  roomKey: state.chat.roomKey,
  room: state.chat.rooms[state.chat.roomKey]
})

const mapDispatchToProps = (dispatch) => ({
  messageSent: (roomKey, rid, text) => dispatch(ChatActions.messageSent(roomKey, rid, text))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
