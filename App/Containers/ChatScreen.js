import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Metrics, Colors } from '../Themes/'

class ChatScreen extends Component {
  static navigationOptions = {
    title: 'Chat with person',
    headerTintColor: 'white',
    drawerLabel: 'Home',
    drawerIcon: () => (
      <Icon name='car' size={30} color={Colors.snow} />
    ),
    headerStyle: {
      backgroundColor: Colors.acnavy
    },
    headerTitleStyle: { fontFamily: 'Avenir-Black' },
    headerBackTitleStyle: { fontFamily: 'Avenir-Book' }
  }

  componentDidUpdate () {
    console.tron.log('-------CHATSCREEN UPDATE -------')
    console.tron.log(this.props.room)
    console.tron.log('-------CHATSCREEN UPDATE -------')
  }

  componentDidMount () {
    console.tron.log('-------CHATSCREEN MOUNT -------')
    console.tron.log(this.props.room)
    console.tron.log('-------CHATSCREEN MOUNT -------')
  }

  render () {
    const { navigate } = this.props.navigation
    console.tron.log('here dat room:')
    console.tron.log(this.props.room)
    return (
      <View style={{ flex: 1, paddingBottom: '10%', backgroundColor: Colors.acnavy }}>
      	<Text style={{ color: 'white' }}>Chatting with {this.props.room.user.name}</Text>
        {this.props.room.messages ? this.props.room.messages.map(message => {
          return (
            <Text style={{ color: 'white' }} key={message._id}>{message.text}</Text>
          )
        }) : <View />}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  roomKey: state.chat.roomKey,
  room: state.chat.rooms[state.chat.roomKey]
})

export default connect(mapStateToProps)(ChatScreen)