import {
  ADD_INGREDIENT_CONSTRUCTOR,
  ADD_BUN_CONSTRUCTOR,
  DELETE_ITEM_CONSTRUCTOR,
  MOVE_ITEM_CONSTRUCTOR,
  RESET_CONSTRUCTOR
} from '../actions/constructor';

const initialState = {
  ingredients:null,
  bun:null
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_CONSTRUCTOR: {
      const ingredients = (state.ingredients != null) ? [ ...state.ingredients, {id:action.id, uuid:action.uuid}] : [{id:action.id, uuid:action.uuid}];
      return { 
        ...state,
        ingredients: ingredients
      }
    }
    case ADD_BUN_CONSTRUCTOR: {
      return { 
        ...state,
        bun: action.id
      }
    }
    case DELETE_ITEM_CONSTRUCTOR: {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.num, 1);
      return { 
        ...state,
        ingredients: ingredients
      }
    }
    case MOVE_ITEM_CONSTRUCTOR: {
      const ingredients = [...state.ingredients];
      const uuid = ingredients[action.pos].uuid;
      ingredients.splice(action.pos, 1);
      ingredients.splice(action.newPos, 0, {id:action.id, uuid:uuid});
      return { 
        ...state,
        ingredients: ingredients
      }
    }
    case RESET_CONSTRUCTOR: {
      return { 
        ...initialState
      }
    }
    default: {
      return state;
    }
  }
};