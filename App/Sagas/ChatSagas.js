import ChatActions from '../Redux/ChatRedux'
import firebase from '../Config/FirebaseConfig'
import { store } from '../Containers/App'

export function * initializeChat (api, action) {
  // Send test message, see how it triggers Cloud Function.
  firebase.database()
    .ref('messages/-KpMSK6RN0G33Tf5JDae')
    .push()
    .set(
      {
        room: 'KpMSK6RN0G33Tf5JDae',
        createdAt: Date.now(),
        text: 'Magic!7',
        user: {
          _id: 'KfeoOKzIe9eqVXEL2JwAiMtnwvs2',
          avatar: 'https://scontent.xx.fbcdn.net/v/t1.0-1/s100x100/10354686_10150004552801856_220367501106153455_n.jpg?oh=b607b68bceb725319743396142d0768d&oe=5A040E73',
          name: 'Other Christopher David'
        },
        rid: 'KfeoOKzIe9eqVXEL2JwAiMtnwvs2'
      },
    )
  // Initialize cloud messages
  firebase.messaging().requestPermissions()
  firebase.messaging().subscribeToTopic('KfeoOKzIe9eqVXEL2JwAiMtnwvs2')
  firebase.messaging().getToken()
    .then((token) => {
      console.tron.log('Device FCM Token: ');
      console.tron.log(token)
      // ACTION: UPDATE TOKEN IN THE DB
    });
  firebase.messaging().onMessage((message) => {
    console.tron.log(message)
    window.alert(JSON.stringify(message))
  });
  // TODO: Set up a listener on messages (or do I have one already)... for new rooms, subscribe to that push notification channel. How does this work with people not in the app.. how do I subscribe people to a channel if new? Have to send to individual? Like have cloud function check to see if they are in he channel? Or should I only be sending to individual people for now? Should there be channels per user? Just do user for now until room functionality hm?


  firebase.messaging().getInitialNotification()
    .then((notification) => {
      console.tron.log('notification??:')
      console.tron.log(notification)
    })
  firebase.messaging().onTokenRefresh((token) => {
    console.tron.log('Refreshed FCM token: ');
    console.tron.log(token)
    // ACTION: UPDATE TOKEN IN THE DB
  });

  // Listen for list of rooms, then listen to each room's messages
  const db = firebase.database()
  const uid = 'Fmu6D27WD8ZYecsxt2cu6KuvPH93'
  db.ref(`users/${uid}/rooms`).on('value', rooms => {
    rooms.forEach(room => {
      db.ref(`messages/${room.key}`).on('value', snap => {
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
