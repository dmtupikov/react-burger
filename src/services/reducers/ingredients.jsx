import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  ADD_ITEM_OBJECT,
  RESET_ITEM_OBJECT
} from '../actions/ingredients';

const initialState = {
  items:null,
  itemsRequest:false,
  itemsFailed:false
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
    }
    case GET_ITEMS_FAILED: {
      return { ...initialState, itemsFailed:true };
    }
    case ADD_ITEM_OBJECT: {
      return { ...state };
    }
    case RESET_ITEM_OBJECT: {
      return { ...state};
    }
    default: {
      return state;
    }
  }
};