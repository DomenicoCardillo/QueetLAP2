import React from 'react-native'

import { formatDate, formatTime } from '../globals'

import t from 'tcomb-form-native'
import _ from 'lodash'

const stylesheet = _.cloneDeep(t.form.Form.stylesheet)
stylesheet.textbox.normal.backgroundColor = '#fff'
stylesheet.textbox.normal.fontSize        = 15
stylesheet.textbox.normal.borderColor     = '#ddd'
stylesheet.textbox.normal.borderWidth     = 1
stylesheet.textbox.normal.paddingLeft     = 15

let Name = t.refinement(t.String, name => { return name.length >= 2 })

let Privacy = t.enums({
  All: 'All',
  Friends: 'Friends'
})

const model = t.struct({
  name: Name,
  date: t.Date,
  time: t.Date,
  privacy: Privacy
})

const options = {
  stylesheet: stylesheet,
  fields: {
    date: {
      mode: 'date',
      minimumDate: new Date(),
      config: {
        format: formatDate
      }
    },
    time: {
      mode: 'time',
      minimumDate: new Date(),
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