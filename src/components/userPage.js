import React, {
  Component
} from 'react'

import {
  View,
  Text,
  StyleSheet,
  ListView,
  ScrollView,
  TouchableOpacity,
  RecyclerViewBackedScrollView,
  Image
} from 'react-native'

import Button from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'
import fonts from '../styles/fonts'
import { formatDate, formatTime } from '../globals'

export default class UserPage extends Component {
  constructor (props) {
    super()
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
          backgroundColor: '#ddd'
        }}
      />
    )
  }

  goToEventDetail(event) {
    this.props.setEventDetail(event)
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const dataSource = ds.cloneWithRows(this.props.userEvents)
    return (
      <View style={commonStyles.mainContainer}>
        <ScrollView style={commonStyles.container}>
          <View style={styles.imageContainer}>
            { this.props.user.pictureUrl === undefined || this.props.user.pictureUrl === '' ? (
                <Image source={require('../assets/img/user-default.png')} style={styles.userImage} />
              ) : (
                <Image source={{ uri: this.props.user.pictureUrl }} style={styles.userImage} />
              )
            }
          </View>
          <View style={styles.titleContainer}>
            <Text style={[fonts.style.h4, {marginRight: 8}]}>{this.props.user.firstname} {this.props.user.lastname}</Text>
            { this.props.user.gender === 'M' ? (
                <Icon name="mars" size={18} color="#3498db" style={{top: 8}} />
              ) : (
                <Icon name="venus" size={18} color="#ea4c89" style={{top: 8}} />
              )
            }
          </View>
          { this.props.user.longPlace ? (
            <View style={styles.infoContainer}>
              <Icon name="map-marker" size={20} color={styleVariables.colors.brandPrimary} style={[styles.infoIcon, {left: 4}]} />
              <Text style={fonts.style.h5}>{this.props.user.longPlace}</Text>
            </View>
          ) : ( null ) }
          { this.props.user.stringedCategory ? (
            <View style={styles.infoContainer}>
              <Icon name="star" size={20} color={styleVariables.colors.brandPrimary} style={styles.infoIcon} />
              <Text style={fonts.style.h5}>{this.props.user.stringedCategory}</Text>
            </View>
          ) : ( null ) }

          { this.props.wathRender.addFriend ? (
            <Button 
              style={[commonStyles.primaryButton, {alignItems: 'center', marginTop: 20}]} 
              textStyle={commonStyles.primaryButtonText}
              onPress={() => this.props.toggleFriendship(this.props.user.id)}
              isLoading={this.props.isLoadingPrimary}>
              <Icon name="user-plus" size={18} color="#fff" style={{marginRight: 8}} />
              <Text style={commonStyles.primaryButtonText}>Add friend</Text>
            </Button>
          ) : ( null ) }
          { this.props.wathRender.removeFriend ? (
            <Button 
              style={[commonStyles.dangerButton, {alignItems: 'center', marginTop: 20}]}
              textStyle={commonStyles.primaryButtonText}
              onPress={() => this.props.toggleFriendship(this.props.user.id)}
              isLoading={this.props.isLoadingPrimary}>
              <Icon name="user-times" size={18} color="#fff" style={{marginRight: 8}} />
              <Text style={commonStyles.primaryButtonText}>Remove friend</Text>
            </Button>
          ) : ( null ) }
          { this.props.wathRender.waitResponse ? (
            <View style={[commonStyles.rowCenter, {marginTop: 20}]}>
              <Icon name="user" size={18} color={styleVariables.colors.brandPrimary} style={{marginRight: 8}} />
              <Text style={{color: styleVariables.colors.brandPrimary}}>Wait for his friendship response...</Text>
            </View>
          ) : ( null ) }
          { this.props.wathRender.confirmFriend ? (
            <Button 
              style={[commonStyles.primaryButton, {alignItems: 'center', marginTop: 20}]}
              textStyle={commonStyles.primaryButtonText}
              onPress={() => this.props.responseFriendship(this.props.user.id, true)}
              isLoading={this.props.isLoadingPrimary}>
              <Icon name="user-plus" size={18} color="#fff" style={{marginRight: 8}} />
              <Text style={commonStyles.primaryButtonText}>Confirm friendship</Text>
            </Button>
          ) : ( null ) }
          { this.props.wathRender.rejectFriend ? (
            <Button 
              style={[commonStyles.dangerButton, {alignItems: 'center'}]} 
              textStyle={commonStyles.primaryButtonText}
              onPress={() => this.props.responseFriendship(this.props.user.id, false)}
              isLoading={this.props.isLoadingSecondary}>
              <Icon name="user-times" size={18} color="#fff" style={{marginRight: 8}} />
              <Text style={commonStyles.primaryButtonText}>Reject friendship</Text>
            </Button>
          ) : ( null ) }
          { this.props.userEvents.length > 0 ? (
            <View style={{paddingVertical: 30}}>
              <Text style={[fonts.style.h6, {marginBottom: 10}]}>Will participate in</Text>
              <ListView
                style={{borderWidth: 1, borderColor: '#ddd', height: this.props.userEvents.length * 135}}
                dataSource={dataSource}
                renderRow={(event) => this.renderRow(event)}
                renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                renderSeparator={this.renderSeparator}
                enableEmptySections={true}
              />
            </View>
          ) : null }

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1, 
    alignItems: 'center'
  },
  titleContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 25
  },
  infoContainer: {
    flexDirection: 'row', 
    marginBottom: 20
  },
  infoIcon: {
    top: 3, 
    width: 20,
    marginRight: 8
  },
  eventBox: {
    flex: 1,
    flexDirection: 'row',
    height: 135,
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