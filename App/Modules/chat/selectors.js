import { createSelector } from 'reselect'

export const getRoomIds = (state) => state.chat.rooms.allIds
export const getAllMessages = (state) => state.messages.byId
export const getActiveRoomKey = (state) => state.chat.roomKey

export const getActiveMessages = createSelector(
  [ getActiveRoomKey, getAllMessages ],
  (roomKey, messages) => {
	  console.tron.display({
	    name: 'updateRoomUser roomValues',
	    value: {roomKey, messages},
	    preview: 'Messages for for roomKey ' + roomKey
	  })
  	// Loop through all messages, return array of messages where roomKey is roomKey
  }
)