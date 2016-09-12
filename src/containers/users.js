import { connect } from 'react-redux'
import UsersPage from '../components/usersPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage)

export default Users