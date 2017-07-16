import apisauce from 'apisauce'

const create = (baseURL = 'https://us-central1-aci1-87e53.cloudfunctions.net/') => {
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

  const driverSignupSubmit = (formData) => api.get('driverSignupSubmit', formData)

  return {
    findNearbyDrivers,
    driverSignupSubmit
  }
}

export default {
  create
}