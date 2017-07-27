import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  findNearbyDrivers: ['loc'],
  foundNearbyDrivers: ['drivers'],
  updateDriverLoc: ['key', 'loc', 'distance'],
  updateDriverInfo: ['key', 'info'],
  setActiveDriver: ['key']
})

export const NearbyTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  drivers: [],
  driversInfoLoaded: false,
  activeDriver: {
    profile: {
      name: null,
      fbid: null,
      createdAt: null,
      photo: null,
      driver: {
        vehicle: null,
        self: null
      }
    }
  }
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

  return state.merge({ drivers: updatedItems, driversInfoLoaded: true })
}

export const setActiveDriver = (state, { key }) => {
  var activeDriver = null
  state.drivers.forEach(driver => {
    if (driver.key === key) {
      activeDriver = driver
    }
  })
  return state.merge({ activeDriver: activeDriver })
}

export const userLogout = (state) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  'FOUND_NEARBY_DRIVERS': success,
  'UPDATE_DRIVER_LOC': updateDriverLoc,
  'UPDATE_DRIVER_INFO': updateDriverInfo,
  'SET_ACTIVE_DRIVER': setActiveDriver,
  'USER_LOGOUT': userLogout
})
