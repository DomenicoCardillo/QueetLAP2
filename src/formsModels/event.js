import React, {
  StyleSheet
} from 'react-native'

import { formatDate, formatTime } from '../globals'

import t from 'tcomb-form-native'
import _ from 'lodash'

const stylesheet = _.cloneDeep(t.form.Form.stylesheet)
stylesheet.textbox.normal.backgroundColor = '#fff'
stylesheet.textbox.normal.fontSize        = 15

let Name = t.refinement(t.String, function (name) {
  return name.length >= 2;
});

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