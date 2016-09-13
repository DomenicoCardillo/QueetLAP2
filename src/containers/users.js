import { connect } from 'react-redux'
import UsersPage from '../components/usersPage'
import { Actions } from 'react-native-router-flux'
import { fetchUsers, listenUsersChanges } from '../actions/users'

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers())
    },
    listenUsersChanges: () => {
      dispatch(listenUsersChanges())
    }
  }
}

const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage)

export default Users