import React, {
  StyleSheet
} from 'react-native'

import t from 'tcomb-form-native'
import _ from 'lodash'

const stylesheet = _.cloneDeep(t.form.Form.stylesheet)
stylesheet.textbox.normal.backgroundColor = '#fff'
stylesheet.textbox.normal.fontSize        = 15
stylesheet.textbox.normal.borderColor     = '#ddd'
stylesheet.textbox.normal.borderWidth     = 1
stylesheet.textbox.normal.paddingLeft     = 15

let Gender = t.enums({
  M: 'Male',
  F: 'Female'
})

let Name = t.refinement(t.String, function (name) {
  return name.length >= 2;
});

const model = t.struct({
  firstname: Name,
  lastname: Name,
  gender: Gender
})

const options = {
  stylesheet: stylesheet,
  /* Check this on new account */
  fields: {
    gender: {
      nullOption: false
    }
  }
}

export default {
  model,
  options
}