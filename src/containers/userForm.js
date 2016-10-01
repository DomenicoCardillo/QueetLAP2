import { connect } from 'react-redux'
import { updateProfile } from '../actions/profile'
import UserFormPage from '../components/userFormPage'

const mapStateToProps = (state) => {
  return {
    profile: state.auth.currentUser,
    isLoading: state.profilePage.isLoading,
    hasError: state.profilePage.hasError,
    errorMessage: state.profilePage.errorMessage,
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