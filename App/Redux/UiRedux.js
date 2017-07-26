import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  sendToast: ['title', 'message', 'image', 'toasttype'],
  changeWelcomeScreen: ['screen']
})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  toast: null
})

export const sendToast = (state, { title, message, image, toasttype }) => {
  return state.merge({
    toast: { title, message, image, toasttype }
  })
}

export const userLogout = (state) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  'SEND_TOAST': sendToast,
  'USER_LOGOUT': userLogout
})
