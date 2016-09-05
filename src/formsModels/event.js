import React, {
  StyleSheet
} from 'react-native'

import { formatDate, formatTime } from '../globals'

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

let Name = t.refinement(t.String, function (name) {
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
  name: Name,
  date: t.Date,
  time: t.Date
})

const options = {
  stylesheet: stylesheet,
  fields: {
    date: {
      mode: 'date',
      config: {
        format: formatDate
      }
    },
    time: {
      mode: 'time',
      config: {
        format: formatTime
      }
    }
  }
}

export default {
  model,
  options
}