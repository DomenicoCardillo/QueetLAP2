import React, { Component } from 'react'

import styleVariables from '../styles/variables'
import commonStyles from '../styles/commons'
import fonts from '../styles/fonts'

import { formatDate, formatTime } from '../globals'

import {
  View,
  ListView,
  Text, 
  Image, 
  StyleSheet,
  TouchableOpacity,
  RecyclerViewBackedScrollView,
  RefreshControl,
  ActivityIndicator
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import { SegmentedControls } from 'react-native-radio-buttons'

import Button from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'

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
    fontSize: 16,
    width: 90,
    fontWeight: '500', 
    marginBottom: 5
  },
  eventDate: {
    position: 'absolute', 
    right: 0,
    top: 2,
    color: '#999',
    fontSize: 12
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
  }

  componentDidMount() {
    this.setFilter('New')
    this.props.listenEventsChanges()
  }

  renderRow(event) {
    let catName = this.props.categories[event.category].name
    let catSlug = this.props.categories[event.category].slug
    let imageBox = null
    event.users = event.users || {} 
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
      case 'volley':
        imageBox = <Image source={require('../assets/img/volley.jpg')} style={styles.eventImage} />
        break
    }
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => this.goToEventDetail(event)}>
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
              { event.maxPartecipants ? 
                (<Text>{event.creator.name} - Partecipants {Object.keys(event.users).length + 1}/{event.maxPartecipants}</Text>)
                :
                (<Text>{event.creator.name}</Text>)
              }
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
    this.props.fetchEvents()
  }

  setFilter(selectedFilter) {
    this.props.setFilter(selectedFilter)
  }

  goToEventDetail(event) {
    this.props.setEventDetail(event)
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const dataSource = ds.cloneWithRows(this.props.events)
    const options = [
      'New',
      'Next',
      'Near',
      'Ended'
    ]

    return (
      <View style={[commonStyles.mainContainer, {backgroundColor: '#64b0bc'}]}>
        {this.props.categoryFilter !== null ? (
          <View style={[commonStyles.primaryButton, {alignItems: 'center', justifyContent: 'center', flexDirection: 'row', padding: 10}]}>
            <TouchableOpacity onPress={() => this.props.removeCategoryFilter()}>
              <Icon name='close' size={20} color='#fff' style={{marginRight: 5}} />
            </TouchableOpacity>
            <Text style={[commonStyles.whiteText, {fontWeight: '500', fontSize: 15}]}>{this.props.categoryFilter}</Text>
          </View>
        ) : (null)}
        <View style={{paddingTop: 10, paddingBottom: 10}}>
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
            selectedOption={this.props.activeFilter}
          />
        </View>
        
        {this.props.isLoading && this.props.events.length === 0 ? (
            <ActivityIndicator
              animating={this.props.isLoading}
              style={{alignItems: 'center', justifyContent: 'center', height: styleVariables.screenHeight - (85 * 2)}}
              color="#fff"
              size="large"
            />
          ) : null
        }

        { !this.props.isLoading && this.props.events.length === 0 ? (
          <View style={styles.errorBox}>
            <Text style={[fonts.style.h4, commonStyles.whiteText, {textAlign: 'center'}]}>No event found</Text>
            <TouchableOpacity onPress={this.setFilter.bind(this, 'New')}>
              <Text style={[fonts.style.h6, commonStyles.whiteText, {textAlign: 'center'}]}>See new events</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ListView
            dataSource={dataSource}
            renderRow={(event) => this.renderRow(event)}
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
            renderSeparator={this.renderSeparator}
            enableEmptySections={true}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={this.props.fetchEvents.bind(this)}
                tintColor='#fff'
                title="Loading..."
                titleColor='#fff'
                colors={['#555577', '#555577', '#fff']}
                progressBackgroundColor="#fff"
              />
            }
          />
        )}
      </View>
    )
  }
}


export default EventsPage