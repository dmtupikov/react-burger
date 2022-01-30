import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from './ingredient-item';
import productPropTypes from '../../utils/product-prop-types';


const IngredientsList = ({ products, name, ename, openModal }) => (
  <div className={styles.list_item + ' mb-8'}>
    <h2 className="text text_type_main-medium">{name}</h2>
	  <div className={styles.items}>
		  {products.map((product, index) => (product.type === ename) && <IngredientItem key={product._id} product={product} count={Math.floor(Math.random() * 3)} openModal={openModal} />)}
	  </div>
  </div>
);

IngredientsList.propTypes = {
  products: PropTypes.arrayOf(productPropTypes.isRequired),
  name: PropTypes.string.isRequired,
  ename: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired
};


export default IngredientsList;