import { connect } from 'react-redux'
import AppPage from '../components/appPage'
import { Actions } from 'react-native-router-flux'
import { setUserDetail } from '../actions/users'

const mapStateToProps = (state) => {
  return {
      state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserDetail: (user) => {
      dispatch(setUserDetail(user))
      Actions.user()
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPage)

export default App