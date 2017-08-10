import Config from '../Config/DebugConfig'
import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

if (Config.useReactotron) {
  Reactotron
    .configure({ name: 'Arcade City', host: '127.0.0.1' })   // iOS Emulator
    // .configure({ name: 'Arcade City', host: '192.168.0.6' }) // Home iPad
    // .configure({ name: 'Arcade City', host: '10.24.105.91' })   // WeWork iPad
    // .configure({ name: 'Arcade City', host: '127.0.0.1', port: 9090 })   // Home Android
    .useReactNative()
    .use(reduxPlugin({ onRestore: Immutable }))
    .use(sagaPlugin())
    .connect()

  // Reactotron.clear()

  console.tron = Reactotron
}

if (!__DEV__) {
  console.tron = console
}
