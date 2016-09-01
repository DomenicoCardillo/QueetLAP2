import React, {
  StyleSheet
} from 'react-native'

import styleVariables from './variables'

let commonStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    paddingTop: styleVariables.baseSpacer*2,
    paddingLeft: styleVariables.baseSpacer,
    paddingRight: styleVariables.baseSpacer
  },
  topBody: {
    flex: 1,
    alignItems: 'center',
    marginTop: styleVariables.baseSpacer*2,
    paddingLeft: styleVariables.baseSpacer,
    paddingRight: styleVariables.baseSpacer,
  },
  centeredBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: styleVariables.baseSpacer*2,
    paddingLeft: styleVariables.baseSpacer,
    paddingRight: styleVariables.baseSpacer,
  },
  textInput: {
    height: 40,
    width: styleVariables.screenWidth - styleVariables.baseSpacer*2,
    marginBottom: styleVariables.baseSpacer*2,
    borderColor: styleVariables.colors.borderColor,
    borderWidth: 1,
    paddingLeft: styleVariables.baseSpacer,
    paddingRight: styleVariables.baseSpacer,
    borderRadius: styleVariables.baseRadius
  },
  primaryButton: {
    marginTop: styleVariables.baseSpacer,
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