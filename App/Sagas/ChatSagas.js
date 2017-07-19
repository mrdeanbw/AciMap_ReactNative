import ChatActions from '../Redux/ChatRedux'
import firebase from '../Config/FirebaseConfig'
import { store } from '../Containers/App'

export function * initializeChat (api, action) {
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
