import React, {
  Component
} from 'react'

import {
  Text,
  View,
  StyleSheet,
  StatusBar, 
  Platform,
  Image
} from 'react-native'

import { Actions, Scene, Router } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

import * as globals from '../globals'
import styleVariables from '../styles/variables'
import commonStyles from '../styles/commons'

import { connect } from 'react-redux'
import { reauthenticate } from '../actions/auth'

import TabItem from '../components/tabitem'
import Splash from '../components/splashPage'

import Signup from './signup'
import Login from './login'
import Account from './account'
import UserForm from './userForm'
import EventForm from './eventForm'
import Events from './events'
import MyEvents from './myEvents'
import Event from './event'
import Users from './users'

/* Set status bar color (Check Android N) */
if (Platform.OS == 'ios') {
  StatusBar.setBarStyle('light-content', true)
} else {
  StatusBar.setBackgroundColor(styleVariables.colors.brandPrimaryDark)
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
  }
})

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
      type='replace' />
    <Scene 
      key='signup'
      title='Signup'
      component={Signup}
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
        rightTitle='Category'
        onRight={() => Actions.eventForm()}
        rightButtonTextStyle={commonStyles.whiteText} />
      <Scene
        key='myEvents'
        title='My Events'
        component={MyEvents}
        hideNavBar={false}
        hideTabBar={false}
        titleStyle={styles.titleStyle}
        navigationBarStyle={styles.navigationBarStyle}
        icon={TabItem}
        tabIcon='calendar'
        rightTitle='New'
        onRight={() => Actions.eventForm()}
        rightButtonTextStyle={commonStyles.whiteText} />
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
        onRight={() => Actions.account()}
        rightButtonTextStyle={commonStyles.whiteText} /> 
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
        onRight={() => Actions.account()}
        rightButtonTextStyle={commonStyles.whiteText} />
    </Scene>
    <Scene 
      key='account'
      title='Profile'
      component={Account}
      hideNavBar={false}
      hideTabBar={true} 
      hideBackImage={true}
      backTitle='Back'
      backButtonTextStyle={commonStyles.whiteText} />
    <Scene 
      key='userForm'
      title='Profile Edit'
      component={UserForm}
      hideNavBar={false}
      hideTabBar={true}
      hideBackImage={true}
      backTitle='Back'
      backButtonTextStyle={commonStyles.whiteText} />
    <Scene 
      key='eventForm'
      title='New event'
      component={EventForm}
      hideNavBar={false}
      hideTabBar={true}
      hideBackImage={true}
      backTitle='Back'
      backButtonTextStyle={commonStyles.whiteText} />
    <Scene
      key='event'
      title='Event'
      component={Event}
      hideNavBar={false}
      hideTabBar={true}
      hideBackImage={true}
      backTitle='Back'
      backButtonTextStyle={commonStyles.whiteText} />
    </Scene>
)

class App extends Component {

  componentWillMount(){
     //this.props.dispatch(reauthenticate())  Doesn't work yet
  }

  render() {
    return (
      <Router scenes={scenes} getSceneStyle={getSceneStyle} />
    )
  }
}

export default connect(state => state)(App)