import ChatActions from '../Redux/ChatRedux'
import firebase from '../Config/FirebaseConfig'
import { store } from '../Containers/App'

export function * messageSent (api, action) {
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

// Wait til we log in...
export function * initializeChat (api, action) {
  // Initialize cloud messages
  const user = store.getState().user
  firebase.messaging().requestPermissions()
  firebase.messaging().subscribeToTopic(user.obj.uid) // Replace with current userid
  console.tron.log('Subscibed to topic ' + user.obj.uid)
  firebase.messaging().getToken()
    .then((token) => {
      console.tron.log('Fetched device FCM Token: ' + token)
      // ACTION: UPDATE TOKEN IN THE DB
    })

  firebase.messaging().onMessage((message) => {
    console.tron.log(message)
    window.alert(JSON.stringify(message))
  })

  firebase.messaging().getInitialNotification()
    .then((notification) => {
      if (notification) {
        console.tron.log('Initial notification:')
        console.tron.log(notification)
      }
    })

  firebase.messaging().onTokenRefresh((token) => {
    console.tron.log('Refreshed FCM token: ')
    console.tron.log(token)
    // ACTION: UPDATE TOKEN IN THE DB
  })

  // Listen for list of rooms, then listen to each room's messages
  const db = firebase.database()
  const uid = 'Fmu6D27WD8ZYecsxt2cu6KuvPH93'
  db.ref(`users/${uid}/rooms`).on('value', rooms => {
    rooms.forEach(room => {
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
        store.dispatch(ChatActions.fetchMessageSuccess(messages))
      })
    })
  })
}
