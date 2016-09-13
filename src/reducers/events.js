import * as types from '../actions/types'

const events = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.CREATE_EVENT_START:
      newState.eventPage.isLoading = true
      newState.eventPage.hasError = false
      return newState

    case types.CREATE_EVENT_SUCCESS:
      newState.eventPage.isLoading = false
      newState.eventPage.event = undefined
      newState.events.push(action.payload)
      return newState

    case types.CREATE_EVENT_FAILED:
      newState.eventPage.isLoading = false
      newState.eventPage.hasError = true
      newState.eventPage.errorMessage = action.error.message
      return newState

    case types.FETCH_EVENTS_START:
      newState.eventsPage.isLoading = true
      newState.eventsPage.hasError = false
      newState.myEventsPage.isLoading = true
      newState.myEventsPage.hasError = false
      return newState

    case types.FETCH_EVENTS_SUCCESS:
      newState.eventsPage.isLoading = false
      newState.myEventsPage.isLoading = false
      newState.events = action.payload
      return newState

    case types.FETCH_EVENTS_FAILED:
      newState.eventsPage.isLoading = false
      newState.eventsPage.hasError = true
      newState.eventsPage.errorMessage = action.error.message
      newState.myEventsPage.isLoading = false
      newState.myEventsPage.hasError = true
      newState.myEventsPage.errorMessage = action.error.message
      return newState

    case types.SET_EVENTS_ACTIVE_FILTER:
      newState.eventsPage.activeFilter = action.payload
      return newState
      
    case types.SET_MY_EVENTS_ACTIVE_FILTER:
      newState.myEventsPage.activeFilter = action.payload
      return newState

    case types.APPLY_EVENT_CHANGES:
      newState.events[action.payload.index] = action.payload.newValue
      return newState

    case types.SET_EVENT_DETAIL:
      newState.eventPage.event = action.payload

    default:
      return state
  }
}

export default events