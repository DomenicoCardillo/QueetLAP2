import React, {
  Component
} from 'react'

import {
  Text,
  View,
  StyleSheet,
  BackAndroid
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'

export default class AccountPage extends Component {
  constructor (props) {
    super()
  }
  componentDidMount() {

    BackAndroid.addEventListener('hardwareBackPress', function() {
      return true
    })

    /* Geolocalization */
    /*navigator.geolocation.getCurrentPosition(
      (position) => {
        let initialPosition = JSON.stringify(position)
        this.setState({initialPosition})
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    navigator.geolocation.watchPosition((position) => {
      let lastPosition = JSON.stringify(position)
      this.setState({lastPosition})
    });*/
  }

  render() {
    return (
      <Text></Text>
    )
  }
}

const styles = StyleSheet.create({})