import React, {
  Component,
} from 'react'
import { ScrollView, View, Text, Picker } from 'react-native'
const Item = Picker.Item

import EventForm from '../formsModels/event'
import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import MultipleChoice from 'react-native-multiple-choice'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'
import { formatDate, formatTime } from '../globals'

import t from 'tcomb-form-native'
let Form = t.form.Form;

export default class EventFormPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNew: Object.getOwnPropertyNames(this.props.event).length == 0, 
      value: {
        name: this.props.event.name,
        date: this.props.event.date,
        time: this.props.event.time 
      },
      longPlace: this.props.event.longPlace || '',
      shortPlace: this.props.event.shortPlace || '',
      selectedCategory: this.props.event.category,
      stringedCategories: this.getStringedCategories()
    }
  }

  onChange(value) {
    this.setState({value})
  }

  onSave() {
    let value = this.refs.form.getValue()
    if(value) {
      let newEvent = Object.assign({}, this.props.event, value)
      newEvent.shortPlace = this.state.shortPlace
      newEvent.longPlace = this.state.longPlace
      newEvent.category = this.state.selectedCategory
      newEvent.date = formatDate(newEvent.date)
      newEvent.time = formatTime(newEvent.time)
      newEvent.creator = this.props.creator

      if(this.state.isNew)  this.props.createEvent(newEvent)
      else                  this.props.updateEvent(newEvent)
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

  render() {
    return (
      <ScrollView style={commonStyles.container}>
        { this.props.hasError ? (
            <View style={styles.errorBox}>
              <Text style={commonStyles.whiteText}>
                {this.props.errorMessage}
              </Text>
            </View>
          ) : null }

        <Form 
          ref="form"
          type={EventForm.model}
          options={EventForm.options}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />

        <Text>Select sport</Text>
        <Picker
          selectedValue={this.state.selectedCategory}
          onValueChange={(category) => this.setState({selectedCategory: category})}>
          { this.props.categories.map((cat) => {
              return <Item label={cat.name} value={cat.id} />
            })
          }
        </Picker>

        <View style={{height: 40}}></View>

        <Text>Position</Text>
        <GooglePlacesAutocomplete
          placeholder='Posizione'
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
              borderRadius: styleVariables.baseRadius
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

        <View style={{height: 40}}></View>

        <Button 
          style={commonStyles.primaryButton} 
          textStyle={commonStyles.primaryButtonText}
          isLoading={this.props.isLoading}
          onPress={this.onSave.bind(this)}>
          Save
        </Button>

        <View style={{height: 40}}></View>
      </ScrollView>
    )
  }
}