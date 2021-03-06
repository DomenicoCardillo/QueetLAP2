import * as types from './types'
import { firebaseAuth, dbUsersRef, firebaseDB, serverEndpoint } from '../globals'
import { AsyncStorage, Platform } from 'react-native'
import { loadCategories } from './categories'
import { fetchEvents } from './events'
import { fetchUsers } from './users'
import { listenNewNotifications } from './notifications'

import FCM from 'react-native-fcm'

import { Actions } from 'react-native-router-flux'

export const signup = (email, pass) => {
  return (dispatch) => {
    dispatch(signupStart())
    firebaseAuth.createUserWithEmailAndPassword(
      email,
      pass
    ).then(function(userData) {
      userData.sendEmailVerification()
      firebaseDB.ref('users/' + userData.uid).set({
        email: userData.email,
        emailVerified: false
      })
      AsyncStorage.setItem('lastEmail', userData.email)
      dispatch(signupSuccess(userData))
    }).catch(function(error) {
      dispatch(signupFailed(error))
    })
  }
}

export const signupStart = () => {
  return {
    type: types.SIGNUP_START
  }
}

export const signupSuccess = (payload) => {
  return {
    type: types.SIGNUP_SUCCESS,
    payload
  }
}

export const signupFailed = (error) => {
  return {
    type: types.SIGNUP_FAILED,
    error
  }
}

export const login = (email, pass) => {
  return (dispatch) => {
    dispatch(loginStart())
    firebaseAuth.signInWithEmailAndPassword(
      email,
      pass
    ).then(function(userData) {
      if(userData.emailVerified){
        AsyncStorage.setItem('lastEmail', userData.email)
        dispatch(loadCategories())

        dbUsersRef.orderByChild('email').equalTo(userData.email).once('value').then(function(userSnap) {
          let user = userSnap.val()
          user = user[userData.uid]
          user.id = userData.uid
          user.events = {}
          user.friends = user.friends || {}

          dispatch(fetchEvents(() => dispatch(fetchUsers(user.id))))

          Actions.main()

          if(!user.emailVerified){
            let updates = {}
            updates['/' + user.id + '/emailVerified'] = true
            dbUsersRef.update(updates)
          }
          
          /* Save userId */
          AsyncStorage.setItem('userId', user.id)

          fetch(serverEndpoint + 'auth-token?userId=' + user.id, {
            method: 'GET',
            dataType: 'json',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })
          .then((response) => response.json())
          .then((responseJson) => {
            AsyncStorage.setItem('reauthToken', responseJson.token)
          })
          .catch(() => {
          })

          if (Platform.OS === 'android') FCM.subscribeToTopic('/topics/user_' + user.id)
          dispatch(listenNewNotifications(user.id))
          dispatch(loginSuccess(user))
          if(!user.profileCompleted) Actions.userForm()
        })
      } else {
        let error = { message: 'You must verify your account. Please check your email.' }
        dispatch(loginFailed(error))
      }
    }).catch(function(error) {
      dispatch(loginFailed(error))
    })
  }
}

export const loginStart = () => {
  return {
    type: types.LOGIN_START
  }
}

export const loginSuccess = (payload) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload
  }
}

export const loginFailed = (error) => {
  return {
    type: types.LOGIN_FAILED,
    error
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutStart())

    firebaseAuth.signOut().then(function() {
      dispatch(logoutSuccess())
      Actions.pop({popNum: 2})
      AsyncStorage.removeItem('reauthToken')

      AsyncStorage.getItem('userId').then((userId) => {
        if(userId != null) {
          if (Platform.OS === 'android') FCM.unsubscribeFromTopic('/topics/user_' + userId)
        }
      })
     
      AsyncStorage.removeItem('userId')
    })
  }
}

export const logoutStart = () => {
  return {
    type: types.LOGOUT_START
  }
}

export const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS
  }
}

export const sendResetPasswordEmail = (email) => {
  return (dispatch) => {
    dispatch(sendResetPasswordEmailStart())
    firebaseAuth.sendPasswordResetEmail(email)
    .then(function() {
      dispatch(sendResetPasswordEmailSuccess())
      Actions.login()
    })
    .catch(function(error) {
      dispatch(sendResetPasswordEmailFailed(error))
    })
  }
}

export const sendResetPasswordEmailStart = () => {
  return {
    type: types.SEND_RESET_PASSWORD_EMAIL_START
  }
}

export const sendResetPasswordEmailSuccess = () => {
  return {
    type: types.SEND_RESET_PASSWORD_EMAIL_SUCCESS
  }
}

export const sendResetPasswordEmailFailed = (error) => {
  return {
    type: types.SEND_RESET_PASSWORD_EMAIL_FAILED,
    error
  }
}


export const reauthenticate = (callback) => {
  return (dispatch) => {
    dispatch(reauthenticateStart())
    AsyncStorage.getItem('reauthToken').then((reauthToken) => {
      if(reauthToken != null) {
        firebaseAuth.signInWithCustomToken(reauthToken)
        .then(function(userData) {
          dispatch(loadCategories())

          dbUsersRef.orderByChild('email').equalTo(userData.email).once('value').then(function(userSnap) {
            let user = userSnap.val()
            user = user[userData.uid]
            user.id = userData.uid

            if (Platform.OS === 'android') FCM.subscribeToTopic('/topics/user_' + user.id)
            dispatch(reauthenticateSuccess(user))
            dispatch(listenNewNotifications(user.id))
            dispatch(fetchEvents(() => dispatch(fetchUsers(user.id, callback))))

            Actions.main()
            
            if(!user.profileCompleted) Actions.userForm()          
          })
        }).catch((error) => {
          AsyncStorage.getItem('userId').then((userId) => {
            if(userId != null) {
              fetch(serverEndpoint + 'auth-token?userId=' + userId, {
                method: 'GET',
                dataType: 'json',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                }
              })
              .then((response) => response.json())
              .then((responseJson) => {
                AsyncStorage.setItem('reauthToken', responseJson.token)
                dispatch(reauthenticate())
              })
              .catch((error) => {
                dispatch(reauthenticateFailed(error))
              })
            } else {
              dispatch(reauthenticateFailed(error))
            }
          })
        })
      } else {
        dispatch(reauthenticateFailed())
      }
    })
  }
}

export const reauthenticateStart = () => {
  return {
    type: types.REAUTHENTICATE_START
  }
}

export const reauthenticateSuccess = (payload) => {
  return {
    type: types.REAUTHENTICATE_SUCCESS,
    payload
  }
}

export const reauthenticateFailed = (error) => {
  return {
    type: types.REAUTHENTICATE_FAILED,
    error
  }
}