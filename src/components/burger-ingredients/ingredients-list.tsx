import React, { forwardRef } from 'react';
import IngredientItem from './ingredient-item';
import { useSelector } from '../../services/hooks';
import styles from './burger-ingredients.module.css';


interface IIngredientsList {
  name:string;
  ename:string;
}

const IngredientsList = forwardRef<HTMLDivElement, IIngredientsList>(({ name, ename }, ref ) => {
  const { items } = useSelector(
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