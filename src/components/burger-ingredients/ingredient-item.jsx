import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import productPropTypes from '../../utils/product-prop-types';

import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';


const IngredientItem = ({ product, openModal }) => {
  const openIngredintCard = (e) => {
    const content = <IngredientDetails id={product._id} />
    openModal(content);
  }

  const { ingredients } = useSelector(
    state => state.ingredients.constructor
  );

  const [{ opacity }, ref] = useDrag({
    type: 'items',
    item: {id:product._id},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  let count = 0;
  ingredients.forEach(function(item) {
    if (item === product._id) count = count+1;
  })


  return (
  <div className={styles.item + ' mt-6 mb-2'} style={{ opacity }} onClick={openIngredintCard} ref={ref}>
    <img src={product.image} alt={product.name}/>
    <span className={styles.price + ' mt-1 mb-1'}><span className="text text_type_digits-default mr-2">{product.price}</span><CurrencyIcon type="primary" /></span>
    <span className={styles.name + ' text text_type_main-default'}>{product.name}</span> 
    {count > 0 && <Counter count={count} size="default" />}
  </div>
  )
};

IngredientItem.propTypes = {
  product: productPropTypes.isRequired,
  openModal: PropTypes.func.isRequired
};


export default IngredientItem;