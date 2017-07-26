import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  const rootReducer = combineReducers({
    chat: require('./ChatRedux').reducer,
    driver: require('./DriverRedux').reducer,
    nearby: require('./NearbyRedux').reducer,
    nav: require('./NavigationRedux').reducer,
    ui: require('./UiRedux').reducer,
    user: require('./UserRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
