import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  trackEvent: ['name', 'payload'],
  userLogin: null,
  userLoginSuccess: ['obj'],
  userLoginError: ['error'],
  userLogout: null,
  userWelcomed: null,
  setWelcomed: ['welcomed'],
  setUserClass: ['userClass'],
  syncCodepush: null
}, { prefix: 'auth.' })

export const AuthTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  error: null,
  obj: null,
  initialFetch: false,
  welcomed: null,
  userClass: null
})

export const userLogin = (state, { obj }) => {
  return state.merge({ initialFetch: true })
}

export const userLoginSuccess = (state, { obj }) => {
  return state.merge({ obj: obj, initialFetch: 'done', error: null })
}

export const userLoginError = (state, { error }) => {
  return state.merge({ error, initialFetch: false })
}

export const setWelcomed = (state, { welcomed }) => {
  return state.merge({ welcomed })
}

export const setUserClass = (state, { userClass }) => {
  return state.merge({ userClass })
}

export const userLogout = (state) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_LOGIN]: userLogin,
  [Types.USER_LOGIN_SUCCESS]: userLoginSuccess,
  [Types.USER_LOGIN_ERROR]: userLoginError,
  [Types.USER_LOGOUT]: userLogout,
  [Types.SET_WELCOMED]: setWelcomed,
  [Types.SET_USER_CLASS]: setUserClass
})
