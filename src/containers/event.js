import { connect } from 'react-redux'
import EventPage from '../components/eventPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    event: state.eventPage.event,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const Event = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage)

export default Event