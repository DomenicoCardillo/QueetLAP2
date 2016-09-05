import { connect } from 'react-redux'
import { fetchEvents, listenChanges } from '../actions/events'
import EventsPage from '../components/eventsPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    events: state.events,
    isLoading: state.event.isLoading,
    hasError: state.event.hasError,
    errorMessage: state.event.errorMessage,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => {
      dispatch(fetchEvents())
    },
    listenChanges: () => {
      dispatch(listenChanges())
    }
  }
}

const Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsPage)

export default Events