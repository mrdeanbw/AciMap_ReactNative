import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from './sagas'

export default () => {
  const rootReducer = combineReducers({
    auth: require('../../Modules/auth/redux').reducer,
    chat: require('../../Modules/chat/redux').reducer,
    drive: require('../../Modules/drive/redux').reducer,
    loc: require('../../Modules/loc/redux').reducer,
    request: require('../../Modules/request/redux').reducer,
    users: require('../../Modules/users/redux').reducer,
    ui: require('../../Modules/ui/redux').reducer,
    nav: require('../../Modules/nav/redux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
