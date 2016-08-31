import React, {
  Component
} from 'react'
import {
  Text,
  TextInput,
  View
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import styles from '../styles/common-styles.js'

export default class LoginPage extends Component {
  constructor (props) {
    super()
  }

  login() {
    this.props.submit(this.state.email, this.state.pass)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>

          <TextInput
            style={styles.textinput}
            onChangeText={(email) => this.setState({email: email})}
            placeholder={"Email Address"}
          />
          <TextInput
            style={styles.textinput}
            secureTextEntry={true}
            onChangeText={(pass) => this.setState({pass: pass})}
            placeholder={"Password"}
          />
          <Button 
            style={styles.primary_button} 
            textStyle={styles.primary_button_text}
            isLoading={this.props.isLoading}
            onPress={this.login.bind(this)}>
            Login
          </Button>
          
          { this.props.hasError ? (
            <Text>
              {this.props.errorMessage}
            </Text>
          ) : null }
          
          <Button 
            style={styles.transparent_button} 
            textStyle={styles.transparent_button_text}
            onPress={this.props.goToSignup.bind(this)}>
            Do not have an account yet?
          </Button>
        </View>
      </View>
    )
  }
}