import { store } from '../App'
import firebase from '../Config/FirebaseConfig'
import * as AuthSelectors from '../../Modules/auth/selectors'
import _ from 'lodash'

export const startDummyData = () => {
  return false
  const user = AuthSelectors.getUser(store.getState())
  for (var i = 0; i < 3; i++) {
    let fakeUser = {
      _id: 'fakeuserid' + _.random(99999),
      avatar: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/19149077_872744746215821_3570726456667346281_n.jpg?oh=dc6afd902fca70438d479b66d1e6e917&oe=5A020094',
      name: 'Christopher Testerman'
    }
    let roomKey = registerRoom(user.uid, fakeUser._id)
    sendTestMessage(roomKey, user.uid, 'hey yo', fakeUser)
  }
}

const sendTestMessage = (roomKey, rid, text, fromUser) => {
  firebase.database()
    .ref('messages/' + roomKey)
    .push()
    .set({
      roomKey: roomKey,
      createdAt: Date.now(),
      text: text,
      user: fromUser,
      rid: rid
    })
}

const registerRoom = (myid, friendid) => {
  const roomKey = firebase.database().ref(`rooms`).push().key
  const update = {}

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

  firebase.database().ref().update(update).catch(error => console.tron.log(error))
  return roomKey
}
