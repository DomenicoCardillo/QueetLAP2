import { connect } from 'react-redux'
import EventsCategoryPage from '../components/eventsCategoryPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const EventsCategory = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsCategoryPage)

export default EventsCategory