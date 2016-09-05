import { connect } from 'react-redux'
import { createEvent, updateEvent } from '../actions/events'
import EventFormPage from '../components/eventFormPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    creator: {
      id: state.auth.currentUser.id, 
      name: state.auth.currentUser.firstname + ' ' + state.auth.currentUser.lastname
    },
    event: state.events[state.event.currentId] || {},
    isLoading: state.event.isLoading,
    hasError: state.event.hasError,
    errorMessage: state.event.errorMessage,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (newEvent) => {
      dispatch(createEvent(newEvent))
    },
    updateEvent: (event) => {
      dispatch(updateEvent(event))
    }
  }
}

const EventForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventFormPage)

export default EventForm