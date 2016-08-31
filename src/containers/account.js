import { connect } from 'react-redux'
import AccountPage from '../components/accountPage'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const Account = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPage)

export default Account