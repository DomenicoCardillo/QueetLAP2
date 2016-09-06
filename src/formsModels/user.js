import React, {
  StyleSheet
} from 'react-native'

import t from 'tcomb-form-native'

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