import * as types from '../actions/types'

const users = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.FETCH_USERS_START:
      newState.usersPage.isLoading = true
      newState.usersPage.hasError = false
      return newState

    case types.FETCH_USERS_SUCCESS:
      newState.usersPage.isLoading = false
      newState.users = action.payload
      return newState

    case types.FETCH_USERS_FAILED:
      newState.usersPage.isLoading = false
      newState.usersPage.hasError = true
      newState.usersPage.errorMessage = action.error.message
      return newState

    case types.APPLY_USER_CHANGES:
      if(action.payload.index) newState.users[action.payload.index] = action.payload.newValue
      return newState

    case types.SET_USER_DETAIL:
      newState.userPage.userIndex = action.payload
      return newState

    case types.SET_USERS_ACTIVE_FILTER:
      newState.usersPage.activeFilter = action.payload
      return newState

    default:
      return state
  }
}

export default users