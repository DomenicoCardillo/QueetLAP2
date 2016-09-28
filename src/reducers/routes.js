import { ActionConst } from 'react-native-router-flux'

const routes = (state = {}, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case ActionConst.FOCUS:
      newState.routes.scene = action.scene
      return newState

    default:
      return state
  }
}

export default routes