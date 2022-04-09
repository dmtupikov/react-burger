import React, { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';

import IngredientDetails from '../components/ingredient-details/ingredient-details';

import { getItems } from '../services/actions/ingredients';


export const IngredientPage: FC = () => {

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );
  
  return (
    <div>
      <IngredientDetails />
    </div>
  )
};