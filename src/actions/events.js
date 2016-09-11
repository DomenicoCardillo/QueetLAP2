import * as types from './types'
import { 
  firebaseAuth, 
  dbUsersRef, 
  firebaseDB, 
  dbEventsRef,
  formatDate,
  fromObjToArray,
  sortArrayByProps,
  filterByDateTime,
  defaultSizeList,
  removeDuplicateByKey
} from '../globals'
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

export const fetchEvents = (filter, limit = defaultSizeList) => {
  return (dispatch, getState) => {
    dispatch(fetchEventsStart())
    const state = getState()
    let events = []
    let lastKey = ''
    limit = limit > 0 ? limit : defaultSizeList
    switch (filter) {
      case 'New':
        dbEventsRef.orderByKey().limitToLast(limit).once('value').then(function(snapshot) {
          events = fromObjToArray(snapshot.val())
          sortArrayByProps(events, 'desc', 'keyId')
          events = filterByDateTime(events)
          lastKey = events.length > 0 ? events[events.length - 1].keyId : lastKey
          dispatch(fetchEventsSuccess(events, lastKey))
        }).catch(function(error){
          dispatch(fetchEventsFailed(error))
        })
        break
      case 'Next':
        dbEventsRef.orderByChild('dateTime').startAt(new Date().getTime()).limitToFirst(limit)
        .once('value').then(function(snapshot) {
          events = fromObjToArray(snapshot.val())
          sortArrayByProps(events, 'asc', 'dateTime')
          lastKey = events.length > 0 ? events[events.length - 1].dateTime : lastKey
          dispatch(fetchEventsSuccess(events, lastKey))
        }).catch(function(error){
          dispatch(fetchEventsFailed(error))
        })
        break
      case 'Near':
        dbEventsRef.orderByChild('shortPlace').equalTo(state.auth.currentUser.shortPlace)
        .limitToFirst(limit).once('value').then(function(snapshot) {
          events = fromObjToArray(snapshot.val())
          sortArrayByProps(events, 'asc', 'dateTime')
          events = filterByDateTime(events)
          lastKey = events.length > 0 ? events[events.length - 1].dateTime : lastKey
          dispatch(fetchEventsSuccess(events, lastKey))
        }).catch(function(error){
          dispatch(fetchEventsFailed(error))
        })
        break
      case 'Ended':
        dbEventsRef.orderByChild('dateTime').endAt(new Date().getTime()).limitToLast(limit)
        .once('value').then(function(snapshot) {
          events = fromObjToArray(snapshot.val())
          sortArrayByProps(events, 'desc', 'dateTime')
          lastKey = events.length > 0 ? events[events.length - 1].dateTime : new Date().getTime()
          dispatch(fetchEventsSuccess(events, lastKey))
        }).catch(function(error){
          dispatch(fetchEventsFailed(error))
        })
        break
      default:
        break
    }
  }
}

export const fetchEventsStart = () => {
  return {
    type: types.FETCH_EVENTS_START
  }
}

export const fetchEventsSuccess = (events, lastKey) => {
  return {
    type: types.FETCH_EVENTS_SUCCESS,
    payload: {events: events, lastKey: lastKey}
  }
}

export const fetchEventsFailed = (error) => {
  return {
    type: types.FETCH_EVENTS_FAILED,
    error
  }
}

export const fetchMoreEvents = (filter, limit = defaultSizeList) => {
  return (dispatch, getState) => {
    dispatch(fetchMoreEventsStart())
    const state = getState()
    const eventsKeys = state.events.map((el) => { return el.keyId })
    let events = []
    let lastKey = state.event.lastKey
    switch (filter) {
      case 'New':
        dbEventsRef.orderByKey().limitToLast(limit).endAt(lastKey)
        .once('value').then(function(snapshot) {
          events = fromObjToArray(snapshot.val())
          sortArrayByProps(events, 'desc', 'keyId')
          events = removeDuplicateByKey(events, eventsKeys)
          events = filterByDateTime(events)
          lastKey = events.length > 0 ? events[events.length - 1].keyId : lastKey
          dispatch(fetchMoreEventsSuccess(events, lastKey))
        }).catch(function(error){
          dispatch(fetchMoreEventsFailed(error))
        })
        break
      case 'Next':
        dbEventsRef.orderByChild('dateTime').startAt(lastKey).limitToFirst(limit)
        .once('value').then(function(snapshot) {
          events = fromObjToArray(snapshot.val())
          sortArrayByProps(events, 'asc', 'dateTime')
          events = removeDuplicateByKey(events, eventsKeys)
          lastKey = events.length > 0 ? events[events.length - 1].dateTime : lastKey
          dispatch(fetchMoreEventsSuccess(events, lastKey))
        }).catch(function(error){
          dispatch(fetchMoreEventsFailed(error))
        })
        break
      case 'Near':
        dbEventsRef.orderByChild('shortPlace').equalTo(state.auth.currentUser.shortPlace)
        .limitToFirst(events.length + limit).once('value').then(function(snapshot) {
          events = fromObjToArray(snapshot.val())
          sortArrayByProps(events, 'asc', 'dateTime')
          events = events.slice(events.length)
          events = removeDuplicateByKey(events, eventsKeys)
          events = filterByDateTime(events)
          lastKey = events.length > 0 ? events[events.length - 1].keyId : lastKey
          dispatch(fetchMoreEventsSuccess(events, lastKey))
        }).catch(function(error){
          dispatch(fetchMoreEventsFailed(error))
        })
        break
      case 'Ended':
        dbEventsRef.orderByChild('dateTime').endAt(lastKey).limitToLast(limit)
        .once('value').then(function(snapshot) {
          events = fromObjToArray(snapshot.val())
          sortArrayByProps(events, 'desc', 'dateTime')
          events = removeDuplicateByKey(events, eventsKeys)
          lastKey = events.length > 0 ? events[events.length - 1].dateTime : new Date().getTime()
          dispatch(fetchMoreEventsSuccess(events, lastKey))
        }).catch(function(error){
          dispatch(fetchMoreEventsFailed(error))
        })
        break
      default:
        break
    }
  }
}

export const fetchMoreEventsStart = () => {
  return {
    type: types.FETCH_MORE_EVENTS_START
  }
}

export const fetchMoreEventsSuccess = (events, lastKey) => {
  return {
    type: types.FETCH_MORE_EVENTS_SUCCESS,
    payload: {events: events, lastKey: lastKey}
  }
}

export const fetchMoreEventsFailed = (error) => {
  return {
    type: types.FETCH_MORE_EVENTS_FAILED,
    error
  }
}

export const listenChanges = () => {
  return (dispatch) => {
    dbEventsRef.on('child_changed', function(childSnapshot, prevChildKey) {
      dispatch(applyEventChanges({id: childSnapshot.key, newValue: childSnapshot.val()}))
    })
  }
}

export const applyEventChanges = (payload) => {
  return {
    type: types.APPLY_EVENT_CHANGES,
    payload
  }
}

//export const 

export const fetchMyEvents = (ordeByKey = false, limit = 5) => {
  return (dispatch) => {
    dispatch(fetchEventsStart())
    if(ordeByKey){
      dbEventsRef.orderByKey().limitToLast(limit).once('value').then(function(snapshot) {
        dispatch(fetchEventsSuccess(snapshot.val()))
      }).catch(function(error){
        dispatch(fetchEventsFailed(error))
      })
    } else {
      dbEventsRef.orderByChild('date').startAt(formatDate(new Date())).limitToFirst(limit)
      .once('value').then(function(snapshot) {
        dispatch(fetchEventsSuccess(snapshot.val()))
      }).catch(function(error){
        dispatch(fetchEventsFailed(error))
      })
    }
  }
}
/*
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
}*/