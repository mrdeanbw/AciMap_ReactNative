import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  userLogout: null,
}, { prefix: 'auth: ' })

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
	uid: null,
	deviceToken: null
})

export const userLogout = (state) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_LOGOUT]: userLogout
})
