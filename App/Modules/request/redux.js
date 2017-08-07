import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'

const { Types, Creators } = createActions({
  requestSubmitted: ['request'],
  requestCancelled: ['requestId'],
  requestClaimed: ['requestId'],
  requestResolved: ['requestId'],
  toggleModal: ['component']
}, { prefix: 'request.' })

export const RequestTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loading: false,
  requestScreen: 'main',
  requestForm: {
    service: 'ride',
    when: moment().toDate(), // add(toAdd, 'm'). ??
    details: ''
  },
  viewRequest: {}
})

export const userLogout = (state) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  'auth.USER_LOGOUT': userLogout
})
