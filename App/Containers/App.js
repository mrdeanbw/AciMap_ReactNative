import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './_RootContainer'
import createStore from '../Redux'

export const store = createStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
