import React, {
  Component
} from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  LayoutAnimation,
  ScrollView,
  AsyncStorage
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'
import fonts from '../styles/fonts'

export default class LoginPage extends Component {
  constructor (props) {
    super()
    this.state = {
      pageTitle: {
        fontSize: fonts.size.h1,
        margin: 50
      }
    }
  }

  login() {
    if(this.state && this.state.email && this.state.pass) {
      this.props.submit(this.state.email, this.state.pass)
    }
  }

  goToForm() {
    Actions.userForm()
  }

  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))

    /* Precompile email if userData is set */
    AsyncStorage.getItem('userData').then((userJson) => {
      let user = JSON.parse(userJson)

      if(user !== null) {
        this.setState({
          email: user.email
        })
      }
    })
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow(e) {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    this.setState({
      pageTitle: {
        fontSize: fonts.size.h3,
        margin: 20
      }
    })
  }

  keyboardDidHide(e) {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    
    this.setState({
      pageTitle: {
        fontSize: fonts.size.h1,
        margin: 50
      }
    })
  }

  render() {
    return (
      <View style={commonStyles.mainContainer}>

        { this.props.hasError ? (
          <View style={styles.errorBox}>
            <Text style={commonStyles.whiteText}>
              {this.props.errorMessage}
            </Text>
          </View>
        ) : null }

        <ScrollView style={commonStyles.container}>
          <Text style={[{textAlign: 'center'}, this.state.pageTitle]}>Login</Text>
          <TextInput
            ref='1'
            style={commonStyles.textInput}
            onChangeText={(email) => this.setState({email: email})}
            placeholder={"Email Address"}
            value={this.state.email}
            onSubmitEditing={() =>  this.refs['2'].focus()}
          />
          <TextInput
            ref='2'
            style={commonStyles.textInput}
            secureTextEntry={true}
            onChangeText={(pass) => this.setState({pass: pass})}
            placeholder={"Password"}
          />
          <Button 
            style={commonStyles.primaryButton} 
            textStyle={commonStyles.primaryButtonText}
            isLoading={this.props.isLoading}
            onPress={this.login.bind(this)}>
            Login
          </Button>
          <TouchableOpacity style={commonStyles.textLeft} onPress={this.props.goToSignup.bind(this)}>
            <Text>Do not have an account yet?</Text>
          </TouchableOpacity>

          <Button 
            style={commonStyles.primaryButton} 
            textStyle={commonStyles.primaryButtonText}
            onPress={this.goToForm.bind(this)}>
            Go to form
          </Button>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  errorBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: styleVariables.colors.brandDanger
  }
})