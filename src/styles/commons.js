import React, {
  StyleSheet
} from 'react-native'

import Dimensions from 'Dimensions'
import styleVariables from './variables'

let commonStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBody: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: styleVariables.spacer*2,
    paddingLeft: styleVariables.spacer,
    paddingRight: styleVariables.spacer,
  },
  centeredBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: styleVariables.spacer*2,
    paddingLeft: styleVariables.spacer,
    paddingRight: styleVariables.spacer,
  },
  textInput: {
    height: 40,
    width: Dimensions.get('window').width - styleVariables.spacer*2,
    marginBottom: styleVariables.spacer,
    borderColor: styleVariables.colors.borderColor,
    borderWidth: 1,
    paddingLeft: styleVariables.spacer,
    paddingRight: styleVariables.spacer,
    borderRadius: styleVariables.radius
  },
  primaryButton: {
    marginTop: styleVariables.spacer,
    backgroundColor: styleVariables.colors.brandPrimary,
    borderWidth: 0
  },
  textLeft: {
    alignSelf: 'flex-start'
  },
  textRight: {
    alignSelf: 'flex-end'
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18
  },
  textBold: {
    fontWeight: '700'
  },
  whiteText: {
    color: '#fff'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
})

export default commonStyles