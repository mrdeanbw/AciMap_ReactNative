import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  fetchUserLoc: null,
  fetchUserLocError: null,
  updateUserLoc: ['loc']
}, {prefix: 'loc - '})

export const LocTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  latitude: null,
  longitude: null,
  latitudeDelta: null,
  longitudeDelta: null,
  when: null
})

export const updateUserLoc = (state, { loc }) => {
  return state.merge({
    ...loc,
    when: Date.now(),
    error: null
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_USER_LOC]: updateUserLoc
})
