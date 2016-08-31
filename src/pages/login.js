'use strict';
import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage
} from 'react-native';

import { Actions } from 'react-native-router-flux'

import Button from '../components/button';
import Signup from './signup';

import Firebase from 'firebase';
import * as globals from '../globals'
//Firebase.initializeApp(globals.firebaseConfig)

import styles from '../styles/common-styles.js';

export default class login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />

          <Button 
            text="Login" 
            onpress={this.login.bind(this)} 
            button_styles={styles.primary_button} 
            button_text_styles={styles.primary_button_text} />

          <Button 
            text="New here?" 
            onpress={this.goToSignup.bind(this)} 
            button_styles={styles.transparent_button} 
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }

  login() {

    this.setState({
      loaded: false
    });

    Firebase.auth().signInWithEmailAndPassword(
      this.state.email,
      this.state.password
    ).then(function (response) {
      console.log(response)
      //response.sendEmailVerification();
      this.setState({
        loaded: true
      });

      if(error){
        alert('Login Failed. Please try again');
      } else {
        AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        Actions.account()
      }
    });
  }

  goToSignup(){
    Actions.signup()
  }

}

AppRegistry.registerComponent('login', () => login);