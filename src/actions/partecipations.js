import * as types from './types'

import {
  dbEventsRef,
  dbNotificationsRef,
  findBy
} from '../globals'

export const requestPartecipation = (event) => {
  return (dispatch, getState) => {
    let currentUserId = getState().auth.currentUser.id
    dispatch(requestPartecipationStart())

    let updates = {}
    updates['/' + event.id + '/users/' + currentUserId] = false //wait for confirmation
    dbEventsRef.update(updates, (error) => {
      if(error) dispatch(requestPartecipationFailed(error))
      else      dispatch(requestPartecipationSuccess(event.id))
    })

    let notification = {
      from: currentUserId,
      to: event.creator.id,
      read: false,
      type: 'requestPartecipation',
      event: event.id,
      dateTime: new Date().getTime()
    }
    
    dbNotificationsRef.push(notification)
  }
}

export const responsePartecipation = (userId, event, response) => {
  return (dispatch, getState) => {
    let currentUserId = getState().auth.currentUser.id
    dispatch(responsePartecipationStart())

    let updates = {}
    updates['/' + event.id + '/users/' + userId] = response ? true : null
    dbEventsRef.update(updates, (error) => {
      if(error) dispatch(responsePartecipationFailed(error))
      else      dispatch(responsePartecipationSuccess({userId, response}))
    })

    let notification = {
      from: currentUserId,
      to: userId,
      read: false,
      response: response,
      type: 'responsePartecipation',
      event: event.id,
      dateTime: new Date().getTime()
    }

    dbNotificationsRef.push(notification)
  }
}

export const removePartecipation = (event, userId) => {
  return (dispatch, getState) => {
    let currentUserId = getState().auth.currentUser.id
    dispatch(removePartecipationStart())
    if(event.creator.id == currentUserId) {
      // I am the event creator and I remove a partecipants (with id = userId)
      var idToRemove = userId
      var notification = {
        from: currentUserId,
        target: userId,
        read: false,
        type: 'removePartecipation',
        event: event.id,
        dateTime: new Date().getTime()
      }
    } else {
      // I am a partecipant and I leave the event
      var idToRemove = currentUserId
      var notification = {
        from: currentUserId,
        read: false,
        type: 'removeMyPartecipation',
        event: event.id,
        dateTime: new Date().getTime()
      }
    }

    let updates = {}
    updates['/' + event.id + '/users/' + idToRemove] = null
    dbEventsRef.update(updates, (error) => {
      if(error) dispatch(removePartecipationFailed(error))
      else      dispatch(removePartecipationSuccess(idToRemove))
    })

    for (var uid in event.users) {
      if (event.users[uid] && uid !== currentUserId) {
        notification.to = uid
        dbNotificationsRef.push(notification)
      }
    }
  }
}

export const requestPartecipationStart = () => {
  return {
    type: types.REQUEST_PARTECIPATION_START
  }
}

export const requestPartecipationSuccess = (payload) => {
  return {
    type: types.REQUEST_PARTECIPATION_SUCCESS,
    payload
  }
}

export const requestPartecipationFailed = (error) => {
  return {
    type: types.REQUEST_PARTECIPATION_FAILED,
    error
  }
}

export const responsePartecipationStart = () => {
  return {
    type: types.RESPONSE_PARTECIPATION_START
  }
}

export const responsePartecipationSuccess = (payload) => {
  return {
    type: types.RESPONSE_PARTECIPATION_SUCCESS,
    payload
  }
}

export const responsePartecipationFailed = (error) => {
  return {
    type: types.RESPONSE_PARTECIPATION_FAILED,
    error
  }
}

export const removePartecipationStart = () => {
  return {
    type: types.REMOVE_PARTECIPATION_START
  }
}

export const removePartecipationSuccess = (payload) => {
  return {
    type: types.REMOVE_PARTECIPATION_SUCCESS,
    payload
  }
}

export const removePartecipationFailed = (error) => {
  return {
    type: types.REMOVE_PARTECIPATION_FAILED,
    error
  }
}