import * as types from './types'
import { firebaseAuth, dbUsersRef, firebaseDB } from '../globals'
import { AsyncStorage } from 'react-native'
import { loadCategories } from './categories'
import { fetchEvents } from './events'

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
      dispatch(logoutSuccess)
      AsyncStorage.setItem('userData', '')
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

export const reauthenticate = () => {
  return (dispatch) => {
    dispatch(reauthenticateStart())
    AsyncStorage.getItem('userData').then((userDataJson) => {
      let userData = JSON.parse(userDataJson)
      if(userData != null) {
        firebaseAuth.signInWithCustomToken(
          userData.stsTokenManager.accessToken
        ).then(function(userData) {
          dispatch(reauthenticateSuccess(userData))
          AsyncStorage.setItem('userData', JSON.stringify(userData))
          Actions.account()
        }).catch(function(error) {
          dispatch(reauthenticateFailed(error))
          Actions.login()
        })
      } else {
        dispatch(reauthenticateFailed())
        Actions.login()
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