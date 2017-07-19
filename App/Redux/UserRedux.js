import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  userLogin: ['loc'],
  userLoginSuccess: ['obj', 'loc'],
  updateUserLoc: ['loc']
})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  error: null,
  initialFetch: false,
  obj: null,
  profileVisible: false
})

export const userLogin = (state) => {
  // return state.merge({ initialFetch: true })
  return state
}

export const userLoginSuccess = (state, { obj, loc }) => {
  return state.merge({ obj: obj }) //, { initialFetch: 'done'}
}

export const updateUserLoc = (state, { loc }) => {
  return state.merge({ loc })
}

export const reducer = createReducer(INITIAL_STATE, {
  'USER_LOGIN': userLogin,
  'USER_LOGIN_SUCCESS': userLoginSuccess,
  'UPDATE_USER_LOC': updateUserLoc
})
