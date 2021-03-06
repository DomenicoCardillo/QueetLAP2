import { connect } from 'react-redux'
import SplashPage from '../components/splashPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.loginPage.isLoading,
    hasError: state.auth.loginPage.hasError,
    errorMessage: state.auth.loginPage.errorMessage
  }
}

const mapDispatchToProps = () => {
  return {
    goToLogin: () => {
      Actions.login()
    },
    goToSignup: () => {
      Actions.signup()
    }
  }
}

const Splash = connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashPage)

export default Splash