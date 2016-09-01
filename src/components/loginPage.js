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
import fonts from '../styles/fonts'

export default class LoginPage extends Component {
  constructor (props) {
    super()
  }

  login() {
    this.props.submit(this.state.email, this.state.pass)
  }
  goToForm() {
    Actions.userForm()
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

        <View style={commonStyles.container}>
          <Text style={Object.assign({}, fonts.style.h1, {margin: 50, textAlign: 'center'})}>Login</Text>
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
          <TouchableOpacity style={commonStyles.textLeft} onPress={this.props.goToSignup.bind(this)}>
            <Text>Do not have an account yet?</Text>
          </TouchableOpacity>

          <Button 
            style={commonStyles.primaryButton} 
            textStyle={commonStyles.primaryButtonText}
            onPress={this.goToForm.bind(this)}>
            Go to form
          </Button>
        </View>
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