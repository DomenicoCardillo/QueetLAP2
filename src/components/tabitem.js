import React, { Component, PropTypes } from 'react'
import { Text } from 'react-native'
import Colors from '../styles/colors'

class TabItem extends Component {
  render() {
    return (
      <Text style={{ color: this.props.selected ? Colors.brandPrimary : 'black' }}>
        {this.props.title}
      </Text>
    )
  }
}

TabItem.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
}

export default TabItem