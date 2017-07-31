import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  driverSignupSubmit: ['formData'],
  driverSignupSuccess: null,
  addDriverBeacon: null
}, { prefix: 'drive.' })

export const DriveTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  driverSignup: null
})

export const driverSignupSubmit = (state, { formData }) => {
  return state.merge({ driverSignup: formData })
}

export const userLogout = (state) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DRIVER_SIGNUP_SUBMIT]: driverSignupSubmit,
  'auth.USER_LOGOUT': userLogout
})
