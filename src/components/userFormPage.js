import React, {
  Component
} from 'react'

import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Platform,
  Picker
} from 'react-native'
const Item = Picker.Item

import UserForm from '../formsModels/user'
import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import ImagePicker from 'react-native-image-crop-picker'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'

import t from 'tcomb-form-native'
let Form = t.form.Form

export default class UserFormPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        firstname: this.props.profile.firstname || '',
        lastname: this.props.profile.lastname || '',
        gender: this.props.profile.gender || '' 
      },
      picture: {
        new: false,
        url: this.props.profile.pictureUrl || '',
        mime: ''
      },
      longPlace: this.props.profile.longPlace,
      shortPlace: this.props.profile.shortPlace,
      selectedCategory: this.props.profile.category,
      stringedCategories: this.getStringedCategories()
    }
  }

  onChange(value) {
    this.setState({value})
  }

  onSave() {
    let value = this.refs.form.getValue()

    if(value) {
      let newProfile = Object.assign({}, this.props.profile, value)
      let picture = null

      if (this.state.picture.new) {
        picture = this.state.picture
      }

      newProfile.shortPlace = this.state.shortPlace
      newProfile.longPlace = this.state.longPlace

      newProfile.category = this.state.selectedCategory

      this.props.updateProfile(newProfile, picture)
    }
  }

  getDefaultPlace(){
    return this.state.longPlace
  }

  updatePlace(data) {
    this.state.shortPlace = data.terms[0].value
    this.state.longPlace = data.description
  }

  getStringedCategories(){
    return this.props.categories.map((cat) => { return cat.name })
  }

  openPicker() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.setState({
        picture: {
          new: true,
          url: image.path,
          mime: image.mime
        }
      })
    })
  }

  render() {
    return (
      <View style={commonStyles.mainContainer}>
        <ScrollView style={commonStyles.container}>
          { this.props.hasError ? (
              <View style={styles.errorBox}>
                <Text style={commonStyles.whiteText}>
                  {this.props.errorMessage}
                </Text>
              </View>
            ) : null }

          <TouchableOpacity onPress={this.openPicker.bind(this)} style={{alignItems: 'center'}}>
            { this.state.picture.url === '' ? (
                <Image source={require('../assets/img/user-default.png')} style={styles.userImage} />
              ) : (
                <Image source={{ uri: this.state.picture.url }} style={styles.userImage} />
              )
            }
            <Text style={commonStyles.label}>Change avatar</Text>
          </TouchableOpacity>

          <Form 
            ref="form"
            type={UserForm.model}
            options={UserForm.options}
            value={this.state.value}
            onChange={this.onChange.bind(this)}
          />

          <Text style={commonStyles.label}>Select sport</Text>
          <Picker
            selectedValue={this.state.selectedCategory}
            onValueChange={(category) => this.setState({selectedCategory: category})}>
            { this.props.categories.map((cat) => {
                return <Item label={cat.name} value={cat.id} />
              })
            }
          </Picker>

          <Text style={[commonStyles.label, {marginTop: 10}]}>Position</Text>
          <GooglePlacesAutocomplete
            placeholder='Position'
            minLength={2} // minimum length of text to search
            onPress={this.updatePlace.bind(this)}
            getDefaultValue={this.getDefaultPlace.bind(this)}
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
                borderRadius: styleVariables.baseRadius,
              },
              separator: {
                backgroundColor: styleVariables.colors.borderColor,
              }
            }}
            enablePoweredByContainer={false}
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
            style={[commonStyles.primaryButton, {marginBottom: 10, marginTop: 20}]} 
            textStyle={commonStyles.primaryButtonText}
            isLoading={this.props.isLoading}
            onPress={this.onSave.bind(this)}>
            Save
          </Button>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10
  }
})