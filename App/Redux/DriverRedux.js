import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  driverSignupSubmit: ['formData', 'user'],
  driverSignupSuccess: ['formData', 'user'],
  addDriverBeacon: ['user', 'loc', 'driver']
})

export const DriverTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  error: null
})

export const driverSignupSuccess = (state, { formData, user }) =>
  state.merge({ formData })

export const reducer = createReducer(INITIAL_STATE, {
  'DRIVER_SIGNUP_SUCCESS': driverSignupSuccess
})
