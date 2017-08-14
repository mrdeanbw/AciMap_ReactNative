// REQUEST SAGAS
import { store } from '../../Setup/App'
import firebase from '../../Setup/Config/FirebaseConfig'
import { getUser } from '../auth/selectors'
import { getUserLoc } from '../loc/selectors'
import { selectRequestForm } from '../request/selectors'
// const Geofire = require('geofire')

export function * requestSubmitted ({ formData }) {
  const state = store.getState()
  const user = getUser(state)
  const userLoc = getUserLoc(state)
  const requestForm = selectRequestForm(state)
  firebase.database().ref('requests/' + user.uid).push().update({
    status: 'submitted',
    createdAt: Date.now(),  // replace w servertime?
    userLoc,
    requestForm
  })
  .then(response => {
    if (response.status === 'success') {
      console.tron.log('Request saved, now what?')
      console.tron.log(response)
    } else {
      window.alert('Error, try again')
      console.tron.log(response)
    }
  })
}
