import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  fetchRoomSuccess: ['roomKey'],
  fetchRoomError: null,
  registerRoom: null,
  fetchMessageSuccess: null,
  fetchMessageError: null
})

export const ChatTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loading: true,
  messages: [],
  roomKey: null
})

export const fetchRoomSuccess = (state, { roomKey }) => {
  return state.merge({
    loading: false,
    roomKey: roomKey
  })
}

export const fetchRoomError = (state) => {
  return state.merge({ loading: false })
}

export const registerRoom = (state, { roomKey }) => {
  return state.merge({ roomKey })
}

export const fetchMessageSuccess = (state, { messages }) => {
  return state.merge({
    loading: false,
    messages: messages
  })
}

export const fetchMessageError = (state) => {
  return state.merge({ loading: false })
}

export const reducer = createReducer(INITIAL_STATE, {
  'FETCH_ROOM_SUCCESS': fetchRoomSuccess,
  'FETCH_ROOM_ERROR': fetchRoomError,
  'REGISTER_ROOM': registerRoom,
  'FETCH_MESSSAGE_SUCCESS': fetchMessageSuccess,
  'FETCH_MESSSAGE_ERROR': fetchMessageError
})
