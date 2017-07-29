import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  initializeChat: null,
  fetchNearby: null,
  addChatroom: ['chatroom'],
  fetchRoomData: ['roomKey'],
  setChatRoomMessages: ['roomKey', 'messages']
}, {prefix: 'chatrooms - '})

export const ChatroomsTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  byId: {},
  allIds: []
})

export const fetchNearby = (state) => {
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_NEARBY]: fetchNearby
})
