import React, { useEffect, FC } from 'react';
import { useDispatch } from '../services/hooks';
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