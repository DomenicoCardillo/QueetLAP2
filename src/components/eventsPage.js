import React, { Component } from 'react'

import styleVariables from '../styles/variables'
import commonStyles from '../styles/commons'
import { fromObjToArray, sortArrayByPropsAsc } from '../globals'

import {
  View,
  ListView,
  Text, 
  Image, 
  StyleSheet,
  TouchableOpacity,
  RecyclerViewBackedScrollView,
  RefreshControl
} from 'react-native'

import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  eventBox: {
    flex: 1,
    flexDirection: 'row',
    height: 120,
    padding: 15
  },
  eventImage: {
    flex: 1,
    width: 70,
    height: 50,
    marginRight: 10
  },
  eventContainer: {
    flex: 2
  },
  eventTopInfo: {
    flexDirection: 'row'
  },
  eventTitle: {
    fontSize: 18, 
    width: 100,
    fontWeight: '500', 
    marginBottom: 5
  },
  eventDate: {
    position: 'absolute', 
    right: 0,
    color: '#999'
  },
  eventBottomInfo: {
    position: 'absolute', 
    bottom: 0
  },
  eventBottomInfoText: {
    fontSize: 16, 
    marginBottom: 3
  }
})

class EventsPage extends Component {
  constructor(props){
    super()
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      isRefreshing: false
    }
  }

  componentDidMount() {
    this.props.fetchEvents()
    this.props.listenChanges()
  }

  renderRow(event) {
    let categoryName = this.props.categories.filter((cat) => {
      return cat.id == event.category
    }).map((cat) => {
      return cat.name
    })
    return (
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.eventBox}>
          <View>
            <Image source={require('../assets/img/splash.png')} style={styles.eventImage} />
          </View>
          <View style={styles.eventContainer}>
            <View style={styles.eventTopInfo}>
              <Text style={styles.eventTitle}>{event.name}</Text>
              <Text style={styles.eventDate}>{event.date} - {event.time}</Text>
            </View>
            <View style={styles.eventBottomInfo}>
              <Text style={styles.eventBottomInfoText}>{event.shortPlace} - {categoryName}</Text>
              <Text>{event.creator.name}</Text>
            </View>
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

  onRefresh(){
    
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let arrayEvent = fromObjToArray(this.props.events)
    sortArrayByPropsAsc(arrayEvent, 'date', 'time')
    const dataSource = ds.cloneWithRows(arrayEvent)

    return (
      <ListView
        dataSource={dataSource}
        renderRow={(event) => this.renderRow(event)}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        renderSeparator={this.renderSeparator}
        enableEmptySections={true}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
      />
    )
  }
}


export default EventsPage