import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

const { Types, Creators } = createActions({
  initializeChat: null,
  // Chatrooms
  addChatroom: ['chatroom'],
  fetchRoomData: ['roomKey'],
  fetchOrRegisterRoom: ['uid'],
  setActiveChatroom: ['roomKey'],
  clearRoomKey: null,
  updateRoomUser: ['roomKey', 'user'],
  setChatroomMessages: ['roomKey', 'messages'],
  addMessagesForRoom: ['messages', 'roomKey'],
  // Messages
  addMessage: ['message'], // User received message, add it to the redux entity
  sendMessage: ['message'] // User sending message elsewhere
}, {prefix: 'chat.'})

export const ChatTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  roomKey: null,
  rooms: {
    byId: {},
    allIds: []
  },
  messages: {
    byId: {},
    allIds: []
  }
})

export const setActiveChatroom = (state, { roomKey }) => {
  return state.merge({ roomKey })
}

export const clearRoomKey = (state) => {
  return state.merge({ roomKey: null })
}

export const updateRoomUser = (state, { roomKey, user }) => {
  var updated = false
  const roomValues = _.values(state.rooms)

  console.tron.display({
    name: 'updateRoomUser roomValues',
    value: roomValues,
    preview: 'for roomKey ' + roomKey
  })

  const updatedItems = roomValues.map(item => {
    if (item.roomKey === roomKey) {
      updated = true
      return { ...item, user: user }
    }
    return item
  })

  if (updated) {
    console.tron.log('1 way')
    return state.merge({ rooms: updatedItems }) // need to add any o dat here? test this.
  } else {
    console.tron.log('2 way')
    return state.merge(
      {
        rooms: {
          ...state.rooms,
          byId: {
            ...state.rooms.byId,
            [roomKey]: {
              ...state.rooms.byId[roomKey],
              user: user,
              roomKey
            }
          },
          allIds: state.rooms.allIds.indexOf(roomKey) === -1 ? [...state.rooms.allIds, roomKey] : [...state.rooms.allIds]
        }
      }
    )
  }
}

export const setChatroomMessages = (state, { roomKey, messages = [] }) => {
  return state.merge({
    rooms: { // ..state.rooms needs added?
      [roomKey]: {
        ...state.rooms[roomKey],
        messages: messages
      }
    }
  })
}

export const addMessagesForRoom = (state, { messages = [], roomKey }) => {
  return state.merge({
    messages: { // ..state.rooms needs added?
      [roomKey]: {
        ...state.rooms[roomKey],
        messages: messages
      }
    }
  })
}

export const addMessage = (state, { message }) => {
  console.tron.display({
    name: 'adding message:',
    value: message,
    preview: message._id
  })
  return state.merge({
    messages: {
      ...state.messages,
      byId: {
        ...state.messages.byId,
        [message._id]: message
      },
      allIds: state.messages.allIds.indexOf(message._id) === -1 ? [...state.messages.allIds, message._id] : [...state.messages.allIds]
    }
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_ACTIVE_CHATROOM]: setActiveChatroom,
  [Types.CLEAR_ROOM_KEY]: clearRoomKey,
  [Types.UPDATE_ROOM_USER]: updateRoomUser,
  [Types.SET_CHATROOM_MESSAGES]: setChatroomMessages,
  [Types.ADD_MESSAGE]: addMessage
})
