import apisauce from 'apisauce'

const create = (baseURL = 'https://us-central1-v2rn-3a663.cloudfunctions.net/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const findNearbyDrivers = (user, loc) => api.get('findNearbyDrivers', {
    lat: loc.latitude,
    lng: loc.longitude,
    uid: user.uid,
    email: user.email
  })

  return {
    findNearbyDrivers
  }
}

export default {
  create
}