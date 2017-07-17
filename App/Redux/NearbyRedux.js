import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  findNearbyDrivers: ['user', 'loc'],
  foundNearbyDrivers: ['drivers'],
  updateDriverLoc: ['key', 'loc', 'distance']
})

export const StartupTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  drivers: null
})

export const success = (state, { drivers }) => {
  return state.merge({ drivers })
}

export const updateDriverLoc = (state, { key, loc, distance }) => {
	console.tron.log("In updateDriverLoc reducer!")
	console.tron.log(key)
	console.tron.log(loc)
	console.tron.log(distance)
	console.tron.log(state)
  return state.merge({nearby:   	
  	{key: key, loc: loc}})
}

export const reducer = createReducer(INITIAL_STATE, {
  "FOUND_NEARBY_DRIVERS": success,
  "UPDATE_DRIVER_LOC": updateDriverLoc
})