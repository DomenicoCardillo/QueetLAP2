import React, {
  Component
} from 'react'

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackAndroid,
  TouchableOpacity
} from 'react-native'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

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
  }

  render() {
    return (
      <View style={commonStyles.mainContainer}>
        <ScrollView style={commonStyles.container}>
          <Text>Firstname: {this.props.currentUser.firstname}</Text>
          <Text>Lastname: {this.props.currentUser.lastname}</Text>
          <Text>Gender: {this.props.currentUser.gender}</Text>
          <Text>Place: {this.props.currentUser.longPlace}</Text>
          <Text>Favourites sports: {this.props.currentUser.stringedCategories}</Text>
        </ScrollView>
      </View>
    )
  }
}