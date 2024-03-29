import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

const { Types, Creators } = createActions({
  listenForNearbyDrivers: null,
  addUser: ['key', 'user'],
  addUsers: ['blob'],
  removeUser: ['key'],
  updateDriverLoc: ['key', 'loc']
}, {prefix: 'users.'})

export const UsersTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  byId: {},
  allIds: []
})

export const listenForNearbyDrivers = (state) => {
  return state
}

export const addUser = (state, { key, user }) => {
  user.key = key
  return state.merge({
    allIds: [
      ...state.allIds,
      key
    ],
    byId: {
      ...state.byId,
      [key]: user // do another spread operator to prevent overwrite?
    }
  })
}

export const addUsers = (state, { blob }) => {
  return state.merge({
    byId: blob,
    allIds: _.keys(blob)
  })
}

export const removeUser = (state, { key }) => {
  let newAllIds = Immutable.flatMap(state.allIds, function (value) {
    if (value === key) {
      return []
    } else {
      return value
    }
  })
  return state.merge({ allIds: newAllIds })
}

export const updateDriverLoc = (state, { key, loc }) => {
  return state.merge({
    byId: {
      ...state.byId,
      [key]: {
        ...state.byId[key],
        loc
      }
    }
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_NEARBY_DRIVERS]: listenForNearbyDrivers,
  [Types.ADD_USER]: addUser,
  [Types.ADD_USERS]: addUsers,
  [Types.REMOVE_USER]: removeUser,
  [Types.UPDATE_DRIVER_LOC]: updateDriverLoc
})
