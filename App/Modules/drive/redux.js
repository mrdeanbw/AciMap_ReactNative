import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  driverSignupSubmit: ['formData'],
  driverSignupSuccess: null,
  addDriverBeacon: null,
  activeUserClass: null,
  toggleRiderDriver: ['activeUserClass']
}, { prefix: 'drive.' })

export const DriveTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  driverSignup: null,
  activeUserClass: null
})

export const setActiveUserClass = (state, { userClass }) => {
  return state.merge({ activeUserClass: userClass })
}

export const toggleRiderDriver = (state, { activeUserClass }) => {
  if (activeUserClass === 'rider') {
    return state.merge({ activeUserClass: 'driver' })
  } else {
    return state.merge({ activeUserClass: 'rider' })
  }
}

export const driverSignupSubmit = (state, { formData }) => {
  return state.merge({ driverSignup: formData })
}

export const userLogout = (state) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DRIVER_SIGNUP_SUBMIT]: driverSignupSubmit,
  [Types.TOGGLE_RIDER_DRIVER]: toggleRiderDriver,
  'auth.SET_USER_CLASS': setActiveUserClass,
  'auth.USER_LOGOUT': userLogout
})
