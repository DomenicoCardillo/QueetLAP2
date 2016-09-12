import { connect } from 'react-redux'
import { fetchEvents, listenChanges, setEventsActiveFilter, setEventDetail } from '../actions/events'
import EventsPage from '../components/eventsPage'
import { Actions } from 'react-native-router-flux'
import { filterByDateTime, sortArrayByProps, filterByPlace } from '../globals'

const getVisibleEvents = (events, activeFilter, userShortPlace) => {
  switch (activeFilter) {
    case 'New':
      events = filterByDateTime(events)
      sortArrayByProps(events, 'desc', 'keyId')
      break
    case 'Next':
      events = filterByDateTime(events)
      sortArrayByProps(events, 'asc', 'dateTime')
      break
    case 'Near':
      events = filterByPlace(events, userShortPlace)
      sortArrayByProps(events, 'asc', 'dateTime')
      break
    case 'Ended':
      events = filterByDateTime(events, false)
      sortArrayByProps(events, 'desc', 'dateTime')
      break
    default:
      break
  }
  return events
}

const mapStateToProps = (state) => {
  return {
    events: getVisibleEvents(state.events, state.eventsPage.activeFilter, state.auth.currentUser.shortPlace),
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
    },
    setEventDetail: (event) => {
      dispatch(setEventDetail(event))
    }
  }
}

const Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsPage)

export default Events