import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  fetchNearby: null
}, {prefix: 'ui: '})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  activeSomething: null
})

export const fetchNearby = (state) => {
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_NEARBY]: fetchNearby
})
