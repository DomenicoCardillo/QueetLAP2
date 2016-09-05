import React, { Component } from 'react'

import styleVariables from '../styles/variables'
import commonStyles from '../styles/commons'

import {
  View,
  ListView,
  Text, 
  Image, 
  StyleSheet,
  RecyclerViewBackedScrollView
} from 'react-native'

import { Actions } from 'react-native-router-flux'

class EventsPage extends Component {
  constructor(props){
    super()
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

    //HOW TO GET NAME OF EVENT CREATOR?
  }

  componentDidMount() {
    this.props.fetchEvents()
  }

  renderRow(event) {
    let categoryName = this.props.categories.filter((cat) => {
      return cat.id == event.category
    }).map((cat) => {
      return cat.name
    })
    return (
      <View>
        <Text>{event.name}</Text>
        <Text>{event.date} - {event.time}</Text>
        <Text>{event.shortPlace} - {categoryName}</Text>
        <Text>{event.creator.name}</Text>
      </View>
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
    const dataSource = this.state.dataSource.cloneWithRows(this.props.events)

    return (
      <ListView
        dataSource={dataSource}
        renderRow={(event) => this.renderRow(event)}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        renderSeparator={this.renderSeparator}
        enableEmptySections={true}
      />
    )
  }
}


export default EventsPage