import * as types from './types'
import { dbCategoriesRef } from '../globals'

export const loadCategories = () => {
  return (dispatch) => {
    dispatch(loadCategoriesStart())
    dbCategoriesRef.once('value').then(function(snapshot) {
      dispatch(loadCategoriesSuccess(snapshot.val()))
    }).catch(function(error){
      dispatch(loadCategoriesFailed(error))
    })
  }
}

export const loadCategoriesStart = () => {
  return {
    type: types.LOAD_CATEGORIES_START
  }
}

export const loadCategoriesSuccess = (payload) => {
  return {
    type: types.LOAD_CATEGORIES_SUCCESS,
    payload
  }
}

export const loadCategoriesFailed = (error) => {
  return {
    type: types.LOAD_CATEGORIES_FAILED,
    error
  }
}