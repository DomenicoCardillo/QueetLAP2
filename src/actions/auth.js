import * as types from './types'
import Firebase from 'firebase'
import * as globals from '../globals'
import { AsyncStorage } from 'react-native'

import { Actions } from 'react-native-router-flux'

Firebase.initializeApp(globals.firebaseConfig)

export const signup = (email, pass) => {
  return (dispatch) => {
    dispatch(signupStart())
    Firebase.auth().createUserWithEmailAndPassword(
      email,
      pass
    ).then(function(userData) {
      userData.sendEmailVerification()
      let usersRef = Firebase.database().ref('/users')
      usersRef.push({
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
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
    Firebase.auth().signInWithEmailAndPassword(
      email,
      pass
    ).then(function(userData) {
      if(userData.emailVerified){
        AsyncStorage.setItem('lastEmail', userData.email)

        let ref = Firebase.database().ref('users')
        ref.orderByChild('email').equalTo(userData.email).on('value', function(userSnap) {
          let user = userSnap.val()
          for(let key in userSnap.val()) user.id = key
          user = Object.assign({}, {id: user.id}, user[user.id])
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
    Firebase.auth().signOut().then(function() {
      dispatch(logoutSuccess)
      AsyncStorage.setItem('userData', null)
      Actions.login()
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
        Firebase.auth().signInWithCustomToken(
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