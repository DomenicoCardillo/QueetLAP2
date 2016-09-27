import { connect } from 'react-redux'
import AppPage from '../components/appPage'
import { reauthenticate } from '../actions/auth'
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
    },
    createNewEvent: () => {
      dispatch(setEventDetail(null))
      Actions.eventForm()
    },
    reauthenticate: (callback) => {
      dispatch(reauthenticate(callback))
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPage)

export default App