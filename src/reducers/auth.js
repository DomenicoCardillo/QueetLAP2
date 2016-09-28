import * as types from '../actions/types'

const auth = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.SIGNUP_START:
      newState.auth.signupPage.isLoading = true
      newState.auth.signupPage.hasError = false
      return newState

    case types.SIGNUP_SUCCESS:
      newState.auth.signupPage.isLoading = false
      newState.auth.signupPage.signupDone = true
      return newState

    case types.SIGNUP_FAILED:
      newState.auth.signupPage.isLoading = false
      newState.auth.signupPage.hasError = true
      newState.auth.signupPage.errorMessage = action.error.message
      return newState

    case types.LOGIN_START:
      newState.auth.loginPage.isLoading = true
      return newState

    case types.LOGIN_SUCCESS:
      newState.auth.loginPage.isLoading = false
      newState.auth.currentUser = action.payload
      newState.auth.loginPage.hasError = false
      return newState

    case types.LOGIN_FAILED:
      newState.auth.loginPage.isLoading = false
      newState.auth.loginPage.hasError = true
      newState.auth.loginPage.errorMessage = action.error.message
      return newState

    case types.LOGOUT_START:
      newState.profilePage.isLoading = true
      return newState
    
    case types.LOGOUT_SUCCESS:
      newState.profilePage.isLoading = false
      newState.auth.currentUser = null
      newState.notifications = null
      newState.auth.loginPage.logoutSuccess = true
      return newState

    case types.SEND_RESET_PASSWORD_EMAIL_START:
      newState.auth.forgotPasswordPage.isLoading = true
      return newState

    case types.SEND_RESET_PASSWORD_EMAIL_SUCCESS:
      newState.auth.forgotPasswordPage.isLoading = false
      return newState

    case types.SEND_RESET_PASSWORD_EMAIL_FAILED:
      newState.auth.forgotPasswordPage.isLoading = false
      newState.auth.forgotPasswordPage.hasError = true
      newState.auth.forgotPasswordPage.errorMessage = action.error.message
      return newState

    case types.REAUTHENTICATE_START:
      newState.auth.loginPage.isLoading = true
      return newState

    case types.REAUTHENTICATE_SUCCESS:
      newState.auth.loginPage.isLoading = false
      newState.auth.currentUser = action.payload
      return newState

    case types.REAUTHENTICATE_FAILED:
      newState.auth.loginPage.isLoading = false
      return newState

    default:
      return state
  }
}

export default auth