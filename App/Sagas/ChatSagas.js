import ChatActions from '../Redux/ChatRedux'
import firebase from '../Config/FirebaseConfig'
import { store } from '../Containers/App'

export function * initializeChat (api, action) {
  const db = firebase.database()
  const uid = 'Fmu6D27WD8ZYecsxt2cu6KuvPH93'
	db.ref(`users/${uid}/rooms`).on('value', rooms => {
		console.tron.log('Subscribed to the thing with rooms:')
		console.tron.log(rooms)
		rooms.forEach(room => {

			db.ref(`messages/${room.key}`).on('value', snap => {
				console.tron.log('Fetching messages from room with key ' + room.key + ' and found info:')
				console.tron.log(snap)
				// store.dispatch(ChatActions.)
        const messages = [];
        snap.forEach(message => {
            const msg = message.val();
            messages.push({
                _id: message.key,
                text: msg.text,
                user: msg.user,
                createdAt: msg.createdAt
            });
        });
        /**
         * sort messages
         */
        messages.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        console.tron.log('now we got messages')
        console.tron.log(messages)
        store.dispatch(ChatActions.fetchMessageSuccess(messages))
			})

		})
	})
}
