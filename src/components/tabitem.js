import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import styleVariables from '../styles/variables'
import commonStyles from '../styles/commons'
import Icon from 'react-native-vector-icons/FontAwesome'

class TabItem extends Component {
  render() {
    return (
      <View style={styles.tab}>
        <Icon name={this.props.tabIcon} size={25} color='#fff' style={styles.icon} />
        <View>
          <Text style={[commonStyles.whiteText, {fontSize: 12}]}>{this.props.title}</Text>
          {this.props.title.toLowerCase() === 'notifications' ?
            (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>2</Text>
              </View>
            ) : (
              null
            )
          }
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  tab: {
    flex: 1, 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  icon: {
    marginBottom: 5, 
    marginTop: 8
  },
  notificationBadge: {
    position: 'absolute', 
    top: -15, 
    right: 20, 
    width: 15, 
    height: 15, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderRadius: 8, 
    borderColor: styleVariables.colors.brandDanger, 
    backgroundColor: styleVariables.colors.brandDanger
  },
  notificationBadgeText: {
    color: '#fff', 
    fontSize: 10, 
    textAlign: 'center'
  }
})

TabItem.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
}

export default TabItem