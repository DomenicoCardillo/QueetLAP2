import React, { Component, PropTypes } from 'react'

import styleVariables from '../styles/variables'
import commonStyles from '../styles/commons'

import {
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native'

import Button from 'apsl-react-native-button'
import { Actions } from 'react-native-router-flux'

class Splash extends Component {
  goto(page) {
    Actions[page]({type: 'push'})
  }
  render() {
    return (
      <Image source={require('../assets/img/splash.png')} style={styles.backgroundImage}>
        <View style={commonStyles.container}>
            <View style={commonStyles.centeredBody}>
                <Text style={styles.mainText}>Queet</Text>
                <Text style={styles.subText}>
                    Lorem Ipsum e' un <Text style={commonStyles.textBold}>testo segnaposto</Text> utilizzato nel settore della tipografia e della <Text style={commonStyles.textBold}>stampa</Text>.
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
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  mainText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Helvetica Neue',
    marginBottom: 10
  },
  subText: {
    color: '#fff',
    textAlign: 'center',
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 50
  },
  button: {
    marginBottom: 20
  }
})

export default Splash