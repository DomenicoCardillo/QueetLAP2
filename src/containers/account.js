import { connect } from 'react-redux'
import AccountPage from '../components/accountPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {

  let stringedCategories = ''
  state.categories.forEach((cat) => {
    if(state.auth.currentUser.categories.indexOf(cat.id) >= 0){
      stringedCategories += cat.name + ', '
    }
  })

  let currentUser = Object.assign({}, state.auth.currentUser)
  currentUser.stringedCategories = stringedCategories.slice(0, -2)

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