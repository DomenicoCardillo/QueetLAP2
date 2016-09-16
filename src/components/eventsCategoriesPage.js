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

class EventsCategoriesPage extends Component {
  constructor(props){
    super()
  }

  render() {
    let rows = []
    let images = {
      badminton: require('../assets/img/badminton.jpg'),
      basket: require('../assets/img/basket.jpg'),
      running: require('../assets/img/running.jpg'),
      soccer: require('../assets/img/soccer.jpg'),
      tennis: require('../assets/img/tennis.jpg'),
      volley: require('../assets/img/volley.jpg')
    }
    this.props.categories.forEach(category => {
      rows.push(
        <TouchableOpacity 
          key={category.id} 
          activeOpacity={0.8} 
          style={styles.categoryImage} 
          onPress={() => this.props.categoryPressed(category.id)}
        >
          <Image source={images[category.slug]} style={styles.categoryImage}>
            <Text style={styles.categoryText}>{category.name}</Text>
          </Image>
        </TouchableOpacity>
      )
    })
    return (
      <ScrollView style={[commonStyles.mainContainer, {backgroundColor: '#64b0bc'}]}>
        <View style={styles.categoryBoxContainer}>
          {rows}
        </View>
      </ScrollView>
    )
  }
}


export default EventsCategoriesPage