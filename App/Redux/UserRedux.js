import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  trackEvent: ['name', 'payload'],
  updateUserLoc: ['loc'],
  userLogin: null,
  userLoginSuccess: ['obj'],
  userLogout: null
})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  error: null,
  initialFetch: false,
  obj: null
})

export const userLogin = (state) => {
  return state.merge({ initialFetch: true })
}

export const userLoginSuccess = (state, { obj }) => {
  return state.merge({ obj: obj, initialFetch: 'done' })
}

export const updateUserLoc = (state, { loc }) => {
  return state.merge({ loc })
}

export const userLogout = (state) => {
  return state.merge({ obj: null })
}

export const reducer = createReducer(INITIAL_STATE, {
  'USER_LOGIN': userLogin,
  'USER_LOGIN_SUCCESS': userLoginSuccess,
  'UPDATE_USER_LOC': updateUserLoc,
  'USER_LOGOUT': userLogout
})
