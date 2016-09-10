import React, {
  Component
} from 'react'

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackAndroid,
  TouchableOpacity,
  Image
} from 'react-native'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'
import fonts from '../styles/fonts'

export default class AccountPage extends Component {
  constructor (props) {
    super(props)
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
          <View style={{flex: 1, alignItems: 'center'}}>
            { this.props.currentUser.pictureUrl === '' ? (
                <Image source={require('../assets/img/user-default.png')} style={styles.userImage} />
              ) : (
                <Image source={{ uri: this.props.currentUser.pictureUrl }} style={styles.userImage} />
              )
            }
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 15}}>
            <Text style={[fonts.style.h4, {marginRight: 8}]}>{this.props.currentUser.firstname} {this.props.currentUser.lastname}</Text>
            { this.props.currentUser.gender === 'M' ? (
                <Icon name="mars" size={20} color="#3498db" style={{top: 5}} />
              ) : (
                <Icon name="venus" size={20} color="#ea4c89" style={{top: 5}} />
              )
            }
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={[fonts.style.h5, {fontWeight: '700'}]}>Place: </Text>
            <Text style={fonts.style.h5}>{this.props.currentUser.longPlace}</Text>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={[fonts.style.h5, {fontWeight: '700'}]}>Favourites Sport: </Text>
            <Text style={fonts.style.h5}>{this.props.currentUser.stringedCategories}</Text>
          </View>
          <Button 
            style={[commonStyles.primaryButton, {marginBottom: 10}]} 
            textStyle={commonStyles.primaryButtonText}
            onPress={this.props.goToForm}>
            Edit Profile
          </Button>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userImage: {
    width: 120,
    height: 120,
    borderRadius: styleVariables.baseRadius,
    marginBottom: 20
  }
})