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

import Signup from './signup'
import Login from './login'
import Account from './account'
import TabItem from '../components/tabitem'

import Firebase from 'firebase'

import * as globals from '../globals'
import commonStyle from '../styles/common-styles.js'
import Colors from '../styles/colors'

Firebase.initializeApp(globals.firebaseConfig)

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

class Index extends Component {

  constructor(props){
    super(props)
    this.state = {
      component: null,
      loaded: false
    }
  }

  componentWillMount(){

    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json)
      let component = {component: Signup}

      if(user_data != null) {
        Firebase.auth().signInWithCustomToken(user_data.token).then(function(response) {
          console.log(response)
          if(error) {
            Actions.login()
            this.setState(component)
          } else {
            Actions.account()
            this.setState({component: Account})
          }
        })
      } else {
        this.setState(component)
      }
    })

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
              initial={true} 
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
                component={Account}
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
  /*render(){

    if(this.state.component){
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator })
            }
          }}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          <Header text="React Native Firebase Auth" loaded={this.state.loaded} />  
          <View style={styles.body}></View>
        </View>
      )
    }
  }*/
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

export default Index
