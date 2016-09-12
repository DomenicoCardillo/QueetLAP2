import * as types from '../actions/types'

const auth = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.SIGNUP_START:
      newState.signupPage.isLoading = true
      newState.signupPage.hasError = false
      return newState

    case types.SIGNUP_SUCCESS:
      newState.signupPage.isLoading = false
      newState.signupPage.signupDone = true
      return newState

    case types.SIGNUP_FAILED:
      newState.signupPage.isLoading = false
      newState.signupPage.hasError = true
      newState.signupPage.errorMessage = action.error.message
      return newState

    case types.LOGIN_START:
      newState.loginPage.isLoading = true
      return newState

    case types.LOGIN_SUCCESS:
      newState.loginPage.isLoading = false
      newState.currentUser = action.payload
      return newState

    case types.LOGIN_FAILED:
      newState.loginPage.isLoading = false
      newState.loginPage.hasError = true
      newState.loginPage.errorMessage = action.error.message
      return newState

    case types.LOGOUT_START:
      newState.logout.isLoading = true
      return newState
    
    case types.LOGOUT_SUCCESS:
      newState.logout.isLoading = false
      newState.currentUser = null
      return newState

    case types.REAUTHENTICATE_START:
      newState.loginPage.isLoading = true
      return newState

    case types.REAUTHENTICATE_SUCCESS:
      newState.loginPage.isLoading = false
      newState.currentUser = action.payload
      return newState

    case types.REAUTHENTICATE_FAILED:
      newState.loginPage.isLoading = false
      return newState

    default:
      return state
  }
}

export default auth