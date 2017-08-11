import { store } from '../../Setup/App'                              // store so we can fire actions and populate selectors
import firebase from '../../Setup/Config/FirebaseConfig'             // firebase so we can set up listeners for users (here?)
import UsersActions from './redux'             // UsersActions so we can add users from listeners (here?)
import * as UsersSelectors from './selectors'  // UsersSelectors so we can check what drivers already there
import _ from 'lodash'                                      // lodash so we can check if key is in array of alreadys

const drivers = {}
let initialFetchDone = false                            // Track when the full fetch with user data is done
let initialDriverKeys = []
let firebaseListeners = {}

export const fbStopListeningForDriver = (key) => {
  firebase.database().ref('users/' + key).off()
  console.tron.log('I think we stopped listening for that driver')
}

export const fbListenForNewDriver = (key, loc, initialKeyFetchDone = false) => {
  if (!initialKeyFetchDone) {                           // Initial fetch of keys is not done, so...
    initialDriverKeys.push(key)                         // ...add key to array so we can check later that it's handled
  }

  let newListener = firebase.database()
    .ref('users/' + key)
    .on('value', (snapshot) => {
      const existingUserIds = UsersSelectors.getUserIds(store.getState())
      let user = snapshot.val()
      user.loc = loc
      const keyExists = _.includes(existingUserIds, key)
      if (!keyExists && !initialFetchDone) {
        drivers[key] = user
        let driverCount = _.size(drivers)
        let driverKeyCount = _.size(initialDriverKeys)
        if (driverCount === driverKeyCount) {
          console.tron.log('MATCH! We have finished the fetch. Drivers:')
          initialFetchDone = true
          console.tron.log(drivers)
          store.dispatch(UsersActions.addUsers(drivers))
        }
      }
    })
  firebaseListeners[key] = newListener // Needed/helpful?
}
