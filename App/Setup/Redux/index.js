import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from './sagas'

export default () => {
  const rootReducer = combineReducers({
    _auth: require('../Modules/auth/redux').reducer,
    _chatrooms: require('../Modules/chatrooms/redux').reducer,
    _drive: require('../Modules/drive/redux').reducer,
    _loc: require('../Modules/loc/redux').reducer,
    _messages: require('../Modules/messages/redux').reducer,
    _users: require('../Modules/users/redux').reducer,
    nav: require('./NavigationRedux').reducer,
    ui: require('./UiRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
