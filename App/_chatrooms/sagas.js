// CHATROOMS SAGAS
import { store } from '../Containers/App'
import firebase from '../Config/FirebaseConfig'
import UsersActions from '../_users/redux'
import ChatroomsActions from '../_chatrooms/redux'
import * as AuthSelectors from '../_auth/selectors'
import * as LocSelectors from '../_loc/selectors'
const Geofire = require('geofire')

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
    if (not.roomKey !== ChatroomSelectors.getActiveChatroomKey(store.getState())) { // store.getState().chat.roomKey
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

  // Listen for list of rooms
  firebase.database().ref(`users/${uid}/rooms`).on('value', rooms => {
    rooms.forEach(room => {
      // Add that room with user info to redux for DrawerChatWidget etc.
      store.dispatch(ChatroomsActions.fetchRoomData(room.key))
      // Listen to each room's messages
      db.ref(`messages/${room.key}`).orderByKey().limitToLast(25).on('value', snap => {
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
        store.dispatch(ChatroomsActions.setChatRoomMessages(room.key, messages))
      })
    })
  })
}

/*
fetchOrRegisterRoom
- Given a user key, fetch roomKey of chat with that user, or register new one and save that one. 
- updateRoomuser w dat?!
*/

/*
fetchRoomData
- Given a room key, fetch user object of other participants and fire UPDATE_ROOM_USER with the data
*/

/*
setActiveChatroom
- User selected a chat. Let's grab the messages.
*/