import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import { AsyncStorage } from 'react-native'

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '2.67',
  storeConfig: {
    storage: AsyncStorage,
    blacklist: ['nav', 'ui'],
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
