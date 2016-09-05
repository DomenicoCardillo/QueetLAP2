import * as types from './types'
import { firebaseAuth, dbUsersRef, firebaseDB, dbEventsRef } from '../globals'
import { AsyncStorage } from 'react-native'

import { Actions } from 'react-native-router-flux'

export const createEvent = (event) => {
  return (dispatch) => {
    dispatch(createEventStart())
    let eventRef = dbEventsRef.push()
    eventRef.set(event, (error) => {
      if(error) dispatch(createEventFailed(error))
      else {
        event.id = eventRef.key
        dispatch(createEventSuccess(event))
        Actions.pop()
      }
    })
  }
}

export const createEventStart = () => {
  return {
    type: types.CREATE_EVENT_START
  }
}

export const createEventSuccess = (payload) => {
  return {
    type: types.CREATE_EVENT_SUCCESS,
    payload
  }
}

export const createEventFailed = (error) => {
  return {
    type: types.CREATE_EVENT_FAILED,
    error
  }
}

export const updateEvent = (event) => {
  return (dispatch) => {
    dispatch(updateEventStart())
    let updates = {}
    updates['/' + event.id] = event
    dbEventsRef.update(updates, (error) => {
      if(error) dispatch(updateEventFailed(error))
      else      dispatch(updateEventSuccess(event))
    })
  }
}

export const updateEventStart = () => {
  return {
    type: types.UPDATE_EVENT_START
  }
}

export const updateEventSuccess = (payload) => {
  return {
    type: types.UPDATE_EVENT_SUCCESS,
    payload
  }
}

export const updateEventFailed = (error) => {
  return {
    type: types.UPDATE_EVENT_FAILED,
    error
  }
}

export const fetchEvents = () => {
  return (dispatch) => {
    dispatch(fetchEventsStart())
    dbEventsRef.limitToLast(10).once('value').then(function(snapshot) {
      dispatch(fetchEventsSuccess(snapshot.val()))
    }).catch(function(error){
      dispatch(fetchEventsFailed(error))
    })
  }
}

export const fetchEventsStart = () => {
  return {
    type: types.FETCH_EVENTS_START
  }
}

export const fetchEventsSuccess = (payload) => {
  return {
    type: types.FETCH_EVENTS_SUCCESS,
    payload
  }
}

export const fetchEventsFailed = (error) => {
  return {
    type: types.FETCH_EVENTS_FAILED,
    error
  }
}