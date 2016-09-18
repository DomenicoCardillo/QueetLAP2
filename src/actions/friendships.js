import * as types from './types'

import {
  dbUsersRef,
  fromObjToArray,
  dbNotificationsRef,
  findBy
} from '../globals'

/*
  table of friendships
  isMyFriend    iAmHisFriend  action
  0             0             addFriendship
  1             0             wait for his response
  0             1             confirmFriendship or rejectFriendship
  1             1             removeFriendship
*/

export const toggleFriendship = (userId) => {
  return (dispatch, getState) => {
    let currentUser = getState().auth.currentUser
    let otherUser = findBy('id', userId, getState().users)
    let isMyFriend = currentUser.friends && currentUser.friends.hasOwnProperty(userId)
    let iAmHisFriend = otherUser.friends && otherUser.friends.hasOwnProperty(currentUser.id)
    let currentUserId = currentUser.id
    if(!isMyFriend && !iAmHisFriend){
      dispatch(addFriendshipStart())
      let notification = {
        from: currentUserId,
        to: userId,
        seen: false,
        type: 'friendshipRequest'
      }
      dbNotificationsRef.push(notification, (error) => {
          if(error) dispatch(addFriendshipFailed(error))
          else {
            let updates = {}
            updates['/' + currentUserId + '/friends/' + userId] = true
            dbUsersRef.update(updates, (error) => {
              if(error) dispatch(addFriendshipFailed(error))
              else      dispatch(addFriendshipSuccess(userId))
            })
          }
      })
    } else if(isMyFriend && iAmHisFriend){
      dispatch(removeFriendshipStart())
      let updates = {}
      updates['/' + currentUserId + '/friends/' + userId] = null
      updates['/' + userId + '/friends/' + currentUserId] = null
      dbUsersRef.update(updates, (error) => {
        if(error) dispatch(removeFriendshipFailed(error))
        else {
          dispatch(removeFriendshipSuccess({
            userId: userId,
            index: findBy('id', userId, getState().users, true)
          }))
        }
      })
    }
  }
}

export const responseFriendship = (userId, response) => {
  return (dispatch, getState) => {
    let currentUser = getState().auth.currentUser
    let currentUserId = currentUser.id
    if(response){
      dispatch(confirmFriendshipStart())
      let notification = {
        from: currentUserId,
        to: userId,
        seen: false,
        type: 'friendshipResponse'
      }
      dbNotificationsRef.push(notification, (error) => {
          if(error) dispatch(confirmFriendshipFailed(error))
          else {
            let updates = {}
            updates['/' + currentUserId + '/friends/' + userId] = true
            dbUsersRef.update(updates, (error) => {
              if(error) dispatch(confirmFriendshipFailed(error))
              else      dispatch(confirmFriendshipSuccess(userId))
            })
          }
      })
    } else {
      dispatch(rejectFriendshipStart())
      let updates = {}
      updates['/' + userId + '/friends/' + currentUserId] = null
      dbUsersRef.update(updates, (error) => {
        if(error) dispatch(rejectFriendshipFailed(error))
        else      dispatch(rejectFriendshipSuccess(userId))
      })
    }
  }
}

export const addFriendshipStart = () => {
  return {
    type: types.ADD_FRIENDSHIP_START
  }
}

export const addFriendshipSuccess = (payload) => {
  return {
    type: types.ADD_FRIENDSHIP_SUCCESS,
    payload
  }
}

export const addFriendshipFailed = (error) => {
  return {
    type: types.ADD_FRIENDSHIP_FAILED,
    error
  }
}

export const removeFriendshipStart = () => {
  return {
    type: types.REMOVE_FRIENDSHIP_START
  }
}

export const removeFriendshipSuccess = (payload) => {
  return {
    type: types.REMOVE_FRIENDSHIP_SUCCESS,
    payload
  }
}

export const removeFriendshipFailed = (error) => {
  return {
    type: types.REMOVE_FRIENDSHIP_FAILED,
    error
  }
}

export const confirmFriendshipStart = () => {
  return {
    type: types.CONFIRM_FRIENDSHIP_SUCCESS
  }
}

export const confirmFriendshipSuccess = (payload) => {
  return {
    type: types.CONFIRM_FRIENDSHIP_SUCCESS,
    payload
  }
}

export const confirmFriendshipFailed = (error) => {
  return {
    type: types.CONFIRM_FRIENDSHIP_FAILED,
    error
  }
}

export const rejectFriendshipStart = () => {
  return {
    type: types.REJECT_FRIENDSHIP_START
  }
}

export const rejectFriendshipSuccess = (payload) => {
  return {
    type: types.REJECT_FRIENDSHIP_SUCCESS,
    payload
  }
}

export const rejectFriendshipFailed = (error) => {
  return {
    type: types.REJECT_FRIENDSHIP_FAILED,
    error
  }
}