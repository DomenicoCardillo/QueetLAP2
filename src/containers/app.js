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

import { Scene, Router } from 'react-native-router-flux'

import TabItem from '../components/tabitem'

import * as globals from '../globals'
import commonStyle from '../styles/common-styles.js'
import Colors from '../styles/colors'

import { connect } from 'react-redux'
import { reauthenticate } from '../actions/auth'

import Signup from './signup'
import Login from './login'

/* Set status bar color */
if (Platform.OS == 'ios') {
  StatusBar.setBarStyle('light-content', true)
} else {
  StatusBar.setBackgroundColor(Colors.brandPrimaryDark)
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

class App extends Component {

  componentWillMount(){
     //this.props.dispatch(reauthenticate())  Doesn't work yet
  }

  render() {
    return (
      <Router 
        getSceneStyle={getSceneStyle}>
        <Scene 
          key='root'>
          <Scene 
            key='login' 
            component={Login} 
            title='Login'
            hideNavBar={false}
            hideTabBar={false} />
          <Scene 
            key='signup' 
            component={Signup} 
            title='Signup'
            initial={true}
            hideNavBar={false}
            hideTabBar={false} />
          <Scene 
            key='main'
            tabs
            tabBarStyle={styles.tabBarStyle}
            tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
            <Scene 
              key='account'
              title='Account'
              component={Signup}
              hideNavBar={false}
              hideTabBar={false}
              icon={TabItem}
              navigationBarStyle={styles.navigationBarStyle} 
              titleStyle={styles.titleStyle}>
            </Scene>
          </Scene>
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: Colors.brandPrimary
  },
  titleStyle: {
    color: 'white'
  },
  tabBarStyle: {
    backgroundColor: '#eee'
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd'
  }
})

export default connect(state => state)(App)