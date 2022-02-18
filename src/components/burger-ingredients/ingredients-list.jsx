import React, {forwardRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import IngredientItem from './ingredient-item';

import { getItems } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';


const IngredientsList = forwardRef(({ name, ename, openModal}, ref ) => {
  const dispatch = useDispatch();
  const { items } = useSelector(
    state => state.ingredients
  );

  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );
  return (
    <div ref={ref} className={styles.list_item + ' mb-8'}>
      <h2 className="text text_type_main-medium">{name}</h2>
	    <div className={styles.items}>
		    {items.map((product, index) => (product.type === ename) && <IngredientItem key={product._id} product={product} openModal={openModal} />)}
	    </div>
    </div>
  )
});

IngredientsList.propTypes = {
  name: PropTypes.string.isRequired,
  ename: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired
};


export default IngredientsList;