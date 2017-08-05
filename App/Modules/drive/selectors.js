import { createSelector } from 'reselect'

import { getUserId } from '../auth/selectors'
import { getUsersById } from '../users/selectors'
import _ from 'lodash'

export const getThisDriverInfo = createSelector(
	[ getUserId, getUsersById ],
	(uid, usersById = {}) => {
		return usersById[uid].driver
	}
)
