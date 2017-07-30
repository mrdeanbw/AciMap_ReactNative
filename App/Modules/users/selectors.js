import { createSelector } from 'reselect'

export const getUsersById = (state) => state._users.byId
export const getUserIds = (state) => state._users.allIds

export const getNearbyDrivers = createSelector(
  [ getUsersById, getUserIds ],
  (usersById, userIds) => {
    // console.tron.log('in getNearbyDrivers piece with users and userIds')
    // console.tron.log(usersById)
    // console.tron.log(userIds)

    // Build array of driver uids -- it's all users that have a driver property.
    const driverIds = userIds.filter(u => usersById[u].driver)
    // console.tron.log('filtered ids:')
    // console.tron.log(driverIds)

    // Build object of drivers with info
    const filtered = Object.keys(usersById)
      .filter(key => driverIds.includes(key)) // Select keys present in allowed list, ensure included
      .reduce((obj, key) => {                 // Build new object with only the allowed properties
        obj[key] = usersById[key]
        return obj
      }, {})

    // console.tron.log('filtered users:')
    // console.tron.log(filtered)

    return filtered
  }
)
