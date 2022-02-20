import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import IngredientItem from './ingredient-item';

import { useSelector } from 'react-redux';


const IngredientsList = forwardRef(({ name, ename }, ref ) => {
  const { items } = useSelector(
    state => state.ingredients
  );

  return (
    <div ref={ref} className={styles.list_item + ' mb-8'}>
      <h2 className="text text_type_main-medium">{name}</h2>
	    <div className={styles.items}>
		    {items.map((product, index) => (product.type === ename) && <IngredientItem key={product._id} product={product} />)}
	    </div>
    </div>
  )
});

IngredientsList.propTypes = {
  name: PropTypes.string.isRequired,
  ename: PropTypes.string.isRequired
};


export default IngredientsList;