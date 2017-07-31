import { createSelector } from 'reselect'
import _ from 'lodash'

export const getActiveRoomKey = (state) => state.chat.roomKey
export const getAllRooms = (state) => state.chat.rooms.byId
export const getAllMessages = (state) => state.chat.messages.byId
export const getRoomIds = (state) => state.chat.rooms.allIds
export const getMessageIds = (state) => state.chat.messages.allIds

export const getActiveRoom = createSelector(
  [ getActiveRoomKey, getAllRooms ],
  (roomKey, rooms) => {
    return rooms[roomKey]
  }
)

export const getActiveRoomUser = createSelector(
  [ getActiveRoom ],
  (room) => room.user
)

export const getActiveMessages = createSelector(
  [ getActiveRoomKey, getAllMessages ],
  (roomKey, messages = {}) => {
    // Loop through all messages, return array of messages where roomKey is roomKey
    const messagesArray = _.values(messages)
    const roomMessages = messagesArray.filter(m => m.roomKey === roomKey)
    roomMessages.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    return roomMessages
  }
)
