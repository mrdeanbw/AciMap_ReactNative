import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    user: require('./UserRedux').reducer,
    nearby: require('./NearbyRedux').reducer,
    driver: require('./DriverRedux').reducer,
    chat: require('./ChatRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
