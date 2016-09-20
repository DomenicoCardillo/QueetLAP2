import auth from './auth'
import profile from './profile'
import categories from './categories'
import events from './events'
import users from './users'
import friendships from './friendships'
import routes from './routes'
import partecipations from './partecipations'

const rootReducer = (state = {}, action) => {
  let newState = {}

  let authStuffs = auth({auth: state.auth, profilePage: state.profilePage}, action)
  newState.auth = authStuffs.auth
  newState.profilePage = authStuffs.profilePage

  let newProfile = profile({profilePage: state.profilePage, auth: newState.auth}, action)
  newState.profilePage = newProfile.profilePage
  newState.auth.currentUser = newProfile.auth.currentUser

  newState.categories = categories(state.categories, action)

  let eventsStuffs = events({
    events: state.events.slice(0), 
    eventsPage: state.eventsPage,
    myEventsPage: state.myEventsPage,
    eventPage: state.eventPage,
    auth: state.auth
  }, action)
  newState.events = eventsStuffs.events
  newState.eventsPage = eventsStuffs.eventsPage
  newState.myEventsPage = eventsStuffs.myEventsPage
  newState.eventPage = eventsStuffs.eventPage
  newState.auth = eventsStuffs.auth

  let usersStuffs = users({
    usersPage: state.usersPage, 
    users: state.users.slice(0),
    userPage: state.userPage
  }, action)
  newState.usersPage = usersStuffs.usersPage
  newState.users = usersStuffs.users
  newState.userPage = usersStuffs.userPage

  let friendshipsStuffs = friendships({
    auth: state.auth, 
    userPage: state.userPage, 
    users: newState.users.slice(0)
  }, action)
  newState.userPage = friendshipsStuffs.userPage
  newState.auth = friendshipsStuffs.auth
  newState.users = friendshipsStuffs.users

  let routingStuffs = routes({
    scene: state.scene
  }, action)

  newState.routes = routingStuffs

  let partecipationsStuffs = partecipations({auth: state.auth, eventPage: state.eventPage}, action)
  newState.auth = partecipationsStuffs.auth
  newState.eventPage = partecipationsStuffs.eventPage
  
  return newState
}

export default rootReducer