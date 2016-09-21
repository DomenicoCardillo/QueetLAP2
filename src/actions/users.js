import * as types from './types'

import {
  dbUsersRef,
  fromObjToArray,
  findBy
} from '../globals'

export const fetchUsers = () => {
  return (dispatch, getState) => {
    dispatch(fetchUsersStart())
    dbUsersRef.once('value').then(function(snapshot) {
      let allUsers = snapshot.val()
      delete allUsers[getState().auth.currentUser.id]
      dispatch(fetchUsersSuccess(fromObjToArray(allUsers)))
    }).catch(function(error){
      dispatch(fetchUsersFailed(error))
    })
  }
}

export const fetchUsersStart = () => {
  return {
    type: types.FETCH_USERS_START
  }
}

export const fetchUsersSuccess = (payload) => {
  return {
    type: types.FETCH_USERS_SUCCESS,
    payload
  }
}

export const fetchUsersFailed = (error) => {
  return {
    type: types.FETCH_USERS_FAILED,
    error
  }
}

export const listenUsersChanges = () => {
  return (dispatch, getState) => {
    dbUsersRef.on('child_changed', function(childSnapshot) {
      let users = getState().users
      let userChangedIndex = users.findIndex(x => x.id == childSnapshot.key)
      dispatch(applyUserChanges({index: userChangedIndex, newValue: childSnapshot.val()}))
    })
  }
}

export const applyUserChanges = (payload) => {
  return {
    type: types.APPLY_USER_CHANGES,
    payload
  }
}

export const setUserDetail = (payload) => {
  return (dispatch, getState) => {
    let userIndex = findBy('id', payload.id, getState().users, true)
    dispatch({
      type: types.SET_USER_DETAIL,
      payload: userIndex
    })
  }
}

export const setUsersActiveFilter = (payload) => {
  return {
    type: types.SET_USERS_ACTIVE_FILTER,
    payload
  }
}