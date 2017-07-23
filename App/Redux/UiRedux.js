import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  toggleDriverProfile: null,
  sendToast: ['title', 'message', 'image', 'toasttype']
})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  profileVisible: false,
  toast: null
})

export const toggleDriverProfile = (state) => {
  return state.merge({ profileVisible: !state.profileVisible })
}

export const sendToast = (state, { title, message, image, toasttype }) => {
  return state.merge({
    toast: { title, message, image, toasttype }
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  'TOGGLE_DRIVER_PROFILE': toggleDriverProfile,
  'SEND_TOAST': sendToast
})
