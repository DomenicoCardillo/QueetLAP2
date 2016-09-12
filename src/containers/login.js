import { connect } from 'react-redux'
import { login } from '../actions/auth'
import LoginPage from '../components/loginPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.loginPage.isLoading,
    hasError: state.auth.loginPage.hasError,
    errorMessage: state.auth.loginPage.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (email, pass) => {
      dispatch(login(email, pass))
    },
    goToSignup: () => {
      Actions.signup()
    }
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default Login