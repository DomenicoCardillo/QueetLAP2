import { connect } from 'react-redux'
import { createEvent, updateEvent } from '../actions/events'
import EventFormPage from '../components/eventFormPage'

const mapStateToProps = (state) => {
  let event = Object.assign({}, state.events[state.eventPage.eventIndex] || {dateTime: new Date().getTime()})
  return {
    creator: {
      id: state.auth.currentUser.id, 
      name: state.auth.currentUser.firstname + ' ' + state.auth.currentUser.lastname
    },
    event,
    isLoading: state.eventPage.isLoading,
    hasError: state.eventPage.hasError,
    errorMessage: state.eventPage.errorMessage,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (newEvent) => {
      dispatch(createEvent(newEvent))
    },
    updateEvent: (event, eventId) => {
      dispatch(updateEvent(event, eventId))
    }
  }
}

const EventForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventFormPage)

export default EventForm