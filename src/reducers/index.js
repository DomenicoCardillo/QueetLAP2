import auth from './auth'

import { combineReducers } from 'redux'


const rootReducer = (state = {}, action) => {
  return {
    auth: auth(state.auth, action)
  }
}

export default rootReducer