import React, { Component } from 'react'

import styleVariables from '../styles/variables'
import commonStyles from '../styles/commons'
import fonts from '../styles/fonts'

import {
  View,
  ScrollView,
  Text, 
  Image, 
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  categoryBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#64b0bc'
  },
  categoryImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: styleVariables.screenWidth / 2,
    height: styleVariables.screenWidth / 2,
  },
  categoryText: {
    fontSize: 20, 
    fontWeight: '500', 
    color: '#fff', 
    marginBottom: 20
  }
})

class EventsCategoryPage extends Component {
  constructor(props){
    super()
  }

  render() {
    return (
      <ScrollView style={[commonStyles.mainContainer, {backgroundColor: '#64b0bc'}]}>
        <View style={styles.categoryBoxContainer}>
          <TouchableOpacity activeOpacity={0.8} style={styles.categoryImage}>
            <Image source={require('../assets/img/badminton.jpg')} style={styles.categoryImage}>
              <Text style={styles.categoryText}>Badminton</Text>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.categoryImage}>
            <Image source={require('../assets/img/basket.jpg')} style={styles.categoryImage}>
              <Text style={styles.categoryText}>Basket</Text>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.categoryImage}>
            <Image source={require('../assets/img/soccer.jpg')} style={styles.categoryImage}>
              <Text style={styles.categoryText}>Soccer</Text>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.categoryImage}>
            <Image source={require('../assets/img/running.jpg')} style={styles.categoryImage}>
              <Text style={styles.categoryText}>Running</Text>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.categoryImage}>
            <Image source={require('../assets/img/tennis.jpg')} style={styles.categoryImage}>
              <Text style={styles.categoryText}>Tennis</Text>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.categoryImage}>
            <Image source={require('../assets/img/badminton.jpg')} style={styles.categoryImage}>
              <Text style={styles.categoryText}>Badminton</Text>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.categoryImage}>
            <Image source={require('../assets/img/basket.jpg')} style={styles.categoryImage}>
              <Text style={styles.categoryText}>Basket</Text>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.categoryImage}>
            <Image source={require('../assets/img/soccer.jpg')} style={styles.categoryImage}>
              <Text style={styles.categoryText}>Soccer</Text>
            </Image>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}


export default EventsCategoryPage