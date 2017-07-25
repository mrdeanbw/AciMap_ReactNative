import RNFirebase from 'react-native-firebase'

const configurationOptions = {
  debug: true
}

const firebase = RNFirebase.initializeApp(configurationOptions)

console.log('Firebase initialized.')
console.log(firebase)

export default firebase
