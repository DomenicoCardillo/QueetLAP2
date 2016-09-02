import React, {
  Component
} from 'react'

import {
  Text,
  View,
  StyleSheet,
  BackAndroid
} from 'react-native'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }}
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }}

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
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
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
      </View>
    )
  }
}

const styles = StyleSheet.create({})