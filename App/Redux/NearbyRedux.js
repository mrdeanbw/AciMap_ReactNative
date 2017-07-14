import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  findNearbyDrivers: null
})

export const StartupTypes = Types
export default Creators