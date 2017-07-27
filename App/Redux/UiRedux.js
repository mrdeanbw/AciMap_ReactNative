import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  sendToast: ['title', 'message', 'image', 'toasttype'],
  setClass: ['className']  
})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  toast: null,
  className: null
})

export const sendToast = (state, { title, message, image, toasttype }) => {
  return state.merge({
    toast: { title, message, image, toasttype }
  })
}

export const userLogout = (state) => {
  return INITIAL_STATE
}

export const setClass = (state, { className }) => {
	return state.merge({ className })
}

export const reducer = createReducer(INITIAL_STATE, {
  'SET_CLASS': setClass,
  'SEND_TOAST': sendToast,
  'USER_LOGOUT': userLogout
})
