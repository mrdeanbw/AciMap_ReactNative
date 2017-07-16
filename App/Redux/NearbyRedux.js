import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  findNearbyDrivers: ['user', 'loc'],
  foundNearbyDrivers: ['drivers']
})

export const StartupTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  drivers: null
})

export const success = (state, { drivers }) => {
  return state.merge({ drivers })
}

export const reducer = createReducer(INITIAL_STATE, {
  "FOUND_NEARBY_DRIVERS": success
})