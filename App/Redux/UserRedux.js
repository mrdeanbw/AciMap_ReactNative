import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userLogin: ['loc'],
  userSuccess: ['obj', 'loc'],
  updateUserLoc: ['loc']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  initialFetch: false,
  obj: null
})

/* ------------- Reducers ------------- */

export const userLogin = (state) => {
  // return state.merge({ initialFetch: true })
  return state
}

export const userSuccess = (state, { obj, loc }) => {
  return state.merge({ obj: obj }) //, { initialFetch: 'done'} 
}

export const updateUserLoc = (state, { loc }) => {
  return state.merge({ loc })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  'USER_LOGIN': userLogin,
  'USER_SUCCESS': userSuccess,
  'UPDATE_USER_LOC': updateUserLoc,
})
