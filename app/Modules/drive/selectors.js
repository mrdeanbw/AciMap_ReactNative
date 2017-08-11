import { createSelector } from 'reselect'
import _ from 'lodash'

import { getUserId } from '../auth/selectors'
import { getUserIds, getUsersById } from '../users/selectors'

export const getActiveUserClass = (state) => state.drive.activeUserClass

export const getThisDriverInfo = createSelector(
  [ getUserId, getUsersById ],
  (uid, usersById = {}) => {
    return usersById[uid].driver
  }
)

export const getThisDriverHasBeacon = createSelector(
  [ getUserId, getUserIds ],
  (uid, userIds = []) => {
    if (_.includes(userIds, uid)) {
      return true
    } else {
      return false
    }
  }
)
