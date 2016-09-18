import { connect } from 'react-redux'
import UsersPage from '../components/usersPage'
import { Actions } from 'react-native-router-flux'
import { fetchUsers, listenUsersChanges, setUserDetail, setUsersActiveFilter } from '../actions/users'
import { filterByFriends } from '../globals'

const getVisibleUsers = (users, currentUser, activeFilter) => {
  return filterByFriends(users, currentUser, activeFilter == 'Friends')
}

const mapStateToProps = (state) => {
  return {
    users: getVisibleUsers(state.users, state.auth.currentUser, state.usersPage.activeFilter),
    isLoading: state.usersPage.isLoading,
    activeFilter: state.usersPage.activeFilter
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
    setFilter: (filter) => {
      dispatch(setUsersActiveFilter(filter))
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