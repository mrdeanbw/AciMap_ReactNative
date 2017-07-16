import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userSuccess: ['obj'],
  updateUserLoc: ['loc'],
  driverSignupSubmit: ['formData', 'user'],
  driverSignupSuccess: ['formData', 'user']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  driver: null
})

/* ------------- Reducers ------------- */

export const userSuccess = (state, { obj }) => {
  return state.merge(obj)
}

export const updateUserLoc = (state, { loc }) =>
  state.merge({ loc })

export const driverSignupSuccess = (state, { formData, user }) =>
  state.merge({ driver: formData })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  'USER_SUCCESS': userSuccess,
  'UPDATE_USER_LOC': updateUserLoc,
  'DRIVER_SIGNUP_SUCCESS': driverSignupSuccess
})
