import { connect } from 'react-redux'
import EventsCategoriesPage from '../components/eventsCategoriesPage'
import { Actions } from 'react-native-router-flux'
import { setCategoryFilter } from '../actions/events'

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    categoryPressed: (categoryId) => {
      dispatch(setCategoryFilter(categoryId))
      Actions.pop()
    }
  }
}

const EventsCategories = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsCategoriesPage)

export default EventsCategories