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

import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'
import fonts from '../styles/fonts'

export default class SignupPage extends Component {
  constructor () {
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
      email: '',
      pass: ''
    }
  }

  signup() {
    this.props.submit(this.state.email, this.state.pass)
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
          { !this.props.signupDone ? (
            <View>
              <View style={this.state.pageTitleContainer}>
                <Image source={require('../assets/img/signup.png')} style={[this.state.pageTitle, {alignSelf: 'center', marginBottom: 5}]} />
                <Text style={{textAlign: 'center', color: styleVariables.colors.brandPrimary, fontWeight: '500'}}>Signup with your email</Text>
              </View>
              <TextInput
                ref='1'
                style={commonStyles.textInput}
                onChangeText={(email) => this.setState({email: email})}
                placeholder={"Email Address"}
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
                onPress={this.signup.bind(this)}>
                Signup
              </Button>

              <TouchableOpacity style={commonStyles.textLeft} onPress={this.props.goToLogin.bind(this)}>
                <Text>Got an Account?</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.confirmBox}>
              <Text style={fonts.style.h2}>Confirm Mail</Text>
              <Image source={require('../assets/img/check-icon.png')} style={styles.checkImage}></Image>
              <Text style={[fonts.style.h5, {marginBottom: 5}]}>Please check your email before login</Text>
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