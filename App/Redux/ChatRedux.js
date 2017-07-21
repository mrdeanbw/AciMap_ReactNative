import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

const { Types, Creators } = createActions({
  updateRoomUser: ['roomKey', 'user'],
  initializeChat: null,
  fetchRoomSuccess: ['roomKey'],
  fetchRoomError: null,
  registerRoom: null,
  fetchMessageSuccess: ['messages'],
  fetchMessageError: null,
  messageSent: ['roomKey', 'rid', 'text'],
  fetchRoomData: ['roomKey'],
  setActiveChatRoom: ['roomKey'],
  setChatRoomMessages: ['roomKey', 'messages']
})

export const ChatTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loading: true,
  messages: [],
  roomKey: null,
  rooms: []
})

export const setChatRoomMessages = (state, { roomKey, messages }) => {

  console.tron.log('in setChatRoomMessages action with roomKey and messages:')
  console.tron.log(roomKey)
  console.tron.log(messages)
  console.tron.log(state)  
  var newRoom
  _.forOwn(state.rooms, function(value, key) {
    console.tron.log('Oh and we do have key and value:')
    console.tron.log(value)
    console.tron.log(key)
    var room = value
    if (room.roomKey === roomKey) {
      console.tron.log('Found a match. Now lets try..')
      room.messages = messages
      newRoom = {
        user: room.user,
        messages: messages,
        roomKey: room.roomKey
      }
      // console.tron.log('do we even have messages here')
      // console.tron.log(messages)
      // console.tron.log('Did we just add messages to that object:')
      // console.tron.log(room)
      console.tron.log('Did we set that fine....')
      console.tron.log(newRoom)
      // return newRoom
    }
  })
  // console.tron.log(modifiedRoom)
  console.tron.log('And do we have it hre...')
  console.tron.log(newRoom)
  console.tron.log('-----------')
  return state.merge({ 
    rooms: {
      [roomKey]: newRoom 
    }
  })

  // const updatedRooms = state.rooms.map(item => {
  //   if (item.roomKey === roomKey) {
  //     return { ...item, messages }
  //   }
  //   return item
  // })
  // return state.merge({ rooms: updatedRooms })
}

export const setActiveChatRoom = (state, { roomKey }) => {
  return state.merge({ roomKey })
}

export const updateRoomUser = (state, { roomKey, user }) => {
  var updated = false
  const updatedItems = state.rooms.map(item => {
    if (item.key === roomKey) {
      updated = true
      return { ...item, user: user }
    }
    return item
  })

  if (updated) {
    return state.merge({ rooms: updatedItems })
  } else {
    // return state.merge({ rooms: [...state.rooms, { user, roomKey }] }).    {[roomKey]: user}
    // return state.merge(
    //   ...state.rooms,
    //   {rooms: ['test': {test1: 'hi'}]}
    // )
    // return state.merge({
    //   rooms: [
    //     ...state.rooms,
    //     { roomKey }
    //   ]
    // })
    return state.merge(
      ...state.rooms,
      {rooms: {[roomKey]: {user: user, roomKey}}}
    )
  }
}

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
  'FETCH_MESSAGE_SUCCESS': fetchMessageSuccess,
  'FETCH_MESSAGE_ERROR': fetchMessageError,
  'UPDATE_ROOM_USER': updateRoomUser,
  'SET_ACTIVE_CHAT_ROOM': setActiveChatRoom,
  'SET_CHAT_ROOM_MESSAGES': setChatRoomMessages
})
