import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  userLogin: null,
  userLoginSuccess: ['obj'],
  userLoginError: ['error'],
  trackEvent: ['name', 'payload'],
}, { prefix: 'auth - ' })

export const AuthTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  fcmToken: null,  
  error: null,
  obj: null,
  initialFetch: false
})

export const userLogin = (state, { obj }) => {
  return state.merge({ initialFetch: true })
}

export const userLoginSuccess = (state, { obj }) => {
  return state.merge({ obj: obj, initialFetch: 'done' })
}

export const userLoginError = (state, { error }) => {
  return state.merge({ error, initialFetch: false })
}

export const userLogout = (state) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_LOGIN]: userLogin,
  [Types.USER_LOGIN_SUCCESS]: userLoginSuccess,
  [Types.USER_LOGIN_ERROR]: userLoginError,
  [Types.USER_LOGOUT]: userLogout
})
