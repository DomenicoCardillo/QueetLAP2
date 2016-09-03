import * as types from '../actions/types'
import * as globals from '../globals'

const profile = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.UPDATE_PROFILE_START:
      newState.profile.isLoading = true
      newState.profile.hasError = false
      return newState

    case types.UPDATE_PROFILE_SUCCESS:
      newState.profile.isLoading = false
      newState.auth.currentUser = action.payload
      return newState

    case types.UPDATE_PROFILE_FAILED:
      newState.profile.isLoading = false
      newState.profile.hasError = true
      newState.profile.errorMessage = action.error.message
      return newState

    default:
      return state
  }
}

export default profile