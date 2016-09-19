import * as types from './types'
import { firebaseAuth, dbUsersRef, firebaseDB, serverEndpoint } from '../globals'
import { AsyncStorage } from 'react-native'
import { loadCategories } from './categories'
import { fetchEvents } from './events'
import { fetchUsers } from './users'

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
        dispatch(fetchUsers())
        dispatch(fetchEvents())

        dbUsersRef.orderByChild('email').equalTo(userData.email).once('value').then(function(userSnap) {
          let user = userSnap.val()
          user = user[userData.uid]
          user.id = userData.uid

          if(!user.emailVerified){
            let updates = {}
            updates['/' + user.id + '/emailVerified'] = true
            dbUsersRef.update(updates)
          }
          
          AsyncStorage.getItem('reauthToken').then((reauthToken) => {
            if (reauthToken == null || reauthToken == '') {
              fetch(serverEndpoint + 'auth-token?userId=' + user.id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                }
              })
              .then((response) => response.json())
              .then((responseJson) => {
                AsyncStorage.setItem('reauthToken', responseJson.token)
              })
            }
          })

          dispatch(loginSuccess(user))
        })
        
        Actions.main()
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
      AsyncStorage.setItem('reauthToken', '')
      Actions.pop({popNum: 2})
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


export const reauthenticate = () => {
  return (dispatch) => {
    dispatch(reauthenticateStart())
    AsyncStorage.getItem('reauthToken').then((reauthToken) => {
      if(reauthToken != null) {
        firebaseAuth.signInWithCustomToken(reauthToken)
        .then(function(userData) {
          dispatch(loadCategories())
          dispatch(fetchUsers())
          dispatch(fetchEvents())

          dbUsersRef.orderByChild('email').equalTo(userData.email).once('value').then(function(userSnap) {
            let user = userSnap.val()
            user = user[userData.uid]
            user.id = userData.uid

            dispatch(reauthenticateSuccess(user))          
          })

          Actions.main()
        }).catch(function(error) {
          dispatch(reauthenticateFailed(error))
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