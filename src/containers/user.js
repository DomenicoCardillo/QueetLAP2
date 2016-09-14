import { connect } from 'react-redux'
import UserPage from '../components/userPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  let user = Object.assign({}, state.userPage.user)
  let correctCat = state.categories[state.categories.findIndex(x => x.id == user.category)]
  user.stringedCategory = correctCat ? correctCat.name : null
  
  return {
    user: user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const User = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage)

export default User