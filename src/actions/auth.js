import * as types from './types'
import Firebase from 'firebase'
import * as globals from '../globals'

Firebase.initializeApp(globals.firebaseConfig)

export const login = (email, pass) => {
  return (dispatch) => {
    dispatch(loginStart())
    Firebase.auth().signInWithEmailAndPassword(
      email,
      pass
    ).then(function (userData) {
      console.log(userData)
      dispatch(loginSuccess(userData))
    }).catch(function(error) {
      console.log(error)
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
    Firebase.auth().signOut().then(function() {
      dispatch(logoutSuccess)
    })
  }
}

export const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS
  }
}