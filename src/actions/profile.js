import * as types from './types'
import { dbUsersRef, firebaseAuth, dbEventsRef } from '../globals'
import { Actions } from 'react-native-router-flux'

export const updateProfile = (newProfile) => {
  return (dispatch) => {
    dispatch(updateProfileStart())
    let userId = firebaseAuth.currentUser.uid
    let updates = {}
    updates['/' + userId] = newProfile
    dbUsersRef.update(updates, (error) => {
      if(error) {
        dispatch(updateProfileFailed(error))
      }
      else {
        dbEventsRef.orderByChild('/creator/id').equalTo(userId).once('value').then((snapshot) => {
          let events = snapshot.val()
          if(Object.keys(events).length > 0){
            let eventsUpdates = {}
            for (var event in events) {
              if (events.hasOwnProperty(event)) {
                eventsUpdates['/' + event + '/creator/name'] = newProfile.firstname + ' ' + newProfile.lastname
              }
            }
            dbEventsRef.update(eventsUpdates)
          }
        })
        dispatch(updateProfileSuccess(newProfile))
        Actions.main()
      }
    })
  }
}

export const updateProfileStart = () => {
  return {
    type: types.UPDATE_PROFILE_START
  }
}

export const updateProfileSuccess = (payload) => {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    payload
  }
}

export const updateProfileFailed = (error) => {
  return {
    type: types.UPDATE_PROFILE_FAILED,
    error
  }
}