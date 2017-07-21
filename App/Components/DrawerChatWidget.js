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
  constructor (props) {
    super(props)    
  }
  _selectChat (roomKey) {
    console.tron.log('Setting active chat partner to roomKey ' + roomKey)
    this.props.setActiveChatRoom(roomKey)
    this.props.navigation.navigate('ChatScreen')
  }
  componentDidMount () {

  }
  componentWillUpdate () {
    if (this.state.arr.length === 0) {
      console.tron.log('doing this once')
      this.setState({
        arr: _.values(this.props.rooms)
      })
    }
  }
  componentDidUpdate () {
    // console.tron.log('lets try morphing rooms from obj to array')
    // console.tron.log(this.props.rooms)

    // console.tron.log('-----')
    // console.tron.log('-----')
    console.tron.log(this.state.arr)
    this.state.arr.forEach(piece => {
      // console.tron.log('NICE PIECE:::::::::')
      // console.tron.log(piece)
    })

    // console.tron.log('-----')
    // console.tron.log('-----')
    // console.tron.log('-------DIS -------')
    // console.tron.log(this.props.right)
    // console.tron.log('-------DIS -------')
  }
  render () {
    const { navigation } = this.props
    // console.tron.log("here this are is")
    // console.tron.log(this.state.arr)
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
  // right: state.chat.rooms[state.chat.roomKey]
})

const mapDispatchToProps = (dispatch) => ({
  setActiveChatRoom: (roomKey) => dispatch(ChatActions.setActiveChatRoom(roomKey))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerChatWidget)



        // {this.props.rooms.map(room => {
        //   return (
        //     <TouchableOpacity
        //       style={{ paddingHorizontal: 20 }}
        //       onPress={() => this._selectChat(room.roomKey)}
        //       key={room.roomKey}
        //     >
        //       <Text style={styles.text}>{room.user.name}</Text>
        //     </TouchableOpacity>
        //   )
        // })}