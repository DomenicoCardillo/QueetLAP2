import { connect } from 'react-redux'
import { fetchEvents, setMyEventsActiveFilter } from '../actions/events'
import MyEventsPage from '../components/myEventsPage'
import { Actions } from 'react-native-router-flux'

const getVisibleEvents = (events, activeFilter) => {
  return events
}

const mapStateToProps = (state) => {
  return {
    events: getVisibleEvents(state.events, state.activeFilter),
    activeFilter: state.myEventsPage.activeFilter,
    isLoading: state.myEventsPage.isLoading,
    hasError: state.myEventsPage.hasError,
    errorMessage: state.myEventsPage.errorMessage,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: (activeFilter, limit) => {
      dispatch(fetchEvents(activeFilter, limit))
    },
    setFilter: (filter) => {
      dispatch(setMyEventsActiveFilter(filter))
    }
  }
}

const MyEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyEventsPage)

export default MyEvents