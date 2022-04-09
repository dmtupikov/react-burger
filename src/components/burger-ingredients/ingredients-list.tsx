import React, { forwardRef } from 'react';
import IngredientItem from './ingredient-item';
import { useSelector } from 'react-redux';
import { IIngredientsList, IStateI } from './types';
import styles from './burger-ingredients.module.css';

import { IIngredients } from '../../services/actions/ingredients'


const IngredientsList = forwardRef<HTMLDivElement, IIngredientsList>(({ name, ename }, ref ) => {
  const { items } = useSelector< IStateI, { items: Array<IIngredients> | null }>(
    state => state.ingredients
  );

  return (
    <div ref={ref} className={styles.list_item + ' mb-8'}>
      <h2 className="text text_type_main-medium">{name}</h2>
	    <div className={styles.items}>
		    {(items != null) && items.map((product, index) => (product.type === ename) && <IngredientItem key={product._id} product={product} />)}
	    </div>
    </div>
  )
});


export default IngredientsList;