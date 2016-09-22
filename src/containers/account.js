import { connect } from 'react-redux'
import AccountPage from '../components/accountPage'
import { Actions } from 'react-native-router-flux'
import { logout } from '../actions/auth'

const mapStateToProps = (state) => {

  let currentUser = Object.assign({}, state.auth.currentUser)
  currentUser.stringedCategory = state.categories
    .filter(cat => cat.id === currentUser.category)
    .map(cat => cat.name)

  return {
    currentUser: currentUser,
    isLoading: state.profilePage.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToForm: () => {
      Actions.userForm()
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

const Account = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPage)

export default Account