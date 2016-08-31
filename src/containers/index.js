import React, { Component } from 'react'
import { Provider } from 'react-redux'
import App from './app'
import configureStore from '../store/config'
import { initialState } from '../globals'

const store = configureStore(initialState)

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default Index
