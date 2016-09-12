import { connect } from 'react-redux'
import AccountPage from '../components/accountPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {

  let currentUser = Object.assign({}, state.auth.currentUser)
  currentUser.stringedCategory = state.categories
    .filter(cat => cat.id === currentUser.category)
    .map(cat => cat.name)

  return {
    currentUser: currentUser
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