import React, {
    Component
} from 'react'

import {
    View,
    Text,
    StyleSheet,
    Platform,
    BackAndroid,
    TouchableOpacity
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

  goToForm() {
    Actions.userForm()
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

        <Button 
          style={commonStyles.primaryButton} 
          textStyle={commonStyles.primaryButtonText}
          onPress={this.goToForm.bind(this)}>
          Modify
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({})