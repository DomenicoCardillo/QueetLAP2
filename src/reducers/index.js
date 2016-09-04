import auth from './auth'
import profile from './profile'
import categories from './categories'

import { combineReducers } from 'redux'


const rootReducer = (state = {}, action) => {
  let newState = {}

  newState.auth = auth(state.auth, action)

  let newProfile = profile({profile: state.profile, auth: newState.auth}, action)
  newState.profile = newProfile.profile
  newState.auth.currentUser = newProfile.auth.currentUser

  newState.categories = categories(state.categories, action)
  
  return newState
}

export default rootReducer