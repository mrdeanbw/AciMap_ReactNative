import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import firebase from '../Lib/firebase'

export function * driverSignupSubmit (api, action) {
	const { formData, user } = action // add user and loc
	console.tron.log("In driverSignupSubmit saga but not doing anything")

	// firebase.database().ref('users/' + user.uid).update({
 //    obj: {...user, timestamp: Date.now()},
 //    driverSignup: formData
	// })
	// .then(value => {
	// 	console.tron.log("User object updated with driver signup form info")
	// 	console.tron.log(formData)
	// 	console.tron.log(user)
	// 	console.tron.log(UserActions.driverSignupSuccess)
	// 	console.tron.log(UserActions.driverSignupSuccess())
	// 	// yield put(UserActions.driverSignupSuccess(formData, user))
	// 	// Fire action that unlocks their ability to create a beacon.
	// })
}

export function * driverSignupSuccess (api, action) {
	const { formData, user } = action
	console.tron.log("In driverSignupSuccess saga with")
	console.tron.log(formData)
	console.tron.log(user)
}