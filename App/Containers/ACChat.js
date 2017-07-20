import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChatActions from '../Redux/ChatRedux'
import { Colors } from '../Themes/'
import { GiftedChat } from 'react-native-gifted-chat'

class ACChat extends Component {
  state = {
    messages: []
  }
  componentDidUpdate () {
    // console.tron.log(this.state.messages)
  }
  onSend (messages = []) {
    // console.tron.log(activeDriver)
    this.props.messageSent('-KpMSK6RN0G33Tf5JDae', this.props.activeDriver.key, messages[0].text) // Fmu6D27WD8ZYecsxt2cu6KuvPH93
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }))
  }
  render () {
    return (
      <GiftedChat
        messages={this.state.messages}
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
  user: state.user,
  activeDriver: state.nearby.activeDriver
})

const mapDispatchToProps = (dispatch) => ({
  messageSent: (roomKey, rid, text) => dispatch(ChatActions.messageSent(roomKey, rid, text))
})

export default connect(mapStateToProps, mapDispatchToProps)(ACChat)
