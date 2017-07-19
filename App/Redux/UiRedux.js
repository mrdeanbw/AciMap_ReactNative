import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  toggleDriverProfile: null
})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  profileVisible: false
})

export const toggleDriverProfile = (state) => {
  return state.merge({ profileVisible: !state.profileVisible })
}

export const reducer = createReducer(INITIAL_STATE, {
  'TOGGLE_DRIVER_PROFILE': toggleDriverProfile
})
