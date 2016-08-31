import React, {
  Component
} from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'

export default class LoginPage extends Component {
  constructor (props) {
    super()
  }

  login() {
    this.props.submit(this.state.email, this.state.pass)
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <View style={commonStyles.topBody}>

          <TextInput
            style={commonStyles.textInput}
            onChangeText={(email) => this.setState({email: email})}
            placeholder={"Email Address"}
          />
          <TextInput
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
          
          { this.props.hasError ? (
            <Text>
              {this.props.errorMessage}
            </Text>
          ) : null }
          
          <TouchableOpacity style={commonStyles.textLeft} onPress={this.props.goToSignup.bind(this)}>
            <Text>Do not have an account yet?</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}