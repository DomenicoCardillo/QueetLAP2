import auth from './auth'
import profile from './profile'
import categories from './categories'
import events from './events'

import { combineReducers } from 'redux'


const rootReducer = (state = {}, action) => {
  let newState = {}

  newState.auth = auth(state.auth, action)

  let newProfile = profile({profile: state.profile, auth: newState.auth}, action)
  newState.profile = newProfile.profile
  newState.auth.currentUser = newProfile.auth.currentUser

  newState.categories = categories(state.categories, action)

  let eventsStuffs = events({
    events: state.events.slice(0), 
    eventsPage: state.eventsPage,
    myEventsPage: state.myEventsPage,
    eventPage: state.eventPage
  }, action)
  newState.events = eventsStuffs.events
  newState.eventsPage = eventsStuffs.eventsPage
  newState.myEventsPage = eventsStuffs.myEventsPage
  newState.eventPage = eventsStuffs.eventPage
  
  return newState
}

export default rootReducer