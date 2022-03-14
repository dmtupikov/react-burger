import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppHeader from '../components/app-header/app-header';
import Ingredient from '../components/ingredient-page';

import { getItems } from '../services/actions/ingredients';


export const IngredientPage = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );
  
  return (
    <div>
      <AppHeader />
      <Ingredient product={id} />
    </div>
  )
};