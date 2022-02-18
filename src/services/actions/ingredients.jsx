import { getData, getDataOrder } from '../../utils/api';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const GET_ITEM_OBJECT = 'GET_ITEM_OBJECT';
export const DELETE_ITEM_OBJECT = 'DELETE_ITEM_OBJECT';

export const ADD_INGREDIENT_CONSTRUCTOR = 'ADD_INGREDIENT_CONSTRUCTOR';
export const ADD_BUN_CONSTRUCTOR = 'ADD_BUN_CONSTRUCTOR';
export const DELETE_ITEM_CONSTRUCTOR = 'DELETE_ITEM_CONSTRUCTOR';
export const MOVE_ITEM_CONSTRUCTOR = 'MOVE_ITEM_CONSTRUCTOR';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const UPDATE_TOTAL = 'UPDATE_TOTAL';

export function getItems() {
  return function(dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getData()
      .then((res) => {
        if (res && res.success) {
	      dispatch({
	        type: GET_ITEMS_SUCCESS,
	        items: res.data
	      });
	    } else {
          dispatch({
            type: GET_ITEMS_FAILED
          });
        }
      });
  };
}


export function getOrder(ingredients) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getDataOrder(ingredients)
      .then((res) => {
        if (res && res.success) {
	      dispatch({
	        type: GET_ORDER_SUCCESS,
	        order: {name:res.name, number:res.order.number}
	      });
	    } else {
          dispatch({
            type: GET_ORDER_FAILED
          });
        }
      });
  };
}