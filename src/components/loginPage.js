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
  AsyncStorage,
  Image
} from 'react-native'

import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'
import fonts from '../styles/fonts'

export default class LoginPage extends Component {
  constructor(props) {
    super()
    this.state = {
      pageTitleContainer: {
        marginBottom: 50
      },
      pageTitle: {
        width: 137,
        height: 50,
        marginTop: 50
      },
      pageSubtitle: {
        opacity: 1
      },
      email: '',
      pass: ''
    }
  }

  login() {
    this.props.submit(this.state.email, this.state.pass)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.logoutSuccess) {
      this.setState({
        pass: ''
      })
    }
  }

  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))

    AsyncStorage.getItem('lastEmail').then((email) => {
      if(email) {
        this.setState({
          email: email
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
      pageTitleContainer: {
        marginBottom: 30
      },
      pageTitle: {
        width: 137 * 0.7,
        height: 50 * 0.7,
        marginTop: 30
      },
      pageSubtitle: {
        opacity: 0
      }
    })
  }

  keyboardDidHide(e) {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    
    this.setState({
      pageTitleContainer: {
        marginBottom: 50
      },
      pageTitle: {
        width: 137,
        height: 50,
        marginTop: 50
      },
      pageSubtitle: {
        opacity: 1
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
          <View style={this.state.pageTitleContainer}>
            <Image source={require('../assets/img/login.png')} style={[this.state.pageTitle, {alignSelf: 'center', marginBottom: 5}]} />
            <Text style={[this.state.pageSubtitle, {textAlign: 'center', color: styleVariables.colors.brandPrimary, fontWeight: '500'}]}>Please login with your email</Text>
          </View>
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
            style={[commonStyles.textInput, {marginBottom: 5}]}
            secureTextEntry={true}
            value={this.state.pass}
            onChangeText={(pass) => this.setState({pass: pass})}
            placeholder={"Password"}
          />
          <TouchableOpacity style={[commonStyles.textLeft, {marginBottom: 20}]} onPress={this.props.goToForgotPassword.bind(this)}>
            <Text>Forgot password?</Text>
          </TouchableOpacity>
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