import * as types from '../actions/types'

const friendships = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.ADD_FRIENDSHIP_START:
    case types.CONFIRM_FRIENDSHIP_START:
      newState.userPage.isLoadingPrimary = true
      newState.userPage.hasError = false
      return newState

    case types.ADD_FRIENDSHIP_SUCCESS:
    case types.CONFIRM_FRIENDSHIP_SUCCESS:
      newState.userPage.isLoadingPrimary = false
      newState.auth.currentUser.friends = !newState.auth.currentUser.friends ? {} : newState.auth.currentUser.friends
      newState.auth.currentUser.friends[action.payload] = true
      return newState

    case types.ADD_FRIENDSHIP_FAILED:
    case types.CONFIRM_FRIENDSHIP_FAILED:
      newState.userPage.isLoadingPrimary = false
      newState.userPage.hasError = true
      newState.userPage.errorMessage = action.error.message
      return newState

    case types.REMOVE_FRIENDSHIP_START:
      newState.userPage.isLoadingPrimary = true
      newState.userPage.hasError = false
      return newState

    case types.REMOVE_FRIENDSHIP_SUCCESS:
      newState.userPage.isLoadingPrimary = false
      delete newState.auth.currentUser.friends[action.payload.userId]
      return newState

    case types.REMOVE_FRIENDSHIP_FAILED:
      newState.userPage.isLoadingPrimary = false
      newState.userPage.hasError = true
      newState.userPage.errorMessage = action.error.message
      return newState

    case types.REJECT_FRIENDSHIP_START:
      newState.userPage.isLoadingSecondary = true
      newState.userPage.hasError = false
      return newState

    case types.REJECT_FRIENDSHIP_SUCCESS:
      newState.userPage.isLoadingSecondary = false

    default:
      return state
  }
}

export default friendships