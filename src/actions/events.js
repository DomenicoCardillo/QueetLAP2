import * as types from './types'
import {
  dbEventsRef,
  dbNotificationsRef,
  fromObjToArray,
  findBy
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
          event.users = {}
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

export const updateEvent = (event, eventId) => {
  return (dispatch, getState) => {
    let currentUserId = getState().auth.currentUser.id
    dispatch(updateEventStart())
    
    var notification = {
      from: currentUserId,
      read: false,
      type: 'eventUpdated',
      event: eventId,
      dateTime: new Date().getTime()
    }

    dbNotificationsRef.push(notification, (error) => {
      if(error) dispatch(removePartecipationFailed(error))
      else {
        let updates = {}
        updates['/' + eventId] = event
        dbEventsRef.update(updates, (error) => {
          if(error) dispatch(updateEventFailed(error))
          else {
            event.id = eventId
            dispatch(updateEventSuccess(event))
            dispatch(setEventDetail(event))
            Actions.pop()
          }
        })
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

export const setEventDetail = (payload, redirect = false) => {
  return (dispatch, getState) => {
    let eventIndex = payload ? findBy('id', payload.id, getState().events, true) : null
    dispatch({
      type: types.SET_EVENT_DETAIL,
      payload: eventIndex
    })
    if(redirect){
      if(payload.creator.id == getState().auth.currentUser.id && payload.dateTime > new Date().getTime()){
        Actions.event({
          rightTitle: 'Edit',
          rightButtonTextStyle: {   
            color: '#fff',
            fontSize: 16,
            top: 2
          },
          onRight: () => Actions.eventForm()
        })
      } else Actions.event()
    }
  }
}

export const listenEventsChanges = () => {
  return (dispatch, getState) => {
    dbEventsRef.on('child_changed', function(childSnapshot) {
      let events = getState().events
      let eventChangedIndex = events.findIndex(x => x.id == childSnapshot.key)
      let newEventValue = childSnapshot.val()
      newEventValue.id = childSnapshot.key
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

export const setCategoryFilter = (payload) => {
  return {
    type: types.SET_CATEGORY_FILTER,
    payload
  }
}