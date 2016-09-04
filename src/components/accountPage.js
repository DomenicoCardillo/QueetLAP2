import React, {
    Component
} from 'react'

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    BackAndroid
} from 'react-native'

/*import ImagePicker from 'react-native-image-crop-picker'*/
import NativeModules from 'NativeModules'

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

  openPicker() {
    /*ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });*/
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <ScrollView style={commonStyles.container}>
          <Text>Firstname: {this.props.currentUser.firstname}</Text>
          <Text>Lastname: {this.props.currentUser.lastname}</Text>
          <Text>Gender: {this.props.currentUser.gender}</Text>
          <Text>Place: {this.props.currentUser.longPlace}</Text>
          <Text>Favourites sports: {this.props.currentUser.stringedCategories}</Text>
        </ScrollView>
        <Button 
          style={commonStyles.primaryButton} 
          textStyle={commonStyles.primaryButtonText}
          onPress={this.props.goToForm.bind(this)}>
          Modify
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({})