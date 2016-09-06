import React, {
  StyleSheet
} from 'react-native'

import { formatDate, formatTime } from '../globals'

import t from 'tcomb-form-native'

const model = t.struct({
  name: Name,
  date: t.Date,
  time: t.Date
})

const options = {
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