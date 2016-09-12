import { connect } from 'react-redux'
import { fetchEvents, listenChanges, setEventsActiveFilter } from '../actions/events'
import EventsPage from '../components/eventsPage'
import { Actions } from 'react-native-router-flux'

const getVisibleEvents = (events, activeFilter) => {
  return events
}

const mapStateToProps = (state) => {
  return {
    events: getVisibleEvents(state.events, state.activeFilter),
    activeFilter: state.eventsPage.activeFilter,
    isLoading: state.eventsPage.isLoading,
    hasError: state.eventsPage.hasError,
    errorMessage: state.eventsPage.errorMessage,
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
    },
    setFilter: (filter) => {
      dispatch(setEventsActiveFilter(filter))
    }
  }
}

const Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsPage)

export default Events