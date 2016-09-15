import * as types from './types'
import {
  dbEventsRef,
  fromObjToArray,
} from '../globals'

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
          Actions.main()
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

export const updateEvent = (event, eventId) => {
  return (dispatch) => {
    dispatch(updateEventStart())
    let updates = {}
    updates['/' + eventId] = event
    dbEventsRef.update(updates, (error) => {
      console.log(updates)
      if(error) dispatch(updateEventFailed(error))
      else {
        event.keyId = eventId
        dispatch(updateEventSuccess(event))
        dispatch(setEventDetail(event))
        Actions.pop()
      }
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

    dbEventsRef.once('value').then(function(snapshot) {
      let events = fromObjToArray(snapshot.val())
      dispatch(fetchEventsSuccess(events))
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

export const setEventsActiveFilter = (payload) => {
  return {
    type: types.SET_EVENTS_ACTIVE_FILTER,
    payload
  }
}
export const setMyEventsActiveFilter = (payload) => {
  return {
    type: types.SET_MY_EVENTS_ACTIVE_FILTER,
    payload
  }
}

export const setEventDetail = (payload) => {
  return {
    type: types.SET_EVENT_DETAIL,
    payload
  }
}

export const listenEventsChanges = () => {
  return (dispatch, getState) => {
    dbEventsRef.on('child_changed', function(childSnapshot) {
      let events = getState().events
      let eventChangedIndex = events.findIndex(x => x.keyId == childSnapshot.key)
      let newEventValue = childSnapshot.val()
      newEventValue.keyId = childSnapshot.key
      dispatch(applyEventChanges({index: eventChangedIndex, newValue: newEventValue}))
    })
  }
}

export const applyEventChanges = (payload) => {
  return {
    type: types.APPLY_EVENT_CHANGES,
    payload
  }
}