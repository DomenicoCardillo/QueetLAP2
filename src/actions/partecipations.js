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
    let notification = {
      from: currentUserId,
      to: event.creator.id,
      seen: false,
      type: 'requestPartecipation',
      event: event.keyId
    }
    dbNotificationsRef.push(notification, (error) => {
      if(error) dispatch(requestPartecipationFailed(error))
      else {
        let updates = {}
        updates['/' + event.keyId + '/users/' + currentUserId] = false //wait for confirmation
        dbEventsRef.update(updates, (error) => {
          if(error) dispatch(requestPartecipationFailed(error))
          else      dispatch(requestPartecipationSuccess(event.keyId))
        })
      }
    })
  }
}

export const responsePartecipation = (userId, event, response) => {
  return (dispatch, getState) => {
    let currentUserId = getState().auth.currentUser.id
    dispatch(confirmPartecipationStart())
    let notification = {
      from: currentUserId,
      to: userId,
      seen: false,
      response: response,
      type: 'responsePartecipation'
    }
    dbNotificationsRef.push(notification, (error) => {
      if(error) dispatch(responsePartecipationFailed(error))
      else {
        let updates = {}
        updates['/' + event.keyId + '/users/' + userId] = response ? true : null
        dbEventsRef.update(updates, (error) => {
          if(error) dispatch(responsePartecipationFailed(error))
          else      dispatch(responsePartecipationSuccess({userId, response}))
        })
      }
    })
  }
}

export const removePartecipation = (event, userId = null) => {
  return (dispatch, getState) => {
    let currentUserId = getState().auth.currentUser.id
    dispatch(removePartecipationStart())
    if(event.creator.id == currentUserId){
      //I am the event creator and I remove a partecipants (with id = userId)
      var notification = {
        from: currentUserId,
        to: userId,
        seen: false,
        type: 'removePartecipation'
      }
      var idToRemove = userId
    } else {
      //I am a partecipant and I leave the event
      var notification = {
        from: currentUserId,
        seen: false,
        type: 'removeMyPartecipation'
      }
      var idToRemove = currentUserId
    }
    dbNotificationsRef.push(notification, (error) => {
      if(error) dispatch(removePartecipationFailed(error))
      else {
        let updates = {}
        updates['/' + event.keyId + '/users/' + idToRemove] = null
        dbEventsRef.update(updates, (error) => {
          if(error) dispatch(removePartecipationFailed(error))
          else      dispatch(removePartecipationSuccess(idToRemove))
        })
      }
    })
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