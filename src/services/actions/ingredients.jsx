import { getData } from '../../utils/api';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const ADD_ITEM_OBJECT = 'ADD_ITEM_OBJECT';
export const RESET_ITEM_OBJECT = 'RESET_ITEM_OBJECT';

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
      })
      .catch(() =>
        dispatch({
          type: GET_ITEMS_FAILED
        })
      );
  };
}
