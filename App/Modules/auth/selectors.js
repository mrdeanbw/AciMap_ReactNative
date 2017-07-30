// import { createSelector } from 'reselect'

export const getUser = (state) => state.auth.obj
export const getInitialFetch = (state) => state.auth.initialFetch
export const getUserWelcomed = (state) => state.auth.welcomed
export const getUserClass = (state) => state.auth.userClass
