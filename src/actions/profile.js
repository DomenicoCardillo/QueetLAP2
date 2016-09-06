import * as types from './types'
import { userStorageRef, dbUsersRef, firebaseAuth, dbEventsRef } from '../globals'
import { Actions } from 'react-native-router-flux'

import RNFetchBlob from 'react-native-fetch-blob'

export const updateProfile = (newProfile) => {
  return (dispatch) => {
    dispatch(updateProfileStart())

    let userId = firebaseAuth.currentUser.uid
    let updates = {}

    const fs = RNFetchBlob.fs
    const Blob = RNFetchBlob.polyfill.Blob

    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    // Controllare se l'immagine è già stata caricata
    //if (newProfile.pictureUrl.indexOf('firebase')) {}

    let rnfbURI = RNFetchBlob.wrap(newProfile.pictureUrl)
    
    Blob
      .build(rnfbURI, { type: newProfile.pictureExt + ';' })
      .then((blob) => {
        
        // Upload image using Firebase SDK
        userStorageRef
          .child(userId)
          .put(blob, { contentType: newProfile.pictureExt })
          .then((snapshot) => {
            newProfile.pictureUrl = snapshot.metadata.downloadURLs[0]

            updates['/' + userId] = newProfile

            // Update profile
            dbUsersRef.update(updates, (error) => {
              if(error) {
                dispatch(updateProfileFailed(error))
              } else {
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
              }
              
              dispatch(updateProfileSuccess(newProfile))
              Actions.pop()
            })
          })
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