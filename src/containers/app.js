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
import styleVariables from '../styles/variables'

import { connect } from 'react-redux'
import { reauthenticate } from '../actions/auth'

import Signup from './signup'
import Login from './login'

/* Set status bar color */
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

class App extends Component {

  componentWillMount(){
     //this.props.dispatch(reauthenticate())  Doesn't work yet
  }

  render() {
    return (
      <Router 
        getSceneStyle={getSceneStyle}>
        <Scene 
          key='root'
          hideNavBar={false}
          hideTabBar={false}
          navigationBarStyle={styles.navigationBarStyle} 
          titleStyle={styles.titleStyle}>
          <Scene 
            key='login' 
            component={Login} 
            title='Login'
            hideBackImage={true} />
          <Scene 
            key='signup' 
            component={Signup}
            title='Signup'
            initial={true}
            hideBackImage={true} />
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
    backgroundColor: styleVariables.colors.brandPrimary
  },
  titleStyle: {
    color: 'white',
    fontWeight: '600'
  },
  tabBarStyle: {
    backgroundColor: '#eee'
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd'
  }
})

export default connect(state => state)(App)