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
import commonStyles from '../styles/common'

export default class SignupPage extends Component {
  constructor (props) {
    super()
  }

  signup() {
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
            onPress={this.signup.bind(this)}>
            Signup
          </Button>
          
          { this.props.hasError ? (
            <Text>
              {this.props.errorMessage}
            </Text>
          ) : null }

          <TouchableOpacity style={commonStyles.textLeft} onPress={this.props.goToLogin.bind(this)}>
            <Text>Got an Account?</Text>
          </TouchableOpacity>
        
        </View>
      </View>
    )
  }
}