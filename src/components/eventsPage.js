import React, { Component } from 'react'

import styleVariables from '../styles/variables'
import commonStyles from '../styles/commons'
import { formatDate, formatTime } from '../globals'

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
import { SegmentedControls } from 'react-native-radio-buttons'

const styles = StyleSheet.create({
  eventBox: {
    flex: 1,
    flexDirection: 'row',
    height: 120,
    padding: 15,
    backgroundColor: '#fff'
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
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      isRefreshing: this.props.isLoading,
      events: [],
      activeFilter: 'New'
    }
  }

  componentDidMount() {
    this.setFilter('New')
    this.props.listenChanges()
  }

  renderRow(event) {
    let catName = this.props.categories[event.category].name
    let catSlug = this.props.categories[event.category].slug
    let imageBox = null
    switch (catSlug) {
      case 'badminton':
        imageBox = <Image source={require('../assets/img/badminton.jpg')} style={styles.eventImage} />
        break
      case 'basket':
        imageBox = <Image source={require('../assets/img/basket.jpg')} style={styles.eventImage} />
        break
      case 'running':
        imageBox = <Image source={require('../assets/img/running.jpg')} style={styles.eventImage} />
        break
      case 'soccer':
        imageBox = <Image source={require('../assets/img/soccer.jpg')} style={styles.eventImage} />
        break
      case 'tennis':
        imageBox = <Image source={require('../assets/img/tennis.jpg')} style={styles.eventImage} />
        break
    }
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.goToDetail(event)}>
        <View style={styles.eventBox}>
          <View>
            {imageBox}
          </View>
          <View style={styles.eventContainer}>
            <View style={styles.eventTopInfo}>
              <Text style={styles.eventTitle}>{event.name}</Text>
              <Text style={styles.eventDate}>{formatDate(event.dateTime)} - {formatTime(event.dateTime)}</Text>
            </View>
            <View style={styles.eventBottomInfo}>
              <Text style={styles.eventBottomInfoText}>{event.shortPlace} - {catName}</Text>
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
    this.props.fetchEvents(this.state.activeFilter, this.props.events.length)
  }

  onEndReached(){
    this.props.fetchMoreEvents(this.state.activeFilter)
  }

  componentWillReceiveProps(nextProps){
    this.state.events = nextProps.events
  }

  setFilter(selectedFilter) {
    this.setState({
      activeFilter: selectedFilter
    }, () => this.props.fetchEvents(this.state.activeFilter))
  }

  goToDetail(event) {
    Actions.event({event: event})
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const dataSource = ds.cloneWithRows(this.state.events)
    const options = [
      'New',
      'Next',
      'Near',
      'Ended'
    ]

    return (
      <View style={[commonStyles.mainContainer, {backgroundColor: '#64b0bc'}]}>
        <View style={{paddingTop: 20, paddingBottom: 20}}>
          <SegmentedControls
            tint={'#64b0bc'}
            selectedTint={'#fff'}
            backTint={'#fff'}
            optionStyle= {{
              fontSize: 17,
              width: styleVariables.screenWidth / 4 - 5
            }}
            containerStyle= {{
              marginRight: 10,
              marginLeft: 10,
              flex: 1,
              justifyContent: 'center',
            }}
            options={options}
            onSelection={this.setFilter.bind(this)}
            selectedOption={this.state.activeFilter}
          />
        </View>
        <ListView
          dataSource={dataSource}
          renderRow={(event) => this.renderRow(event)}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this.renderSeparator}
          onEndReached={this.onEndReached.bind(this)}
          enableEmptySections={true}
          onEndReachedThreshold={60}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
              tintColor='#fff'
              title="Loading..."
              titleColor='#fff'
              colors={['#555577', '#555577', '#fff']}
              progressBackgroundColor="#fff"
            />
          }
        />
      </View>
    )
  }
}


export default EventsPage