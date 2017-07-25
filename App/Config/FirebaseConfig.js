import RNFirebase from 'react-native-firebase'

const configurationOptions = {
  debug: false
}

const firebase = RNFirebase.initializeApp(configurationOptions)

export default firebase
