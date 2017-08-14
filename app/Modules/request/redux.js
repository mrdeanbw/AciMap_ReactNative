import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'

const { Types, Creators } = createActions({
  requestSubmitted: ['request'],
  requestCancelled: ['requestId'],
  requestClaimed: ['requestId'],
  requestResolved: ['requestId'],
  updateRequestFormDetails: ['details'],
  updateRequestFormService: ['service'],
  updateRequestFormWhen: ['when']
}, { prefix: 'request.' })

export const RequestTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loading: false,
  requestScreen: 'main',
  requestForm: {
    service: 'ride',
    when: moment().toDate(), // add(toAdd, 'm'). ??   --- And what about server time?
    details: ''
  },
  viewRequest: {}
})

export const updateRequestFormDetails = (state, { details }) => {
  return state.merge({
    requestForm: {
      ...state.requestForm,
      details
    }
  })
}

export const updateRequestFormService = (state, { service }) => {
  return state.merge({
    requestForm: {
      ...state.requestForm,
      service
    }
  })
}

export const updateRequestFormWhen = (state, { when }) => {
  return state.merge({
    requestForm: {
      ...state.requestForm,
      when
    }
  })
}

export const userLogout = (state) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_REQUEST_FORM_DETAILS]: updateRequestFormDetails,
  [Types.UPDATE_REQUEST_FORM_SERVICE]: updateRequestFormService,
  [Types.UPDATE_REQUEST_FORM_WHEN]: updateRequestFormWhen,
  'auth.USER_LOGOUT': userLogout
})
