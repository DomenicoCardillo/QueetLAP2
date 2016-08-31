import { connect } from 'react-redux'
import { login } from '../actions/auth'
import LoginPage from '../components/loginPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.login.isLoading,
    hasError: state.auth.login.hasError,
    errorMessage: state.auth.login.errorMessage
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