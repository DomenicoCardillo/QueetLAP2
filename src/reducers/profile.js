import * as types from '../actions/types'

const profile = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.UPDATE_PROFILE_START:
      newState.profilePage.isLoading = true
      newState.profilePage.hasError = false
      return newState

    case types.UPDATE_PROFILE_SUCCESS:
      newState.profilePage.isLoading = false
      newState.auth.currentUser = action.payload
      return newState

    case types.UPDATE_PROFILE_FAILED:
      newState.profilePage.isLoading = false
      newState.profilePage.hasError = true
      newState.profilePage.errorMessage = action.error.message
      return newState

    default:
      return state
  }
}

export default profile