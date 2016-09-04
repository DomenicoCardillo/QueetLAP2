import * as types from '../actions/types'

const auth = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.SIGNUP_START:
      newState.signup.isLoading = true
      newState.signup.hasError = false
      return newState

    case types.SIGNUP_SUCCESS:
      newState.signup.isLoading = false
      newState.signup.signupDone = true
      return newState

    case types.SIGNUP_FAILED:
      newState.signup.isLoading = false
      newState.signup.hasError = true
      newState.signup.errorMessage = action.error.message
      return newState

    case types.LOGIN_START:
      newState.login.isLoading = true
      return newState

    case types.LOGIN_SUCCESS:
      newState.login.isLoading = false
      newState.currentUser = action.payload
      return newState

    case types.LOGIN_FAILED:
      newState.login.isLoading = false
      newState.login.hasError = true
      newState.login.errorMessage = action.error.message
      return newState

    case types.LOGOUT_START:
      newState.logout.isLoading = true
      return newState
    
    case types.LOGOUT_SUCCESS:
      newState.logout.isLoading = false
      newState.currentUser = null
      return newState

    case types.REAUTHENTICATE_START:
      newState.login.isLoading = true
      return newState

    case types.REAUTHENTICATE_SUCCESS:
      newState.login.isLoading = false
      newState.currentUser = action.payload
      return newState

    case types.REAUTHENTICATE_FAILED:
      newState.login.isLoading = false
      return newState

    default:
      return state
  }
}

export default auth