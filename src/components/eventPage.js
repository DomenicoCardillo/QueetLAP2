import React, {
  Component,
} from 'react'

import { 
  ScrollView, 
  View, 
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'
import fonts from '../styles/fonts'
import Icon from 'react-native-vector-icons/FontAwesome'

import { formatDate, formatTime } from '../globals'

export default class EventPage extends Component {
  constructor(props) {
    super()
  }

  categoryImage() {
    let catSlug = this.props.categories[this.props.event.category].slug
    let imageBox = null

    switch (catSlug) {
      case 'badminton':
        imageBox = <Image source={require('../assets/img/badminton.jpg')} style={styles.image} />
        break
      case 'basket':
        imageBox = <Image source={require('../assets/img/basket.jpg')} style={styles.image} />
        break
      case 'running':
        imageBox = <Image source={require('../assets/img/running.jpg')} style={styles.image} />
        break
      case 'soccer':
        imageBox = <Image source={require('../assets/img/soccer.jpg')} style={styles.image} />
        break
      case 'tennis':
        imageBox = <Image source={require('../assets/img/tennis.jpg')} style={styles.image} />
        break
      case 'volley':
        imageBox = <Image source={require('../assets/img/volley.jpg')} style={styles.image} />
        break
    }

    return imageBox
  }

  join() {
    this.props.requestPartecipation(this.props.event)
  }
  leave() {
    this.props.removePartecipation(this.props.event)
  }
  confirm(userId) {
    this.props.responsePartecipation(userId, this.props.event, true)
  }
  reject(userId) {
    this.props.responsePartecipation(userId, this.props.event, false)
  }
  remove(userId) {
    this.props.removePartecipation(this.props.event, userId)
  }

  render() {
    let users = []
    users.push(
      <View style={styles.listItemContainer} key={this.props.event.creator.id}>
        <Text style={{fontWeight: '600'}}>{this.props.event.creator.name}</Text>
        <Icon name="star" size={18} color='#c19a2f' style={{marginRight: 5}} />
      </View>
    )
    Object.keys(this.props.event.users).forEach((userId) => {
      users.push(
        <View style={styles.listItemContainer} key={userId}>
          <Text>{this.props.event.users[userId].fullName}</Text>
          {this.props.wathRender.usersActions ? 
              this.props.event.users[userId].needConfirm ? (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity 
                    activeOpacity={0.6}
                    onPress={() => { this.confirm(userId) }}
                  >
                    <Icon name="check" size={22} color={styleVariables.colors.brandSuccess} style={{marginRight: 5}} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    activeOpacity={0.6}
                    onPress={() => { this.reject(userId) }}
                  >
                    <Icon name="close" size={22} color={styleVariables.colors.brandDanger} style={{marginRight: 5}} />
                  </TouchableOpacity>
                </View>
              ) : ( 
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity 
                      activeOpacity={0.6}
                      onPress={() => { this.remove(userId) }}
                    >
                    <Icon name="close" size={22} color={styleVariables.colors.brandDanger} style={{marginRight: 5}} />
                  </TouchableOpacity> 
                </View> 
              )
           : this.props.event.users[userId].needConfirm ? (
              <View style={{flexDirection: 'row'}}>
                <Text>Pending</Text>
              </View>
            ) : ( null )}
        </View>
      )
    })
    return (
      <View style={commonStyles.mainContainer}>
        <ScrollView style={commonStyles.container}>
          <View style={styles.topInfoContainer}>
            <Text style={styles.topInfo}>{this.props.categories[this.props.event.category].name}</Text>
            <View style={styles.topInfoContainer}>
              <Icon name="map-marker" size={18} color={styleVariables.colors.brandPrimaryDark} style={{marginRight: 8}} />
              <Text style={styles.topInfo}>{this.props.event.shortPlace}</Text>
            </View> 
          </View>

          {this.categoryImage()}
          
          <View style={styles.infoContainer}>
            <Text style={fonts.style.h1}>{this.props.event.name}</Text>
            <Text style={{fontSize: 12, marginTop: 5}}>{formatDate(this.props.event.dateTime)} - {formatTime(this.props.event.dateTime)}</Text>
          </View>
          
          <View style={styles.listContainer}>
            { this.props.event.maxPartecipants ? 
              (<Text style={[fonts.style.h6, {marginBottom: 5}]}>
                Partecipants { Object.keys(this.props.event.users).length + 1}/{this.props.event.maxPartecipants}
              </Text>)
              :
              (<Text><Text style={[fonts.style.h6, {marginBottom: 5}]}>Partecipants </Text></Text>)
            }
            {users}
          </View>
          
          <View style={{marginBottom: 20}}>
            { this.props.wathRender.addPartecipation && !this.props.wathRender.limitReached ? (
              <Button 
              style={[commonStyles.primaryButton, {marginBottom: 10}]} 
              textStyle={commonStyles.primaryButtonText}
              onPress={this.join.bind(this)}
              isLoading={this.props.isLoading}>
                Join
              </Button>
            ) : ( null ) }
            { this.props.wathRender.removePartecipation ? (
              <Button 
              style={[commonStyles.dangerButton, {marginBottom: 10}]} 
              textStyle={commonStyles.primaryButtonText}
              onPress={this.leave.bind(this)}
              isLoading={this.props.isLoading}>
                Leave
              </Button>
            ) : ( null ) }
            { this.props.wathRender.waitResponse ? (
              <View style={commonStyles.rowCenter}>
                <Text>Wait for event's creator response</Text>
              </View>
            ) : ( null ) }
            { this.props.wathRender.limitReached ? (
              <View style={commonStyles.rowCenter}>
                <Text>Max number of partecipants reached</Text>
              </View>
            ) : ( null ) }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: styleVariables.screenWidth - 20,
    height: 200,
    borderRadius: styleVariables.baseRadius,
  },
  topInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  topInfo: {
    fontSize: 15,
    fontWeight: '600',
    color: styleVariables.colors.brandPrimaryDark
  },
  listContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  listItemContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingVertical: 5
  }
})