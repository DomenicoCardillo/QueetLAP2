import { connect } from 'react-redux'
import AppPage from '../components/appPage'
import { Actions } from 'react-native-router-flux'
import { setUserDetail } from '../actions/users'
import { setEventDetail } from '../actions/events'

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
    },
    setEventDetail: (event) => {
      dispatch(setEventDetail(event))
      Actions.event()
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPage)

export default App