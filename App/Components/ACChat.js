import React, { Component } from 'react'
import { View } from 'react-native'
import firebase from '../Config/FirebaseConfig'

export default class ACMap extends Component {
  componentDidMount () {
    console.tron.log('Lets send a message')

    const db = firebase.database()
    const roomKey = '-KpMSK6RN0G33Tf5JDae'
    const now = firebase.database.ServerValue.TIMESTAMP

    db.ref(`messages/${roomKey}`).push({
      text: 'Now here is a message yoyoyogasm.',
      user: {
        _id: 'Fmu6D27WD8ZYecsxt2cu6KuvPH93',
        name: 'Christopher David',
        avatar: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/19149077_872744746215821_3570726456667346281_n.jpg?oh=dc6afd902fca70438d479b66d1e6e917&oe=5A020094'
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
