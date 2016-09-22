import React, {
  Component
} from 'react'

import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  BackAndroid
} from 'react-native'

import { connect } from 'react-redux'

import FCM from 'react-native-fcm'
import { Actions, Scene, Router } from 'react-native-router-flux'

import * as globals from '../globals'
import styleVariables from '../styles/variables'
import commonStyles from '../styles/commons'

import TabItem from './tabitem'
import Splash from '../containers/splash'
import Signup from '../containers/signup'
import Login from '../containers/login'
import Account from '../containers/account'
import UserForm from '../containers/userForm'
import EventForm from '../containers/eventForm'
import Events from '../containers/events'
import MyEvents from '../containers/myEvents'
import Event from '../containers/event'
import Users from '../containers/users'
import User from '../containers/user'
import EventsCategories from '../containers/eventsCategories'
import ForgotPassword from '../containers/forgotPassword'

const AppRouter = connect()(Router)

/* Set status bar color (Check Android N) */
if (Platform.OS == 'ios') {
  StatusBar.setBarStyle('light-content', true)
} else {
  StatusBar.setBackgroundColor(styleVariables.colors.brandPrimaryDark)
}

class AppPage extends Component {

  constructor(props) {
    super()
    this.backAndroidHandler = this.backAndroidHandler.bind(this)
  }

  componentDidMount() {

    /* Enable/Disable android BackButton */
    BackAndroid.addEventListener('hardwareBackPress', this.backAndroidHandler)
    
    FCM.requestPermissions()
    FCM.getFCMToken().then(token => {
      console.log(token)
    })

    this.notificationUnsubscribe = FCM.on('notification', (notification) => {
      console.log(notification)

      if (notification.opened_from_tray) {
        switch(notification.type) {
          case 'friendshipRequest':
          case 'friendshipResponse':
            this.props.setUserDetail({id: notification.userId})
            break
          case 'requestPartecipation':
          case 'removeMyPartecipation':
          case 'responsePartecipation':
          case 'removePartecipation':
            this.props.setEventDetail({id: notification.eventId})
            break
        }
      } else {
        // Dispath newUnreadNotification()
      }
    })

    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
      console.log(token)
      // fcm token may not be available on first load, catch it here
    })
  }

  componentWillUnmount() {
    // prevent leaking
    this.refreshUnsubscribe()
    this.notificationUnsubscribe()
  }

  backAndroidHandler() {
    let toReturn = true
    
    if (this.props.state.routes.scene === undefined) {
      return toReturn
    }
    
    switch(this.props.state.routes.scene.name) {
      case 'eventsCategory':
      case 'account':
      case 'eventForm':
      case 'userForm':
      case 'event':
      case 'user':
        toReturn = false
        break
    }

    return toReturn
  }

  render() {
    return (
      <AppRouter scenes={scenes} getSceneStyle={getSceneStyle} />
    )
  }
}

/* Define this based on the styles/dimensions you use */
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null
  }
  if (computedProps.isActive) {

    if (Platform.OS === 'ios') {
      style.marginTop = computedProps.hideNavBar ? 0 : 64
    } else {
      style.marginTop = computedProps.hideNavBar ? 0 : 54
    }

    style.marginBottom = computedProps.hideTabBar ? 0 : 60
  }
  return style
}

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: styleVariables.colors.brandPrimary
  },
  titleStyle: {
    color: '#fff',
    fontWeight: '600'
  },
  tabBarStyle: {
    height: 60,
    backgroundColor: styleVariables.colors.brandPrimary
  },
  tabBarIconContainerStyle: {
    height: 60
  },
  tabBarSelectedItemStyle: {
    backgroundColor: styleVariables.colors.brandPrimaryDark
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
    top: 2
  },
})

/* Define Scenes */
const scenes = Actions.create(
  <Scene
    key='root'
    navigationBarStyle={styles.navigationBarStyle}
    titleStyle={styles.titleStyle}>
    <Scene
      key='splash'
      title=''
      component={Splash}
      hideNavBar={true}
      hideTabBar={true}
      initial={true} />
    <Scene
      key='login'
      title='Login'
      component={Login}
      hideNavBar={true}
      hideTabBar={true}
      type='replace' />
    <Scene
      key='signup'
      title='Signup'
      component={Signup}
      hideNavBar={true}
      hideTabBar={true}
      type='replace' />
    <Scene
      key='forgotPassword'
      title='Forgot password'
      component={ForgotPassword}
      hideNavBar={true}
      hideTabBar={true}
      type='replace' />
    <Scene
      key='main'
      tabs
      tabBarStyle={styles.tabBarStyle}
      tabBarIconContainerStyle={styles.tabBarIconContainerStyle}
      tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
      <Scene
        key='events'
        title='Events'
        component={Events}
        hideNavBar={false}
        hideTabBar={false}
        titleStyle={styles.titleStyle}
        navigationBarStyle={styles.navigationBarStyle}
        icon={TabItem}
        tabIcon='sellsy'
        rightTitle='Categories'
        onRight={() => Actions.eventsCategory() }
        rightButtonTextStyle={styles.buttonTextStyle} />
      <Scene
        key='myEvents'
        title='My Events'
        component={MyEvents}
        hideNavBar={false}
        hideTabBar={false}
        titleStyle={styles.titleStyle}
        navigationBarStyle={styles.navigationBarStyle}
        icon={TabItem}
        tabIcon='calendar' />
      <Scene
        key='users'
        title='Users'
        component={Users}
        hideNavBar={false}
        hideTabBar={false}
        titleStyle={styles.titleStyle}
        navigationBarStyle={styles.navigationBarStyle}
        icon={TabItem}
        tabIcon='users'
        rightTitle='Profile'
        onRight={() => Actions.account() }
        rightButtonTextStyle={styles.buttonTextStyle} />
      <Scene
        key='notifications'
        title='Notifications'
        component={Events}
        hideNavBar={false}
        hideTabBar={false}
        titleStyle={styles.titleStyle}
        navigationBarStyle={styles.navigationBarStyle}
        icon={TabItem}
        tabIcon='bell'
        rightTitle='Profile'
        onRight={() => Actions.account() }
        rightButtonTextStyle={styles.buttonTextStyle} />
    </Scene>
    <Scene
      key='account'
      title='Profile'
      component={Account}
      hideNavBar={false}
      hideTabBar={true}
      hideBackImage={true}
      backTitle='Back'
      backButtonTextStyle={styles.buttonTextStyle} />
    <Scene
      key='userForm'
      title='Profile Edit'
      component={UserForm}
      hideNavBar={false}
      hideTabBar={true}
      hideBackImage={true}
      backTitle='Back'
      backButtonTextStyle={styles.buttonTextStyle} />
    <Scene
      key='eventForm'
      title='New event'
      component={EventForm}
      hideNavBar={false}
      hideTabBar={true}
      hideBackImage={true}
      backTitle='Back'
      backButtonTextStyle={styles.buttonTextStyle} />
    <Scene
      key='event'
      title='Event'
      component={Event}
      hideNavBar={false}
      hideTabBar={true}
      hideBackImage={true}
      backTitle='Back'
      backButtonTextStyle={styles.buttonTextStyle} />
    <Scene
      key='user'
      title='User'
      component={User}
      hideNavBar={false}
      hideTabBar={true}
      hideBackImage={true}
      backTitle='Back'
      backButtonTextStyle={styles.buttonTextStyle} />
    <Scene
      key='eventsCategory'
      title='Categories'
      component={EventsCategories}
      hideNavBar={false}
      hideTabBar={true}
      hideBackImage={true}
      backTitle='Back'
      backButtonTextStyle={styles.buttonTextStyle} />
  </Scene>
)

export default AppPage