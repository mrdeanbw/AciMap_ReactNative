import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userSuccess: ['obj'],
  driverSignupSubmit: ['formData', 'user']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null
})

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state, { username }) =>
  state.merge({ fetching: true, username, avatar: null })

// successful avatar lookup
export const success = (state, { obj }) => {
  // const { avatar } = action
  // return state.merge({ fetching: false, error: null, avatar })
  return state.merge(obj)
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, avatar: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure
})
