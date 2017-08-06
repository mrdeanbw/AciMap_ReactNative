import { createSelector } from 'reselect'

import { getUserId } from '../auth/selectors'
import { getUsersById } from '../users/selectors'

export const getActiveUserClass = (state) => state.drive.activeUserClass

export const getThisDriverInfo = createSelector(
  [ getUserId, getUsersById ],
  (uid, usersById = {}) => {
    return usersById[uid].driver
  }
)
