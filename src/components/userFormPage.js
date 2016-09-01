import React, {
  Component
} from 'react'
import { View } from 'react-native'

import UserModel from '../formsModels/user'
import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'

import t from 'tcomb-form-native'
let Form = t.form.Form;

export default class UserFormPage extends Component {
  constructor (props) {
    super()
  }

  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);
    }
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <Form 
          ref="form"
          type={UserModel}
        /> 
        <Button onPress={this.onPress.bind(this)}>
          Ok
        </Button>
      </View>
    )
  }
}