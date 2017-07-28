// import { createSelector } from 'reselect'

export const getUser = (state) => state._auth.obj
export const getInitialFetch = (state) => state._auth.initialFetch
export const getUserWelcomed = (state) => state._auth.welcomed
export const getUserClass = (state) => state._auth.userClass
