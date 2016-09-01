import t from 'tcomb-form-native'

let Gender = t.enums({
  M: 'Male',
  F: 'Female'
})

const UserModel = t.struct({
  firstname: t.String,
  lastname: t.String,
  email: t.String,
  birthdate: t.Date,
  gender: Gender
})

export default UserModel