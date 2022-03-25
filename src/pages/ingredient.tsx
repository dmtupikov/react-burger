import React, { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Ingredient from '../components/ingredient-page';

import { getItems } from '../services/actions/ingredients';


export const IngredientPage: FC = () => {

  const dispatch = useDispatch();
  const { id } = useParams<{id:string}>();

  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );
  
  return (
    <div>
      <Ingredient product={id} />
    </div>
  )
};