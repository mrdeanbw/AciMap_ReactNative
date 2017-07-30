import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  addMessage: ['message'], // User received message, add it to the grouping
  sendMessage: ['message'] // User sending message elsewhere
}, {prefix: 'messages - '})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  byId: {},
  allIds: []
})

export const addMessage = (state) => {
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_MESSAGE]: addMessage
})
