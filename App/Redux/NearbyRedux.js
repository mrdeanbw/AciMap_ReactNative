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

// successful driver lookup
export const success = (state, { drivers }) => {
	console.tron.log("In success reducer with drivers")
	console.tron.log(drivers)
  return state.merge({ drivers })
}

export const reducer = createReducer(INITIAL_STATE, {
  "FOUND_NEARBY_DRIVERS": success
})