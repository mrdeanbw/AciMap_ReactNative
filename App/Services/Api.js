import apisauce from 'apisauce'

const create = (baseURL = 'https://us-central1-v2rn-3a663.cloudfunctions.net/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const findNearbyDrivers = () => api.get('findNearbyDrivers')
  // const getUser = (username) => api.get('search/users', {q: username})

  return {
    findNearbyDrivers
  }
}

export default {
  create
}