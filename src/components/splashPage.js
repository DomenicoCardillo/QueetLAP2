import React, { Component, PropTypes } from 'react'

import styleVariables from '../styles/variables'
import commonStyles from '../styles/commons'

import {
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity,
  AsyncStorage
} from 'react-native'

import Button from 'apsl-react-native-button'
import { Actions } from 'react-native-router-flux'

class Splash extends Component {
  goto(page) {
    Actions[page]({type: 'push'})
  }
  render() {
    return (
      <Image source={require('../assets/img/splash.png')} style={commonStyles.backgroundImage}>
        <View style={{ flex: 1 }}>
            <View style={commonStyles.centeredBody}>
                <Image source={require('../assets/img/logo-white-text.png')} style={{marginBottom: 50}} />
                <Text style={styles.titleText}>Organize</Text>
                <Text style={styles.subText}>
                    Queet, the app that allows you to organize any type of sporting event with your friends!
                </Text>
                <Button 
                  style={commonStyles.primaryButton} 
                  textStyle={commonStyles.primaryButtonText}
                  onPress={this.goto.bind(this, 'login')}>
                  Login
                </Button>
                <TouchableOpacity style={commonStyles.textLeft} onPress={this.goto.bind(this, 'signup')}>
                  <Text style={commonStyles.whiteText}>Do not have an account yet?</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Helvetica Neue',
    marginBottom: 30
  },
  titleText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5
  },
  subText: {
    color: '#fff',
    textAlign: 'center',
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 120
  },
  button: {
    marginBottom: 20
  }
})

export default Splash