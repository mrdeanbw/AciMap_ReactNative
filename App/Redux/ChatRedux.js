import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

const { Types, Creators } = createActions({
  clearRoomKey: null,
  initializeChat: null,
  fetchOrRegisterRoom: ['uid'],
  fetchRoomData: ['roomKey'],
  messageSent: ['roomKey', 'rid', 'text'],
  setActiveChatRoom: ['roomKey'],
  setChatRoomMessages: ['roomKey', 'messages'],
  updateRoomUser: ['roomKey', 'user']
})

export const ChatTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loading: true,
  roomKey: null,
  rooms: []
})

export const clearRoomKey = (state) => {
  return state.merge({ roomKey: null })
}

export const setActiveChatRoom = (state, { roomKey }) => {
  return state.merge({ roomKey })
}

export const setChatRoomMessages = (state, { roomKey, messages }) => { // = []. ??
  return state.merge({
    rooms: {
      [roomKey]: {
        ...state.rooms[roomKey],
        messages: messages
      }
    }
  })
}

export const updateRoomUser = (state, { roomKey, user }) => {
  var updated = false
  const roomValues = _.values(state.rooms)
  const updatedItems = roomValues.map(item => {
    if (item.key === roomKey) {
      updated = true
      return { ...item, user: user }
    }
    return item
  })

  if (updated) {
    return state.merge({ rooms: updatedItems })
  } else {
    return state.merge(
      ...state.rooms,
      {
        rooms: {
          [roomKey]: {
            user: user, roomKey
          }
        }
      }
    )
  }
}

export const userLogout = (state) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  'CLEAR_ROOM_KEY': clearRoomKey,
  'SET_ACTIVE_CHAT_ROOM': setActiveChatRoom,
  'SET_CHAT_ROOM_MESSAGES': setChatRoomMessages,
  'UPDATE_ROOM_USER': updateRoomUser,
  'USER_LOGOUT': userLogout
})
