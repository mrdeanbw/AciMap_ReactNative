import { createSelector } from 'reselect'

const requestState = (state) => state.request

export const selectRequestForm = createSelector(
  [ requestState ],
  (state) => {
    return state.requestForm
  }
)

export const selectRequestFormService = createSelector(
  [ selectRequestForm ],
  (state) => {
    return state.service
  }
)

export const selectRequestFormWhen = createSelector(
  [ selectRequestForm ],
  (state) => {
    return state.when
  }
)

export const selectRequestFormDetails = createSelector(
  [ selectRequestForm ],
  (state) => {
    return state.details
  }
)
