import { connect } from 'react-redux'
import { fetchEvents, setMyEventsActiveFilter, setEventDetail } from '../actions/events'
import MyEventsPage from '../components/myEventsPage'
import { Actions } from 'react-native-router-flux'
import { filterByDateTime, sortArrayByProps, filterByPlace, filterByCreator } from '../globals'

const getVisibleEvents = (events, activeFilter, userId) => {
  switch (activeFilter) {
    case 'Next':
      events = filterByDateTime(events)
      events = filterByCreator(events, userId)
      sortArrayByProps(events, 'asc', 'dateTime')
      break
    case 'Ended':
      events = filterByDateTime(events, false)
      events = filterByCreator(events, userId)
      sortArrayByProps(events, 'desc', 'dateTime')
      break
    default:
      break
  }
  return events
}
const mapStateToProps = (state) => {
  return {
    events: getVisibleEvents(state.events, state.myEventsPage.activeFilter, state.auth.currentUser.id),
    activeFilter: state.myEventsPage.activeFilter,
    isLoading: state.myEventsPage.isLoading,
    hasError: state.myEventsPage.hasError,
    errorMessage: state.myEventsPage.errorMessage,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => {
      dispatch(fetchEvents())
    },
    listenEventsChanges: () => {
      dispatch(listenEventsChanges())
    },
    setFilter: (filter) => {
      dispatch(setMyEventsActiveFilter(filter))
    },
    createNewEvent: () => {
      dispatch(setEventDetail(null))
       Actions.eventForm()
    },
    setEventDetail: (event) => {
      dispatch(setEventDetail(event))
      Actions.event({
        rightTitle: 'Edit',
        rightButtonTextStyle: {color: '#fff'},
        onRight: () => Actions.eventForm()
      })
    }
  }
}

const MyEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyEventsPage)

export default MyEvents