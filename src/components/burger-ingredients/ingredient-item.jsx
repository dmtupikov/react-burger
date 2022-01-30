import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import productPropTypes from '../../utils/product-prop-types';


const IngredientItem = ({ product, count, openModal }) => {
  const openIngredintCard = (e) => {
    const content = <IngredientDetails image={product.image_large} name={product.name} calories={product.calories} proteins={product.proteins} fat={product.fat} carbohydrates={product.carbohydrates} />
    openModal(content);
  }

  return (
  <div className={styles.item + ' mt-6 mb-2'} onClick={openIngredintCard}>
    <img src={product.image} alt={product.name}/>
    <span className={styles.price + ' mt-1 mb-1'}><span className="text text_type_digits-default mr-2">{product.price}</span><CurrencyIcon type="primary" /></span>
    <span className={styles.name + ' text text_type_main-default'}>{product.name}</span> 
    {count > 0 && <Counter count={count} size="default" />}
  </div>
  )
};

IngredientItem.propTypes = {
  dataProducts: PropTypes.arrayOf(productPropTypes.isRequired),
  openModal: PropTypes.func.isRequired,
  count: PropTypes.number
};


export default IngredientItem;