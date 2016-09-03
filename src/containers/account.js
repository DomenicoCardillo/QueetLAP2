import { connect } from 'react-redux'
import AccountPage from '../components/accountPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToForm: () => {
      Actions.userForm()
    }
  }
}

const Account = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPage)

export default Account