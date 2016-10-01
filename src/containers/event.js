import { connect } from 'react-redux'
import EventPage from '../components/eventPage'
import { requestPartecipation, responsePartecipation, removePartecipation } from '../actions/partecipations'
import { mergeDeep } from '../globals'

const hydrateEvent = (event, currentUser, users, isMyEvent) => {
  if(!event.users) {
    event.users = {}
    return event
  }

  if(!isMyEvent){
    if(event.users[currentUser.id] != undefined){
      event.users[currentUser.id] = {
        id: currentUser.id,
        fullName: 'You',
        needConfirm: !(event.users[currentUser.id] === true)
      }
    }
  }
  users.filter(user => {
    return event.users.hasOwnProperty(user.id) && event.users[user.id] !== undefined
  }).forEach(user => {
    event.users[user.id] = {
      id: user.id,
      fullName: user.id == currentUser.id ? 'You' : 
        user.firstname ? user.firstname + ' ' + user.lastname : user.email,
      needConfirm: !(event.users[user.id] == true)
    }
  })
  if(event.creator.id == currentUser.id)  event.creator.name = 'You'
  return event
}

const mapStateToProps = (state) => {
  var wathRender = {}
  let currentUser = state.auth.currentUser
  let event = mergeDeep({}, state.events[state.eventPage.eventIndex])
  let isMyEvent = event.creator.id == currentUser.id
  event = hydrateEvent(event, currentUser, state.users, isMyEvent)

  if(event.dateTime > new Date().getTime()) {
    if(isMyEvent) wathRender.usersActions = true
    if(event.users[currentUser.id] && !event.users[currentUser.id].needConfirm) 
      wathRender.removePartecipation = true
    if(event.users[currentUser.id] && event.users[currentUser.id].needConfirm)
      wathRender.waitResponse = true
    if(event.users[currentUser.id] === undefined && event.creator.id !== currentUser.id) 
      wathRender.addPartecipation = true
    if(Object.keys(event.users).length + 1 >= event.maxPartecipants) wathRender.limitReached = true
  }

  return {
    categories: state.categories,
    currentUser,
    event,
    wathRender,
    isLoading: state.eventPage.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestPartecipation: (event) => {
      dispatch(requestPartecipation(event))
    },
    responsePartecipation: (userId, event, response) => {
      dispatch(responsePartecipation(userId, event, response))
    },
    removePartecipation: (event, userId) => {
      dispatch(removePartecipation(event, userId))
    }
  }
}

const Event = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage)

export default Event