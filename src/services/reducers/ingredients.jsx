import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  GET_ITEM_OBJECT,
  ADD_INGREDIENT_CONSTRUCTOR,
  ADD_BUN_CONSTRUCTOR,
  DELETE_ITEM_CONSTRUCTOR,
  MOVE_ITEM_CONSTRUCTOR,
  UPDATE_TOTAL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/ingredients';

const initialState = {
  url: 'https://norma.nomoreparties.space/api/',

  items: [],
  itemsRequest: false,
  itemsFailed: false,

  itemObject: {},
  orderObject: {},

  total:0,

  orders:[],
  orderRequest: false,
  orderFailed: false,

  constructor: {
    ingredients:[],
    bun:null
  },

  modal: {
    visability:false,
    content:null
  }
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
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case GET_ITEM_OBJECT: {
      return { ...state, itemObject: state.items.find(product => product._id === action.id) };
    }
    case ADD_INGREDIENT_CONSTRUCTOR: {
      return { 
        ...state,
        constructor: {
          ...state.constructor,
          ingredients: [...state.constructor.ingredients, action.id]
        }
      }
    }
    case ADD_BUN_CONSTRUCTOR: {
      return { 
        ...state,
        constructor: {
          ...state.constructor,
          bun: action.id
        }
      }
    }
    case DELETE_ITEM_CONSTRUCTOR: {
      let ingredients = [...state.constructor.ingredients];
      ingredients.splice(action.num, 1);
      return { 
        ...state,
        constructor: {
          ...state.constructor,
          ingredients: ingredients
        }
      }
    }
    case MOVE_ITEM_CONSTRUCTOR: {
      let ingredients = [...state.constructor.ingredients];
      ingredients.splice(action.pos, 1);
      ingredients.splice(action.newPos, 0, action.id);
      return { 
        ...state,
        constructor: {
          ...state.constructor,
          ingredients: ingredients
        }
      }
    }
    case UPDATE_TOTAL: {
      return { ...state, total:action.total}
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        ordersRequest: true
      };
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, orderFailed: false, orderObject: action.order, orders: [...state.orders, action.order], orderRequest: false, constructor: {ingredients:[], bun:null} };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case OPEN_MODAL: {
      return { ...state, modal:{visability:true, content:action.content}};
    }
    case CLOSE_MODAL: {
      return { ...state, modal:{visability:false, content:null}, itemObject: {}, orderObject: {}};
    }
    default: {
      return state;
    }
  }
};