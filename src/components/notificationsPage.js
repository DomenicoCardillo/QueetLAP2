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
  TouchableOpacity
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  notificationBox: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    padding: 15,
    backgroundColor: '#fff'
  },
  notificationDate: {
    bottom: 0,
    color: '#999'
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  notificationBody: {
    fontSize: 13,
    width: 230
  },
  notificationImage: {
    flex: 1,
    width: 70,
    height: 50,
    marginRight: 10
  }
})

class NotificationsPage extends Component {
  constructor(props) {
    super()
  }

  componentDidMount() {
    //this.props.listenEventsChanges()
  }

  renderRow(notification) {
    return (
      <TouchableOpacity activeOpacity={0.9}>
        <View style={styles.notificationBox}>
          <View>
            <Image source={require('../assets/img/badminton.jpg') } style={styles.notificationImage} />
          </View>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationTitle}>Lorem ipsum</Text>
            <Text style={styles.notificationBody}>Lorem ipsum lorem ipsum lorem ipsum</Text>
            <Text style={styles.notificationDate}>20/07/2016</Text>
          </View>
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

  onRefresh() {
    this.props.fetchEvents()
  }

  render() {
    //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    //const dataSource = ds.cloneWithRows(this.props.notifications)

    return (
      <View style={[commonStyles.mainContainer, {backgroundColor: '#64b0bc'}]}>
        <TouchableOpacity activeOpacity={0.9}>
          <View style={styles.notificationBox}>
            <View>
              <Image source={require('../assets/img/badminton.jpg') } style={styles.notificationImage} />
            </View>
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationTitle}>Lorem ipsum</Text>
              <Text style={styles.notificationBody}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Text>
              <Text style={styles.notificationDate}>20/07/2016</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default NotificationsPage