import React, { Component } from 'react'

import styleVariables from '../styles/variables'
import commonStyles from '../styles/commons'
import fonts from '../styles/fonts'

import {
  View,
  ListView,
  Text, 
  Image, 
  StyleSheet,
  RecyclerViewBackedScrollView,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  userBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    padding: 15,
    backgroundColor: '#fff'
  },
  userImage: {
    maxWidth: 40,
    maxHeight: 40,
    marginRight: 10,
    borderRadius: 20
  }
})

class UsersPage extends Component {
  constructor(props){
    super()
  }

  componentDidMount() {
    //this.props.listenChanges()
  }

  renderRow(event) {
    return (
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.userBox}>
          <Image source={require('../assets/img/badminton.jpg')} style={styles.userImage} />
          <Text style={{fontSize: 15, fontWeight: '500'}}>Domenico Cardillo</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    )
  }

  render() {  
    return (
      <View style={[commonStyles.mainContainer, {backgroundColor: '#ea573d'}]}>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.userBox}>
            <Image source={require('../assets/img/badminton.jpg')} style={styles.userImage} />
            <Text style={{fontSize: 15, fontWeight: '500'}}>Domenico Cardillo</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}


export default UsersPage