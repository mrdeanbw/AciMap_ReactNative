import { createSelector } from 'reselect'

export const getUsersById = (state) => state.users.byId
export const getUserIds = (state) => state.users.allIds

export const getNearbyDrivers = createSelector(
  [ getUsersById, getUserIds ],
  (usersById, userIds) => {
    // Of nearby users, find drivers
    const driverIds = userIds.filter(u => usersById[u].driver)

    // Build object of drivers with info
    const filtered = Object.keys(usersById)
      .filter(key => driverIds.includes(key)) // Select keys present in allowed list, ensure included
      .reduce((obj, key) => {                 // Build new object with only the allowed properties
        obj[key] = usersById[key]
        return obj
      }, {})

    return filtered
  }
)
