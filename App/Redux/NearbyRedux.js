import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  findNearbyDrivers: ['user', 'loc']
})

export const StartupTypes = Types
export default Creators