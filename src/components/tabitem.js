import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import styleVariables from '../styles/variables'
import Icon from 'react-native-vector-icons/FontAwesome'

class TabItem extends Component {
  render() {
    return (
      <View style={styles.tab}>
        <Icon name={this.props.tabIcon} size={25} color={this.props.selected ? styleVariables.colors.brandPrimary : '#000'} style={styles.icon} />
        <Text style={{ color: this.props.selected ? styleVariables.colors.brandPrimary : '#000' }}>
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
    marginTop: 5
  }
})

TabItem.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
}

export default TabItem