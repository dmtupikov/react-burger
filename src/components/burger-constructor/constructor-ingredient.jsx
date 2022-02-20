import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import move from '../../images/move.svg';

import { DELETE_ITEM_CONSTRUCTOR } from '../../services/actions/constructor';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';


const ConstructorIngredient = ({id, num, position}) => {
  const ref = useRef(null);
  const { items } = useSelector(
    state => state.ingredients
  );
  const dispatch = useDispatch();
  const [, drag] = useDrag({
    type: 'itemsSub',
    item: {id, num, ref},
  });
  drag(ref);
  const deleteIngredient = () => {
    dispatch({type:DELETE_ITEM_CONSTRUCTOR, num:num});
  }
  var product = items.find(item => item._id === id);
  if (position) {      
    return (
      <ConstructorElement text={product.name + ((position === 'top') ? ' (верх)' : ' (низ)')} isLocked={true} price={product.price} thumbnail={product.image} type={position} />
    )
  } else {
    return (
      <div className={styles.item} ref={ref} key={num}>
        <img className={styles.move_icon} src={move} alt="Переместить" title="Переместить"/>
        <ConstructorElement text={product.name} price={product.price} thumbnail={product.image} handleClose={deleteIngredient}  />
      </div>
    )
  }
};

ConstructorIngredient.propTypes = {
  id: PropTypes.string.isRequired,
  num: PropTypes.number,
  position: PropTypes.string,
}; 

export default ConstructorIngredient;