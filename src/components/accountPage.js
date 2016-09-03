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

import ImagePicker from 'react-native-image-crop-picker'
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

    /* File Upload (Work on iOS, follow guide for android) */
    /*let obj = {
      uploadUrl: 'http://127.0.0.1:3000',
      method: 'POST', // default 'POST',support 'POST' and 'PUT'
      headers: {
        'Accept': 'application/json',
      },
      fields: {
        'hello': 'world',
      },
      files: [
        {
          name: 'one', // optional, if none then `filename` is used instead
          filename: 'one.w4a', // require, file name
          filepath: '/xxx/one.w4a', // require, file absoluete path
          filetype: 'audio/x-m4a', // options, if none, will get mimetype from `filepath` extension
        },
      ]
    }

    NativeModules.FileUpload.upload(obj, function(err, result) {
      console.log('upload:', err, result);
    })*/
  }

  openPicker() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  }

  render() {
    return (
        <View style={commonStyles.container}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data);
            console.log(details);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyB8XnrQEsL9JUIo2u4T7xbrvpHxTe39jD4',
            language: 'it', // language of the results
            types: '(cities)', // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            textInputContainer: {
              backgroundColor: '#fff',
              borderWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: styleVariables.colors.borderColor,
              borderTopColor: styleVariables.colors.borderColor,
              borderBottomColor: styleVariables.colors.borderColor,
              borderRadius: styleVariables.baseRadius
            },
            listView: {
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              borderTopWidth: 0,
              maxHeight: 200,
              borderColor: styleVariables.colors.borderColor,
              borderRadius: styleVariables.baseRadius
            },
            separator: {
              backgroundColor: styleVariables.colors.borderColor,
            }
          }}
          enablePoweredByContainer={false}
          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
          }}
          // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} 
        />

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