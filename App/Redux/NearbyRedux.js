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
  drivers: [
  	{
  		key: 'tester',
  		wat: 'asdfasdf',
  		loc: [35, 49]
  	}
  ]
})

export const success = (state, { drivers }) => {
  return state.merge({ drivers })
}

export const updateDriverLoc = (state, { key, loc, distance }) => {

	var updated = false
  const updatedItems = state.drivers.map(item => {
    if(item.key === key){
    	console.tron.log('MATCH')
    	updated = true
      return { ...item, loc: loc }      
    }
    return item
  })

  if (updated) {
	  return state.merge({ drivers: updatedItems })
  } else {
  	var objAdd = { key, loc, distance }
		console.tron.log('Adding...')  	
		console.tron.log(objAdd)
  // 	return state.merge(
  // 		...state.drivers, [objAdd]
		// )
		return state.merge({
			drivers: [...state.drivers, objAdd]
		})
  }

}

export const reducer = createReducer(INITIAL_STATE, {
  "FOUND_NEARBY_DRIVERS": success,
  "UPDATE_DRIVER_LOC": updateDriverLoc
})