import { store } from '../Containers/App'
import firebase from '../Config/FirebaseConfig'

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
