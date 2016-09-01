import React, {
  Component
} from 'react'

import {
  Text,
  View,
  Navigator,
  StyleSheet,
  AsyncStorage,
  StatusBar, 
  Platform
} from 'react-native'

import { Actions, Scene, Router } from 'react-native-router-flux'

import * as globals from '../globals'
import styleVariables from '../styles/variables'

import { connect } from 'react-redux'
import { reauthenticate } from '../actions/auth'

import TabItem from '../components/tabitem'
import Splash from '../components/splashPage'

import Signup from './signup'
import Login from './login'
import Account from './account'

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
    style.marginTop = computedProps.hideNavBar ? 0 : 64
    style.marginBottom = computedProps.hideTabBar ? 0 : 50
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
    backgroundColor: '#eee'
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd'
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
      hideNavBar={false}
      hideTabBar={true}
      type='replace' />
    <Scene 
      key='signup'
      title='Signup'
      component={Signup}
      hideNavBar={false}
      hideTabBar={true}
      type='replace' />
    <Scene 
      key='main'
      tabs
      tabBarStyle={styles.tabBarStyle}
      tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
      <Scene 
        key='account'
        title='Account'
        component={Account}
        hideNavBar={false}
        hideTabBar={false}
        icon={TabItem} 
        titleStyle={styles.titleStyle}
        navigationBarStyle={styles.navigationBarStyle}>
      </Scene>
    </Scene>
  </Scene>
)

class App extends Component {

  componentWillMount(){
     //this.props.dispatch(reauthenticate())  Doesn't work yet
  }

  render() {
    return (
      <Router scenes={scenes} getSceneStyle={getSceneStyle}>
      </Router>
    )
  }
}

export default connect(state => state)(App)