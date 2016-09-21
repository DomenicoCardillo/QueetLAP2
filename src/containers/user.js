import { connect } from 'react-redux'
import UserPage from '../components/userPage'
import { Actions } from 'react-native-router-flux'
import { toggleFriendship, responseFriendship } from '../actions/friendships'

const mapStateToProps = (state) => {
  let user = Object.assign({}, state.users[state.userPage.userIndex])
  let correctCat = state.categories[state.categories.findIndex(x => x.id == user.category)]
  user.stringedCategory = correctCat ? correctCat.name : null

  let currentUser = state.auth.currentUser
  let isMyFriend = currentUser.friends && currentUser.friends.hasOwnProperty(user.id)
  let iAmHisFriend = user.friends && user.friends.hasOwnProperty(currentUser.id)

  let wathRender = {}

  if(!isMyFriend && !iAmHisFriend){
    wathRender.addFriend = true
  } else if(!isMyFriend && iAmHisFriend){
    wathRender.confirmFriend = true
    wathRender.rejectFriend = true
  } else if(isMyFriend && iAmHisFriend){
    wathRender.removeFriend = true
  } else {
    wathRender.waitResponse = true
  }
  
  return {
    user,
    wathRender,
    isLoadingPrimary: state.userPage.isLoadingPrimary,
    isLoadingSecondary: state.userPage.isLoadingSecondary
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFriendship: (userId) => {
      dispatch(toggleFriendship(userId))
    },
    responseFriendship: (userId, response) => {
      dispatch(responseFriendship(userId, response))
    }
  }
}

const User = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage)

export default User