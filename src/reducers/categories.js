import * as types from '../actions/types'

const categories = (state = {}, action) => {

  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      let newState = Object.assign({}, state)
      newState = action.payload
      return newState

    case types.LOAD_CATEGORIES_START:
    case types.LOAD_CATEGORIES_FAILED:
    default:
      return state
  }
}

export default categories