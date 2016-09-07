import { connect } from 'react-redux'
import { updateProfile } from '../actions/profile'
import UserFormPage from '../components/userFormPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    profile: state.auth.currentUser,
    isLoading: state.profile.isLoading,
    hasError: state.profile.hasError,
    errorMessage: state.profile.errorMessage,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (newProfile, picture) => {
      dispatch(updateProfile(newProfile, picture))
    }
  }
}

const UserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFormPage)

export default UserForm