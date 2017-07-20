import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import firebase from '../Config/FirebaseConfig'
import ChatActions from '../Redux/ChatRedux'

class ACChat extends Component {
  componentDidMount () {
    this.props.initializeChat()
  }

  sendMessage () {
    console.tron.log('Lets send a message')

    const db = firebase.database()
    const roomKey = '-KpMSK6RN0G33Tf5JDae'
    const now = firebase.database.ServerValue.TIMESTAMP

    db.ref(`messages/${roomKey}`).push({
      text: 'I disagree',
      user: {
        _id: 'KfeoOKzIe9eqVXEL2JwAiMtnwvs2',
        name: 'Other Christopher David',
        avatar: 'https://scontent.xx.fbcdn.net/v/t1.0-1/s100x100/10354686_10150004552801856_220367501106153455_n.jpg?oh=b607b68bceb725319743396142d0768d&oe=5A040E73'
      },
      createdAt: now
    })
  }

  registerRoom () {
    console.tron.log('Lets play with chat.')
    const db = firebase.database()
    const roomKey = db.ref(`rooms`).push().key
    const update = {}
    console.tron.log(roomKey)

    // Temporarily hardcode user ids
    const myid = 'Fmu6D27WD8ZYecsxt2cu6KuvPH93'
    const friendid = 'KfeoOKzIe9eqVXEL2JwAiMtnwvs2'

    /**
     * update room
     */
    update[`rooms/${roomKey}/${myid}`] = true  // me.uid
    update[`rooms/${roomKey}/${friendid}`] = true // friend.uid

    /**
     * update user
     */
    update[`users/${myid}/rooms/${roomKey}`] = true
    update[`users/${friendid}/rooms/${roomKey}`] = true

    db.ref().update(update).catch(error => console.log('registerRoomError', error))
  }

  render () {
    return (
      <View />
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  initializeChat: () => dispatch(ChatActions.initializeChat())
})

export default connect(mapStateToProps, mapDispatchToProps)(ACChat)
