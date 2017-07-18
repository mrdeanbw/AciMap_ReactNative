import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  findNearbyDrivers: ['user', 'loc'],
  foundNearbyDrivers: ['drivers'],
  updateDriverLoc: ['key', 'loc', 'distance'],
  updateDriverInfo: ['key', 'info']
})

export const NearbyTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  drivers: []
})

export const success = (state, { drivers }) => {
  return state.merge({ drivers })
}

export const updateDriverLoc = (state, { key, loc, distance }) => {
  var updated = false
  const updatedItems = state.drivers.map(item => {
    if (item.key === key) {
      updated = true
      return { ...item, loc: loc }
    }
    return item
  })

  if (updated) {
    return state.merge({ drivers: updatedItems })
  } else {
    var objAdd = { key, loc, distance }

    return state.merge({
      drivers: [...state.drivers, objAdd]
    })
  }
}

export const updateDriverInfo = (state, { key, info }) => {
  const updatedItems = state.drivers.map(item => {
    if (item.key === key) {
      return { ...item, profile: info }
    }
    return item
  })

  return state.merge({ drivers: updatedItems })
}

export const reducer = createReducer(INITIAL_STATE, {
  'FOUND_NEARBY_DRIVERS': success,
  'UPDATE_DRIVER_LOC': updateDriverLoc,
  'UPDATE_DRIVER_INFO': updateDriverInfo
})
