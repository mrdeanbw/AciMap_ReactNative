import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'

export function * driverSignupSubmit (api, action) {
	const { formData } = action // add user and loc
  const response = yield call(api.driverSignupSubmit, formData)
  console.tron.log(response)  
}