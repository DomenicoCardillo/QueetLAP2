import { connect } from 'react-redux'
import EventPage from '../components/eventPage'
import { Actions } from 'react-native-router-flux'
import { requestPartecipation, responsePartecipation, removePartecipation } from '../actions/partecipations'

const hydrateEvent = (event, currentUser, users, isMyEvent) => {
  if(!event.users) {
    event.users = {}
    return event
  }

  if((!isMyEvent && event.users[currentUser.id])){
    event.users[currentUser.id] = {
      id: currentUser.id,
      fullName: 'You',
      needConfirm: false,
      canRemove: false
    }
  }
  let eventUsers = users.filter(user => {
    return event.users.hasOwnProperty(user.id)
      && (isMyEvent || event.users[user.id])
  }).map(user => {
    return {
      id: user.id,
      fullName: user.id == currentUser.id ? 'You' : user.firstname + ' ' + user.lastname,
      needConfirm: !event.users[user.id],
      canRemove: event.users[user.id]
    }
  })
  event.users = Object.assign({}, event.users, eventUsers)
  if(event.creator.id == currentUser.id)  event.creator.name = 'You'
  return event
}

const mapStateToProps = (state) => {
  var wathRender = {}
  let currentUser = state.auth.currentUser
  let event = Object.assign({}, state.events[state.eventPage.eventIndex])
  let isMyEvent = event.creator.id == currentUser.id
  event = hydrateEvent(event, currentUser, state.users, isMyEvent)

  if(event.dateTime > new Date().getTime()) {
    if(isMyEvent){
      wathRender.usersActions = true
    } else if(event.users[currentUser.id]){
      wathRender.removePartecipation = true
    } else if(event.users[currentUser.id] === undefined){
      wathRender.addPartecipation = true
    } else {
      wathRender.waitResponse = true
    }
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
    removePartecipation: (event, userId = null) => {
      dispatch(removePartecipation(event, userId = null))
    }
  }
}

const Event = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage)

export default Event