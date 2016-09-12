import * as types from '../actions/types'

const events = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.CREATE_EVENT_START:
      newState.event.isLoading = true
      newState.event.hasError = false
      return newState

    case types.CREATE_EVENT_SUCCESS:
      newState.event.isLoading = false
      newState.events.push(action.payload)
      return newState

    case types.CREATE_EVENT_FAILED:
      newState.event.isLoading = false
      newState.event.hasError = true
      newState.event.errorMessage = action.error.message
      return newState

    case types.FETCH_EVENTS_START:
      newState.event.isLoading = true
      newState.event.hasError = false
      return newState

    case types.FETCH_EVENTS_SUCCESS:
      newState.event.isLoading = false
      newState.events = action.payload.events
      newState.event.lastKey = action.payload.lastKey
      return newState

    case types.FETCH_EVENTS_FAILED:
      newState.event.isLoading = false
      newState.event.hasError = true
      newState.event.errorMessage = action.error.message
      return newState

    case types.FETCH_MORE_EVENTS_START:
      newState.event.isLoading = true
      newState.event.hasError = false
      return newState

    case types.FETCH_MORE_EVENTS_SUCCESS:
      newState.event.isLoading = false
      newState.events = newState.events.concat(action.payload.events)
      newState.event.lastKey = action.payload.lastKey
      return newState

    case types.FETCH_MORE_EVENTS_FAILED:
      newState.event.isLoading = false
      newState.event.hasError = true
      newState.event.errorMessage = action.error.message
      return newState  

    case types.APPLY_EVENT_CHANGES:
      newState.events[action.payload.id] = action.payload.newValue
      return newState

    default:
      return state
  }
}

export default events