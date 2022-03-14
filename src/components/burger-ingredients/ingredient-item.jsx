import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import productPropTypes from '../../utils/product-prop-types';

import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';


const IngredientItem = ({ product }) => {
  const location = useLocation();
  const { ingredients, bun } = useSelector(
    state => state.construct
  );

  const [{ opacity }, ref] = useDrag({
    type: 'items',
    item: {id:product._id},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const count = useMemo(() => {
    let count = 0;
    if (product.type === 'bun') {
      if (bun === product._id) count = 2;
    } else {
      ingredients.forEach(function(item) {
        if (item === product._id) count = count+1;
      })
    }
    return count;
    },
    [bun, ingredients, product]
  );

  return (
    <Link to={{pathname: `/ingredients/${product._id}`, state: { background: location } }} className={styles.item + ' mt-6 mb-2'} style={{ opacity }} ref={ref}>
      <img src={product.image} alt={product.name}/>
      <span className={styles.price + ' mt-1 mb-1'}><span className="text text_type_digits-default mr-2">{product.price}</span><CurrencyIcon type="primary" /></span>
      <span className={styles.name + ' text text_type_main-default'}>{product.name}</span> 
      {count > 0 && <Counter count={count} size="default" />}
    </Link>
  )
};

IngredientItem.propTypes = {
  product: productPropTypes.isRequired
};


export default IngredientItem;