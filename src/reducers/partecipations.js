import * as types from '../actions/types'

const partecipations = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.REQUEST_PARTECIPATION_START:
      newState.eventPage.isLoading = true
      newState.eventPage.hasError = false
      return newState

    case types.REQUEST_PARTECIPATION_SUCCESS:
      newState.eventPage.isLoading = false
      newState.auth.currentUser.events = !newState.auth.currentUser.events ? {} : newState.auth.currentUser.events
      newState.auth.currentUser.events[action.payload] = false
      newState.eventPage.event.users[newState.auth.currentUser.id] = false
      return newState
    
    case types.REQUEST_PARTECIPATION_FAILED:
      newState.eventPage.isLoading = false
      newState.eventPage.hasError = true
      newState.eventPage.errorMessage = action.error.message

    case types.RESPONSE_PARTECIPATION_START:
      newState.eventPage.isLoading = true
      newState.eventPage.hasError = false
      return newState

    case types.RESPONSE_PARTECIPATION_SUCCESS:
      newState.eventPage.isLoading = false
      if(action.payload.response) delete newState.eventPage.event.users[action.payload.userId]
      else                        newState.eventPage.event.users[action.payload.userId] = true
      return newState
    
    case types.RESPONSE_PARTECIPATION_FAILED:
      newState.eventPage.isLoading = false
      newState.eventPage.hasError = true
      newState.eventPage.errorMessage = action.error.message

    case types.REMOVE_PARTECIPATION_START:
      newState.eventPage.isLoading = true
      newState.eventPage.hasError = false
      return newState

    case types.REMOVE_PARTECIPATION_SUCCESS:
      newState.eventPage.isLoading = false
      delete newState.eventPage.event.users[action.payload]
      return newState
    
    case types.REMOVE_PARTECIPATION_FAILED:
      newState.eventPage.isLoading = false
      newState.eventPage.hasError = true
      newState.eventPage.errorMessage = action.error.message
      return newState

    default:
      return state
  }
}

export default partecipations