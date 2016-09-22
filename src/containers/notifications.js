import { connect } from 'react-redux'
import NotificationsPage from '../components/notificationsPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const Notifications = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPage)

export default Notifications