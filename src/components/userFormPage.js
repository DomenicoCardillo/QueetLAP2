import React, {
  Component
} from 'react'
import { ScrollView } from 'react-native'

import UserForm from '../formsModels/user'
import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'

import t from 'tcomb-form-native'
let Form = t.form.Form;

export default class UserFormPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        firstname: this.props.profile.firstname || '',
        lastname: this.props.profile.lastname || '',
        gender: this.props.profile.gender || '' 
      }
    }
  }

  onChange(value) {
    this.setState({value})
  }

  onSave() {
    let value = this.refs.form.getValue()
    if(value) {
      let newProfile = Object.assign({}, this.props.profile, value)
      this.props.updateProfile(newProfile)
    }
  }

  render() {
    return (
      <ScrollView style={commonStyles.container}>
        { this.props.hasError ? (
            <View style={styles.errorBox}>
              <Text style={commonStyles.whiteText}>
                {this.props.errorMessage}
              </Text>
            </View>
          ) : null }

        <Form 
          ref="form"
          type={UserForm.model}
          options={UserForm.options}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        /> 
        <Button 
          style={commonStyles.primaryButton} 
          textStyle={commonStyles.primaryButtonText}
          isLoading={this.props.isLoading}
          onPress={this.onSave.bind(this)}>
          Save
        </Button>
      </ScrollView>
    )
  }
}