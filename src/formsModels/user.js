import React, {
  StyleSheet
} from 'react-native'

import t from 'tcomb-form-native'
import _ from 'lodash'

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderWidth = 1

stylesheet.datepicker.normal.borderWidth = 1
stylesheet.datepicker.normal.borderColor = '#ddd'
stylesheet.datepicker.normal.borderRadius = 4

stylesheet.select.normal.borderWidth = 1
stylesheet.select.normal.borderColor = '#ddd'
stylesheet.select.normal.borderRadius = 4

let Gender = t.enums({
  M: 'Male',
  F: 'Female'
})

var Name = t.refinement(t.String, function (name) {
  return name.length >= 2;
});

let styles = {
  textbox: {

    // the style applied wihtout errors
    normal: {
      color: '#000000',
      fontSize: 17,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: '#cccccc', // <= relevant style here
      borderWidth: 1,
      marginBottom: 5
    },

    // the style applied when a validation error occours
    error: {
      color: '#000000',
      fontSize: 17,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: '#a94442', // <= relevant style here
      borderWidth: 1,
      marginBottom: 5
    }
  }
}

const model = t.struct({
  firstname: Name,
  lastname: Name,
  gender: Gender
})

const options = {
  stylesheet: stylesheet
}

export default {
  model,
  options
}