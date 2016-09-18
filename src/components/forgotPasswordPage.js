import React, {
  Component
} from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'
import fonts from '../styles/fonts'

export default class ForgotPasswordPage extends Component {
  constructor (props) {
    super()
    this.state = {
      pageTitleContainer: {
        marginBottom: 50
      },
      pageTitle: {
        width: 192,
        height: 50,
        marginTop: 50
      },
      email: ''
    }
  }

  submit() {
    this.props.submit(this.state.email)
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
          { !this.props.sendDone ? (
            <View>
              <View style={this.state.pageTitleContainer}>
                <Text style={{textAlign: 'center', color: styleVariables.colors.brandPrimary, fontWeight: '500'}}>Insert your email</Text>
              </View>
              <TextInput
                style={commonStyles.textInput}
                onChangeText={(email) => this.setState({email: email})}
                placeholder={"Email Address"}
              />
              <Button 
                style={commonStyles.primaryButton} 
                textStyle={commonStyles.primaryButtonText}
                isLoading={this.props.isLoading}
                onPress={this.submit.bind(this)}>
                Send reset email
              </Button>

              <TouchableOpacity style={commonStyles.textLeft} onPress={this.props.goToLogin.bind(this)}>
                <Text>Go to login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.confirmBox}>
              <Image source={require('../assets/img/check-icon.png')} style={styles.checkImage}></Image>
              <Text style={[fonts.style.h5, {marginBottom: 5}]}>Please check your email for reset password</Text>
              <TouchableOpacity onPress={this.props.goToLogin.bind(this)}>
                <Text>Go to login</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  checkImage: {
    width: 100,
    height: 100,
    marginVertical: 50
  },
  errorBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: styleVariables.colors.brandDanger
  },
  confirmBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})