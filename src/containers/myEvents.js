import { connect } from 'react-redux'
import { fetchEvents, setMyEventsActiveFilter, setEventDetail } from '../actions/events'
import MyEventsPage from '../components/myEventsPage'
import { Actions } from 'react-native-router-flux'
import { filterByDateTime, sortArrayByProps, filterByPlace, filterByCreator, filterByPartecipations } from '../globals'

const getVisibleEvents = (events, activeFilter, userId) => {
  switch (activeFilter) {
    case 'Joined in':
      events = filterByDateTime(events)
      events = filterByPartecipations(events, userId)
      sortArrayByProps(events, 'asc', 'dateTime')
      break
    case 'Owned':
      events = filterByDateTime(events)
      events = filterByCreator(events, userId)
      sortArrayByProps(events, 'asc', 'dateTime')
      break
    case 'Ended':
      events = filterByDateTime(events, false)
      events = filterByPartecipations(events, userId)
      sortArrayByProps(events, 'desc', 'dateTime')
      break
    default:
      break
  }
  return events
}
const mapStateToProps = (state) => {
  let events = {}
  if(!state.auth.currentUser) {
    events = state.events
  } else {
    events = getVisibleEvents(state.events, state.myEventsPage.activeFilter, state.auth.currentUser.id)
    events.map(event => {
      if(event.creator.id == state.auth.currentUser.id) event.creator.name = 'You'
      return event
    })
  }
  return {
    events,
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
      dispatch(setEventDetail(event, true))
    }
  }
}

const MyEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyEventsPage)

export default MyEvents