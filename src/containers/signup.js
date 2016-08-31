import { connect } from 'react-redux'
import { signup } from '../actions/auth'
import SignupPage from '../components/signupPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.signup.isLoading,
    hasError: state.auth.signup.hasError,
    errorMessage: state.auth.signup.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (email, pass) => {
      dispatch(signup(email, pass))
    },
    goToLogin: () => {
      Actions.login()
    }
  }
}

const Signup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage)

export default Signup