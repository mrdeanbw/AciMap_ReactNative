import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  const rootReducer = combineReducers({
    _auth: require('../_auth/redux').reducer,
    _chatrooms: require('../_chatrooms/redux').reducer,
    _loc: require('../_loc/redux').reducer,
    _messages: require('../_messages/redux').reducer,
    _users: require('../_users/redux').reducer,
    chat: require('./ChatRedux').reducer,
    driver: require('./DriverRedux').reducer,
    nearby: require('./NearbyRedux').reducer,
    nav: require('./NavigationRedux').reducer,
    ui: require('./UiRedux').reducer,
    user: require('./UserRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
