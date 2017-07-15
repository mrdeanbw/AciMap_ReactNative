import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import firebase from '../Lib/firebase'

export function * driverSignupSubmit (api, action) {
	const { formData, user } = action // add user and loc

	console.tron.log('In driverSignupSubmit with user obj:')
	console.tron.log(user)

	firebase.database().ref('users/' + user.uid).update({
    obj: {...user, timestamp: Date.now()},
    driverSignup: formData
	})
	.then(
		console.tron.log("User object updated with driver signup form info!")
	)

	// firebase.auth().currentUser
	//   .updateProfile({
	//     driverSignup: formData
	//   })
	//   .then(
	//   	console.tron.log("PROFILE UPDATED")
	//   )
	//   .catch();

  // const response = yield call(api.driverSignupSubmit, formData)
  // console.tron.log(response)  
}