import React, {
  Component
} from 'react'

import {
  Text,
  View,
  StyleSheet
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'

export default class AccountPage extends Component {
  constructor (props) {
    super()
  }
  render() {
    return (
        <Text>Account Page</Text>
    )
  }
}

const styles = StyleSheet.create({})