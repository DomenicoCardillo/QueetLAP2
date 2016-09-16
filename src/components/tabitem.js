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
        <Text style={[commonStyles.whiteText, {fontSize: 12}]}>
          {this.props.title}
        </Text>
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
  }
})

TabItem.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
}

export default TabItem