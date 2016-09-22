import { connect } from 'react-redux'
import { 
  fetchEvents, 
  listenEventsChanges, 
  setEventsActiveFilter, 
  setEventDetail, 
  setCategoryFilter
} from '../actions/events'
import EventsPage from '../components/eventsPage'
import { Actions } from 'react-native-router-flux'
import { 
  filterByDateTime, 
  sortArrayByProps, 
  filterByPlace, 
  filterByCategory, 
  findBy 
} from '../globals'

const getVisibleEvents = (events, activeFilter, categoryFilter, userShortPlace) => {
  if(categoryFilter !== undefined) events = filterByCategory(events, categoryFilter)
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
      events = filterByDateTime(events)
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

const getEventsByPrivacy = (events, me, users) => {
  return events.filter(event => {
    if(!event.privacy || event.privacy === 'All' || event.creator.id === me.id) return true
    else {
      let other = findBy('id', event.creator.id, users)
      if(!other.friends || !me.friends) return false
      return other.friends.hasOwnProperty(me.id) && me.friends.hasOwnProperty(other.id)
    }
  })
}

const mapStateToProps = (state) => {
  let events = {}
  if(!state.auth.currentUser) {
    events = state.events
  } else {
    events = getVisibleEvents(
      getEventsByPrivacy(state.events, state.auth.currentUser, state.users), 
      state.eventsPage.activeFilter,
      state.eventsPage.categoryFilter,
      state.auth.currentUser.shortPlace
    )
    events.map(event => {
      if(event.creator.id == state.auth.currentUser.id) event.creator.name = 'You'
      return event
    })
  }
  let correctCat = state.categories[state.categories.findIndex(x => x.id == state.eventsPage.categoryFilter)]
  correctCat = correctCat ? correctCat.name : null

  return {
    events,
    activeFilter: state.eventsPage.activeFilter,
    categoryFilter: correctCat,
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
    listenEventsChanges: () => {
      dispatch(listenEventsChanges())
    },
    setFilter: (filter) => {
      dispatch(setEventsActiveFilter(filter))
    },
    setEventDetail: (event) => {
      dispatch(setEventDetail(event, true))
    },
    removeCategoryFilter: () => {
      dispatch(setCategoryFilter(undefined))
    }
  }
}

const Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsPage)

export default Events