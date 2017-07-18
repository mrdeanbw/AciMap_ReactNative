import React, { Component } from 'react'
import { View } from 'react-native'
import firebase from '../Config/FirebaseConfig'

export default class ACMap extends Component {
  componentDidMount () {
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
