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
  TouchableOpacity,
  RecyclerViewBackedScrollView,
  RefreshControl,
  ActivityIndicator
} from 'react-native'

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

  onPress(notification) {
    this.props.setNotificationRead(notification.id)
    if(notification.macroType == 'user') this.props.setUserDetail(notification.toUser)
    if(notification.macroType == 'event') this.props.setEventDetail(notification.event)
  }

  renderRow(notification) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={this.onPress.bind(this, notification)}>
        <View style={styles.notificationBox}>
          <View>
            {notification.pictureElement}
          </View>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationBody}>{notification.content}</Text>
            <Text style={styles.notificationDate}>{notification.date}</Text>
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
    this.props.fetchNotifications()
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const dataSource = ds.cloneWithRows(this.props.notifications || [])

    return (
      <View style={[commonStyles.mainContainer, {backgroundColor: styleVariables.colors.backgroundColor}]}>

        { this.props.isLoading && this.props.notifications === null ? 
          (
            <ActivityIndicator
              animating={this.props.isLoading}
              style={{alignItems: 'center', justifyContent: 'center', height: styleVariables.screenHeight - (85 * 2)}}
              color="#fff"
              size="large"
            />
          ) : null
        }

        { !this.props.isLoading && this.props.notifications && this.props.notifications.length === 0 ? (
            <View style={styles.errorBox}>
              <Text style={[fonts.style.h4, commonStyles.whiteText, {textAlign: 'center', marginTop: 30}]}>
                You have no notifications
              </Text>
            </View>
          ) : (
            <ListView
              dataSource={dataSource}
              renderRow={(notification) => this.renderRow(notification)}
              renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
              renderSeparator={this.renderSeparator}
              enableEmptySections={true}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this.props.fetchNotifications.bind(this)}
                  tintColor='#fff'
                  title="Loading..."
                  titleColor='#fff'
                  colors={['#555577', '#555577', '#fff']}
                  progressBackgroundColor="#fff"
                />
              }
            />
          )
        }
      </View>
    )
  }
}

export default NotificationsPage