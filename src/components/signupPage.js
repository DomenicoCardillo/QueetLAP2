import React, {
  Component
} from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'

export default class SignupPage extends Component {
  constructor (props) {
    super()
  }

  signup() {
    if(this.state && this.state.email && this.state.pass) {
      this.props.submit(this.state.email, this.state.pass)
    }
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

        { !this.props.signupDone ? (
          <View style={commonStyles.container}>
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

              <TouchableOpacity style={commonStyles.textLeft} onPress={this.props.goToLogin.bind(this)}>
                <Text>Got an Account?</Text>
              </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.errorBox}>
            <Text style={commonStyles.whiteText}>
              Please check your email before login
            </Text>
            <TouchableOpacity onPress={this.props.goToLogin.bind(this)}>
              <Text>Go to login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  errorBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: styleVariables.colors.brandDanger
  }
})