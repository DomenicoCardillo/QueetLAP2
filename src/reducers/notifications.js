import * as types from '../actions/types'

const notifications = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.FETCH_NOTIFICATIONS_START:
      newState.notificationsPage.isLoading = true
      newState.notificationsPage.hasError = false
      return newState

    case types.FETCH_NOTIFICATIONS_SUCCESS:
      newState.notificationsPage.isLoading = false
      newState.notifications = action.payload
      return newState

    case types.FETCH_NOTIFICATIONS_FAILED:
      newState.notificationsPage.isLoading = false
      newState.notificationsPage.hasError = true
      newState.notificationsPage.errorMessage = action.error.message
      return newState

    case types.SET_NOTIFICATION_AS:
      newState.notifications[action.payload.index].read = action.payload.newState 
      return newState

    case types.ADD_NEW_NOTIFICATION:
      if(newState.notifications === null) newState.notifications = []
      newState.notifications.push(action.payload)
      return newState

    case types.LOGOUT_SUCCESS:
      newState.notifications = null
      return newState

    case types.DELETE_NOTIFICATION_SUCCESS:
      newState.notifications.splice(action.payload.index, 1)
      return newState

    default:
      return state
  }
}

export default notifications