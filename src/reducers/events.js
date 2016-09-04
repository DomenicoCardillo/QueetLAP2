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
      newState.events[action.payload.id] = action.payload
      return newState

    case types.CREATE_EVENT_FAILED:
      newState.event.isLoading = false
      newState.event.hasError = true
      newState.event.errorMessage = action.error.message
      return newState

    default:
      return state
  }
}

export default events