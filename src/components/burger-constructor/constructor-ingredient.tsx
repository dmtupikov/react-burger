import React, { useRef, FC } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { DELETE_ITEM_CONSTRUCTOR } from '../../services/actions/constructor';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import { IIngredients, IStateI, IConstructorIngredient } from './types';


const ConstructorIngredient: FC<IConstructorIngredient> = ({id, num, position, k}) => {
  const ref = useRef(null);
  const { items } = useSelector<IStateI, { items: Array<IIngredients> | null }>(
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
  const product = (items != null) && items.find(item => item._id === id);
  const price:number = (product && product.price) ? product.price : 0;
  const image = (product && product.image) ? product.image : '';
  if (position) {
    const text:string = (product && product.name) ? product.name + ((position === 'top') ? ' (верх)' : ' (низ)') : '';
    return (
      <ConstructorElement text={text} isLocked={true} price={price} thumbnail={image} type={position} />
    )
  } else {
    const text:string = (product && product.name) ? product.name : '';
    const image = (product && product.image) ? product.image : '';
    return (
      <div className={styles.item} ref={ref} key={k}>
        <DragIcon type="primary" />
        <ConstructorElement text={text} price={price} thumbnail={image} handleClose={deleteIngredient}  />
      </div>
    )
  }
};


export default ConstructorIngredient;