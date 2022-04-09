import { IIngredients } from '../../services/actions/ingredients'

export interface IStateI {
  ingredients: {
    items:Array<IIngredients> | null,
    itemsRequest:boolean,
    itemsFailed:boolean,
  }
};

export interface IIngredientsList {
  name:string;
  ename:string;
}

export interface IIngredientItem {
  product:IIngredients;
}

export interface IStateC {
  construct:{
    ingredients:Array<{id:string, uuid:string}>|null;
    bun:string|null;
  }
};

export interface IIngredient {
  product:string;
};