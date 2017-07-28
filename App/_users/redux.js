import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  fetchNearbyDrivers: null,
  addUser: ['user']
}, {prefix: 'users - '})

export const UsersTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  byId: {},
  allIds: []
})

export const fetchNearbyDrivers = (state) => {
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_NEARBY_DRIVERS]: fetchNearbyDrivers
})
