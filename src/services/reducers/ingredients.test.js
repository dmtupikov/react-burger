import { ingredientsReducer } from './ingredients'
import * as types from '../actions/ingredients';

const initialState = {
  items:null,
  itemsRequest:false,
  itemsFailed:false
};

describe('ingredientsReducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(
      initialState
    )
  })

  it('should handle GET_ITEMS_REQUEST', () => {
    expect(
      ingredientsReducer(initialState, {
        type: types.GET_ITEMS_REQUEST
      })
    ).toEqual(
      {
        ...initialState,
        itemsRequest: true
      }
    )
  })

  it('should handle GET_ITEMS_SUCCESS', () => {
    expect(
      ingredientsReducer(initialState, {
        type: types.GET_ITEMS_SUCCESS,
        items: [{}]
      })
    ).toEqual(
      {
        ...initialState,
        itemsFailed: false,
        items: [{}],
        itemsRequest: false
      }
    )
  })

  it('should handle GET_ITEMS_FAILED', () => {
    expect(
      ingredientsReducer(initialState, {
        type: types.GET_ITEMS_FAILED
      })
    ).toEqual(
      {
        ...initialState,
        itemsFailed: true
      }
    )
  })
}) 