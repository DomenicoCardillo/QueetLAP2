import { connect } from 'react-redux'
import UsersPage from '../components/usersPage'
import { Actions } from 'react-native-router-flux'
import { fetchUsers, listenUsersChanges, setUserDetail } from '../actions/users'

const mapStateToProps = (state) => {
  return {
    users: state.users,
    isLoading: state.usersPage.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers())
    },
    listenUsersChanges: () => {
      dispatch(listenUsersChanges())
    },
    setUserDetail: (user) => {
      dispatch(setUserDetail(user))
      Actions.user()
    }
  }
}

const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage)

export default Users