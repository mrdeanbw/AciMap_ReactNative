import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  initializeChat: null,
  addChatroom: ['chatroom'],
  fetchRoomData: ['roomKey'],
  fetchOrRegisterRoom: ['uid'],
  setActiveChatRoom: ['roomKey'],
  updateRoomUser: ['roomKey', 'user']
}, {prefix: 'chatrooms - '})

export const ChatroomsTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  byId: {},
  allIds: []
})

export const initializeChat = (state) => {
  return state
}

export const setChatroomMessages = (state) => {
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INITIALIZE_CHAT]: initializeChat,
  [Types.SET_CHATROOM_MESSAGES]: setChatroomMessages
})
