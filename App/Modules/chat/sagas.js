// CHATROOMS SAGAS
import { store } from '../../Setup/App'
import firebase from '../../Setup/Config/FirebaseConfig'
import { NavigationActions } from 'react-navigation'
import ChatActions from '../chat/redux'
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
  console.tron.log('Subscibed to topic ' + uid)

  // Grab the Firebase Cloud Messaging device token -- and do what with it?
  firebase.messaging().getToken()
    .then((token) => {
      console.tron.log('Fetched device FCM Token: ' + token)
      // ACTION: UPDATE TOKEN IN THE DB
    })

  // Handle new incoming FCM notification
  firebase.messaging().onMessage((message) => {
    console.tron.log(message)
    const not = message.notification
    if (not.roomKey !== ChatSelectors.getActiveChatroomKey(store.getState())) { // store.getState().chat.roomKey
      // store.dispatch(UiActions.sendToast(not.title, not.body, not.icon, 'chat'))
    }
  })

  // Handle existing FCM notification..?
  firebase.messaging().getInitialNotification()
    .then((notification) => {
      if (notification) {
        // console.tron.log('Initial notification:')
        // console.tron.log(notification)
      }
    })

  // Listen for list of rooms (and this is not just new rooms)
  firebase.database().ref(`users/${uid}/rooms`).on('value', rooms => {

    // Before setting up listener or whatever, see if this is already in our room list (and will therefore have listener..)


    console.tron.log('rooms:')
    console.tron.log(rooms)
    rooms.forEach(room => {
      console.tron.log('heres a room:')
      console.tron.log(room)
      // Add that room with user info to redux for DrawerChatWidget etc.
      // store.dispatch(ChatActions.fetchRoomData(room.key))
      // Listen to each room's messages
      firebase.database().ref(`messages/${room.key}`).orderByKey().limitToLast(25).on('value', snap => {
        const messages = []
        snap.forEach(message => {
          const msg = message.val()
          messages.push({
            _id: message.key,
            text: msg.text,
            user: msg.user,
            createdAt: msg.createdAt
          })
        })
        messages.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        store.dispatch(ChatActions.setChatroomMessages(room.key, messages))
      })
    })
  })
}

/*
fetchOrRegisterRoom [old]
- Given a user key, fetch roomKey of chat with that user, or register new one and save that one.
- updateRoomuser w dat?!
*/
export function * fetchOrRegisterRoom ({ uid }) {
  console.tron.log('In fetchOrRegisterRoom saga with uid ' + uid)
  // First we see if we share any rooms with this person
  let roomKey = null
  firebase.database().ref(`rooms`).once('value', snap => {
    const keys = _.keys(snap.val())
    const thisRoomKey = keys[0]
    snap.forEach(someid => {
      const dese = _.keys(someid.val())
      dese.forEach(key => {
        console.tron.log('CHECKING ' + key + ' AGAINST ' + uid)
        if (key === uid) {
          console.tron.log('Looks like a match... so YAY ' + thisRoomKey)
          roomKey = thisRoomKey
          store.dispatch(ChatActions.setActiveChatRoom(roomKey))
          store.dispatch(NavigationActions.navigate({ routeName: 'ChatScreen' }))
        }
      })
    })
    if (!roomKey) {
      console.tron.log('Room NOT found. Registering...')
      roomKey = firebase.database().ref(`rooms`).push().key
      const update = {}
      console.tron.log('Using roomKey ' + roomKey)

      // Temporarily hardcode user ids
      const myid = store.getState().user.obj.uid
      const friendid = uid // so thats why that was fucked

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
      store.dispatch(NavigationActions.navigate({ routeName: 'ChatScreen' })) // ??? -- should this go in callback above
    }
  })
}

/*
fetchRoomData [old]
- Given a room key, fetch user object of other participants and fire UPDATE_ROOM_USER with the data
*/
export function * fetchRoomData (action) {
  const { roomKey } = action
  const thisUid = store.getState().user.obj.uid
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
setActiveChatroom [old]
- User selected a chat. Let's grab the messages.
*/
export function * setActiveChatRoom ({ roomKey }) {
  firebase.database().ref(`messages/${roomKey}`).orderByKey().limitToLast(50).once('value', snap => {
    const messages = []
    snap.forEach(message => {
      const msg = message.val()
      messages.push({
        _id: message.key,
        text: msg.text,
        user: msg.user,
        createdAt: msg.createdAt
      })
    })
    messages.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    store.dispatch(ChatActions.setChatRoomMessages(roomKey, messages))
  })
}

/*
messageSent [old]
Given room id and recipient uid, store the message in firebase db
*/
export function * messageSent (action) {
  const { roomKey, rid, text } = action
  const user = store.getState().user
  firebase.database()
    .ref('messages/' + roomKey)
    .push()
    .set({
      createdAt: Date.now(),
      text: text,
      user: {
        _id: user.obj.uid,
        avatar: user.obj.photoURL,
        name: user.obj.displayName
      },
      rid: rid
    })
}
