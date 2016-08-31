import React, { Component, PropTypes } from 'react'
import { Text } from 'react-native'
import styleVariables from '../styles/variables'

class TabItem extends Component {
  render() {
    return (
      <Text style={{ color: this.props.selected ? styleVariables.colors.brandPrimary : 'black' }}>
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