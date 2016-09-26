import * as types from './types'
import {
  dbNotificationsRef,
  fromObjToArray,
  findBy
} from '../globals'

import { Actions } from 'react-native-router-flux'

export const fetchNotifications = () => {
  return (dispatch, getState) => {
    dispatch(fetchNotificationsStart())
    let currentUserId = getState().auth.currentUser.id

    dbNotificationsRef.orderByChild('to').equalTo(currentUserId).once('value').then(function(snapshot) {
      let notifications = fromObjToArray(snapshot.val())
      dispatch(fetchNotificationsSuccess(notifications))
    }).catch(function(error){
      dispatch(fetchNotificationsFailed(error))
    })
  }
}

export const setNotificationRead = (notificationId) => {
  return (dispatch, getState) => {
    let updates = {}
    updates['/' + notificationId + '/read'] = true
    dbNotificationsRef.update(updates, (error) => {
      if(!error) {
        let notificationIndex = findBy('id', notificationId, getState().notifications, true)
        dispatch({
          type: types.SET_NOTIFICATION_READ,
          payload: notificationIndex
        })
      }
    })
  }
}

export const listenNewNotifications = (userId) => {
  return (dispatch) => {
    dbNotificationsRef.on('child_added', function(snapshot) {
      console.log('fuck')
      let notification = snapshot.val()
      notification.id = snapshot.key
      if(notification.to === userId){
        dispatch({
          type: types.ADD_NEW_NOTIFICATION,
          payload: notification
        })
      }
    })
  }
}

export const fetchNotificationsStart = () => {
  return {
    type: types.FETCH_NOTIFICATIONS_START
  }
}

export const fetchNotificationsSuccess = (payload) => {
  return {
    type: types.FETCH_NOTIFICATIONS_SUCCESS,
    payload
  }
}

export const fetchNotificationsFailed = (error) => {
  return {
    type: types.FETCH_NOTIFICATIONS_FAILED,
    error
  }
}