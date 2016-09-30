import { connect } from 'react-redux'
import NotificationsPage from '../components/notificationsPage'
import { Actions } from 'react-native-router-flux'
import { fetchNotifications, setNotificationAs, deleteNotification } from '../actions/notifications'
import { setUserDetail } from '../actions/users'
import { setEventDetail } from '../actions/events'
import { findBy, formatDate, formatTime, sortArrayByProps } from '../globals'
import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  notificationImage: {
    flex: 1,
    width: 70,
    height: 50,
    marginRight: 10
  },
  notificationUserImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10
  }
})

const hydrateNotifications = (notifications, users, events, categories) => {
  if(notifications === null) return
  notifications = notifications.filter(notification => {
    return !notification.read || (notification.dateTime > (new Date().getTime() - 86400000))
  })
  notifications.forEach(notification => {
    let other = findBy('id', notification.from, users)
    let otherFullName = other.firstname ? other.firstname + ' ' + other.lastname : other.email
    let event = notification.event ? findBy('id', notification.event, events) : null
    let eventName = event ? event.name : ''
    notification.date = formatDate(notification.dateTime) + ' ' + formatTime(notification.dateTime)
    if(notification.type == 'friendshipRequest' || notification.type == 'friendshipResponse'){
      notification.pictureElement = other.pictureUrl === undefined ? (
        <Image source={require('../assets/img/user-default.png')} style={styles.notificationUserImage} />
      ) : (
        <Image source={{uri: other.pictureUrl}} style={styles.notificationUserImage} />
      )
    } else {
      let catSlug = categories[event.category].slug
      switch (catSlug) {
        case 'badminton':
          notification.pictureElement = <Image source={require('../assets/img/badminton.jpg')} style={styles.notificationImage} />
          break
        case 'basket':
          notification.pictureElement = <Image source={require('../assets/img/basket.jpg')} style={styles.notificationImage} />
          break
        case 'running':
          notification.pictureElement = <Image source={require('../assets/img/running.jpg')} style={styles.notificationImage} />
          break
        case 'soccer':
          notification.pictureElement = <Image source={require('../assets/img/soccer.jpg')} style={styles.notificationImage} />
          break
        case 'tennis':
          notification.pictureElement = <Image source={require('../assets/img/tennis.jpg')} style={styles.notificationImage} />
          break
        case 'volley':
          notification.pictureElement = <Image source={require('../assets/img/volley.jpg')} style={styles.notificationImage} />
          break
      }
    }

    switch (notification.type) {
      case 'friendshipRequest':
        notification.title = 'New friendship request'
        notification.content = otherFullName + ' would be your friend'
        notification.macroType = 'user'
        notification.toUser = other
        break
      case 'friendshipResponse':
        notification.title = 'Friendship accepted'
        notification.content = otherFullName + ' and you are friends now'
        notification.macroType = 'user'
        notification.toUser = other
        break

      case 'requestPartecipation':
        notification.title = 'New request partecipation'
        notification.content = otherFullName + ' ask to partecipate in ' + eventName
        notification.macroType = 'event'
        notification.toEvent = event
        break
      case 'responsePartecipation':
        notification.title = 'Request partecipation response'
        notification.content = 'Your partecipation request for ' + eventName + ' has been '
        notification.content += notification.response ? 'accepted' : 'rejected'
        notification.macroType = 'event'
        notification.toEvent = event
        break
      case 'eventUpdated':
        notification.title = eventName + ' has been updated'
        notification.content = 'Tap on this for view new informations'
        notification.macroType = 'event'
        notification.toEvent = event
        break
      case 'leftEvent':
        notification.title = otherFullName + ' leaved ' + eventName
        notification.macroType = 'event'
        notification.toEvent = event
        break
      case 'removedFromEvent':
        notification.title = otherFullName + ' has been removed from ' + eventName
        notification.macroType = 'event'
        notification.toEvent = event
        break
        
      default:
        break
    }
  })
  sortArrayByProps(notifications, 'desc', 'dateTime')
  return notifications
}

const mapStateToProps = (state) => {
  return {
    notifications: hydrateNotifications(state.notifications, state.users, state.events, state.categories)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotifications: () => {
      dispatch(fetchNotifications())
    },
    setUserDetail: (user) => {
      dispatch(setUserDetail(user))
      Actions.user()
    },
    setEventDetail: (event) => {
      dispatch(setEventDetail(event, true))
    },
    setNotificationAs: (notificationId, newState) => {
      dispatch(setNotificationAs(notificationId, newState))
    },
    deleteNotification: (notificationId) => {
      dispatch(deleteNotification(notificationId))
    }
  }
}

const Notifications = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPage)

export default Notifications