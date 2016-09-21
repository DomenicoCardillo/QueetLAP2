import React, {
  StyleSheet
} from 'react-native'

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

let MaxPartecipants = t.refinement(t.Number, n => { return n > 1 })

const model = t.struct({
  name: Name,
  date: t.Date,
  time: t.Date,
  privacy: Privacy,
  maxPartecipants: MaxPartecipants
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