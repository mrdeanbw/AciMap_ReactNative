import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  initializeChat: null,
  // Chatrooms
  addChatroom: ['chatroom'],
  fetchRoomData: ['roomKey'],
  fetchOrRegisterRoom: ['uid'],
  setActiveChatRoom: ['roomKey'],
  updateRoomUser: ['roomKey', 'user'],
  setChatroomMessages: ['roomKey', 'messages'],
  // Messages
  addMessage: ['message'], // User received message, add it to the redux entity
  sendMessage: ['message'] // User sending message elsewhere
}, {prefix: 'chat - '})

export const ChatTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  rooms: {
    byId: {},
    allIds: []
  },
  messages: {
    byId: {},
    allIds: []
  }
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
