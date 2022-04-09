import { IIngredients, IIStateI } from '../../services/actions/ingredients'
import { IConstructor } from '../../services/actions/constructor'

export interface IStateI {
  ingredients: IIStateI
};

export interface IStateC {
  construct:IConstructor
};

export interface IConstructorIngredient {
  id:string;
  num?:number;
  position?:"top" | "bottom";
  k?:string;
}