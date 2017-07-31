import { createSelector } from 'reselect'
import _ from 'lodash'

export const getRoomIds = (state) => state.chat.rooms.allIds
export const getAllRooms = (state) => state.chat.rooms.byId
export const getAllMessages = (state) => state.chat.messages.byId
export const getActiveRoomKey = (state) => state.chat.roomKey

export const getActiveRoom = createSelector(
  [ getActiveRoomKey, getAllRooms ],
  (roomKey, rooms) => {
    return rooms[roomKey]
  }
)

export const getActiveMessages = createSelector(
  [ getActiveRoomKey, getAllMessages ],
  (roomKey, messages = {}) => {
    // Loop through all messages, return array of messages where roomKey is roomKey
    const messagesArray = _.values(messages)
    const roomMessages = messagesArray.filter(m => m.roomKey === roomKey)
    return roomMessages
  }
)
