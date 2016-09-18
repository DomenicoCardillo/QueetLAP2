import { connect } from 'react-redux'
import { sendResetPasswordEmail } from '../actions/auth'
import ForgotPasswordPage from '../components/forgotPasswordPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.forgotPasswordPage.isLoading,
    hasError: state.auth.forgotPasswordPage.hasError,
    errorMessage: state.auth.forgotPasswordPage.errorMessage,
    sendDone: state.auth.forgotPasswordPage.sendDone
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (email) => {
      dispatch(sendResetPasswordEmail(email))
    },
    goToLogin: () => {
      Actions.login()
    }
  }
}

const ForgotPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordPage)

export default ForgotPassword