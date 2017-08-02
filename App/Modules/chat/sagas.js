// CHATROOMS SAGAS
import { store } from '../../Setup/App'
import firebase from '../../Setup/Config/FirebaseConfig'
import { NavigationActions } from 'react-navigation'
import ChatActions from '../chat/redux'
import UiActions from '../ui/redux'
import * as AuthSelectors from '../auth/selectors'
import * as ChatSelectors from '../chat/selectors'
import _ from 'lodash'

/*
initializeChat
- Initialize cloud messaging
- Set up listeners for user room chats
_ Listen for messages to those rooms, send to SET_CHAT_ROOM_MESSAGES when one is received ?
*/

export function * initializeChat () {
  // Select user
  const user = AuthSelectors.getUser(store.getState())
  const uid = user.uid

  // Request permission to notify -- TODO: Handle failure
  firebase.messaging().requestPermissions()

  // Subscribe to receive push notifications via Firebase cloud messaging
  firebase.messaging().subscribeToTopic(uid) // Replace with current userid
  console.tron.log('Subscribed to topic ' + uid)

  // Handle new incoming FCM notification
  firebase.messaging().onMessage((message) => {
    console.tron.log(message)
    const not = message.notification
    // if (not.roomKey !== ChatSelectors.getActiveRoomKey(store.getState())) {
    //   window.alert(not.title + ' - ' + not.body)
    //   store.dispatch(UiActions.sendToast(not.title, not.body, not.icon, 'chat'))
    // }
  })

  // Handle existing FCM notification..?
  firebase.messaging().getInitialNotification()
    .then((notification) => {
      if (notification) {
        console.tron.log('Initial notification:')
        console.tron.log(notification)
      }
    })

  // Listen for list of rooms (and this is not just new rooms)
  firebase.database().ref(`users/${uid}/rooms`).on('value', rooms => {
    rooms.forEach(room => {
      const existingRoomIds = ChatSelectors.getRoomIds(store.getState()) // We won't update rooms that exist in redux - they already have
      if (!_.includes(existingRoomIds, room.key)) {
        store.dispatch(ChatActions.fetchRoomData(room.key))
        firebase.database().ref(`messages/${room.key}`).orderByKey().limitToLast(25).on('value', snap => {
          snap.forEach(message => {
            const existingMessageIds = ChatSelectors.getMessageIds(store.getState())
            if (!_.includes(existingMessageIds, message.key)) {
              const msg = message.val()
              const newMsg = {
                _id: message.key,
                text: msg.text,
                user: msg.user,
                roomKey: msg.roomKey,
                createdAt: msg.createdAt
              }
              store.dispatch(ChatActions.addMessage(newMsg))
              let timeSince = (new Date) - msg.createdAt
              if (timeSince < 3000 && msg.roomKey !== ChatSelectors.getActiveRoomKey(store.getState())) {                
                // window.alert(getUserNameFromRoomKey(msg.roomKey), msg.text)
                window.alert('New message: ' + msg.text)
              }
            }
          })
        })
      }
    })
  })
}

/*
fetchOrRegisterRoom [old]
- Given a user key, fetch roomKey of chat with that user, or register new one and save that one.
- updateRoomuser w dat?!
*/
export function * fetchOrRegisterRoom ({ uid }) {
  // First we see if we share any rooms with this person
  let roomKey = null
  firebase.database().ref(`rooms`).once('value', snap => {
    // I need to loop through snap.val() and see where each obj has this uid as true
    const rooms = snap.val()
    // console.tron.log('val is')
    // console.tron.log(snap.val())
    const keys = _.keys(snap.val())
    const thisRoomKey = keys[0]  // ???????
    // console.tron.log('keys is')
    // console.tron.log(keys)
    // console.tron.log('thisRoomKey is')
    // console.tron.log(thisRoomKey)
    snap.forEach(someid => {
      const dese = _.keys(someid.val())
      // console.tron.log('dese is')
      // console.tron.log(dese)
      dese.forEach(key => {
        // console.tron.log('looping thru dese. key is')
        // console.tron.log(key)
        if (key === uid) {
          // roomKey = thisRoomKey
          console.tron.log('match key to uid! calling setActiveChatroom with roomKey: ' + roomKey)
          store.dispatch(ChatActions.setActiveChatroom(roomKey))
          store.dispatch(NavigationActions.navigate({ routeName: 'ChatScreen' }))
        }
      })
    })
    if (!roomKey) {
      console.tron.log('Room NOT found. Registering...')
      roomKey = firebase.database().ref(`rooms`).push().key
      const update = {}
      console.tron.log('Using roomKey ' + roomKey)

      const myid = AuthSelectors.getUser(store.getState()).uid
      const friendid = uid

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

      store.dispatch(ChatActions.setActiveChatroom(roomKey))
      firebase.database().ref().update(update).catch(error => console.tron.log(error))
      store.dispatch(NavigationActions.navigate({ routeName: 'ChatScreen' })) // ??? -- should this go in callback above
    }
  })
}

/*
fetchRoomData
- Given a room key, fetch user object of other participants and fire UPDATE_ROOM_USER with the data
*/
export function * fetchRoomData ({ roomKey }) {
  const thisUid = AuthSelectors.getUser(store.getState()).uid
  firebase.database().ref(`rooms/${roomKey}`).once('value', userIds => {
    userIds.forEach(userId => {
      if (userId.key !== thisUid) {
        firebase.database().ref(`users/${userId.key}`).once('value', user => {
          var newuser = user.val()
          newuser.uid = user.key
          store.dispatch(ChatActions.updateRoomUser(roomKey, newuser))
        })
      }
    })
  })
}

/*
sendMessage
Given room id and recipient uid, store the message in firebase db
*/
export function * sendMessage ({ roomKey, rid, text }) {
  const user = AuthSelectors.getUser(store.getState())
  firebase.database()
    .ref('messages/' + roomKey)
    .push()
    .set({
      createdAt: Date.now(),
      text: text,
      rid: rid,
      roomKey: roomKey,
      user: {
        _id: user.uid,
        avatar: user.photoURL,
        name: user.displayName
      }
    })
}
