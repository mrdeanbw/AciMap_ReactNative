import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  driverSignupSubmit: ['formData', 'user'],
  driverSignupSuccess: ['formData', 'user'],
  addDriverBeacon: ['user', 'loc', 'driver']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null
})

/* ------------- Reducers ------------- */

export const driverSignupSuccess = (state, { formData, user }) =>
  state.merge({ formData })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  'DRIVER_SIGNUP_SUCCESS': driverSignupSuccess
})
