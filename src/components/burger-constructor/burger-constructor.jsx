import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import ConstructorIngredient from './constructor-ingredient';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

import { ADD_BUN_CONSTRUCTOR, ADD_INGREDIENT_CONSTRUCTOR, MOVE_ITEM_CONSTRUCTOR, RESET_CONSTRUCTOR } from '../../services/actions/constructor';
import { getOrder } from '../../services/actions/order';


function BurgerConstructor() { 

  const { items } = useSelector(
    state => state.ingredients
  );
  const { ingredients, bun } = useSelector(
    state => state.construct
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const moveItem = (item) => {
    const type = items.find(product => product._id === item.id).type;
    if (type === 'bun') {
      dispatch({
        type: ADD_BUN_CONSTRUCTOR,
        ...item
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT_CONSTRUCTOR,
        ...item
      });
    }
  };

  const [, dropTarget] = useDrop({
    accept:'items',
    drop(itemId) {
      moveItem(itemId)
    },
  });

  const openOrderDetails = () => {
    if (localStorage.refreshToken) {
      if (bun != null) {
        const orderIngredients = [...ingredients, bun, bun];
        dispatch(getOrder(orderIngredients));
        dispatch({type:RESET_CONSTRUCTOR});
      }
    } else {
      history.push('/login');
    }
  }

  const moveItemSub = (item, monitor) => {
    const dist = monitor.getClientOffset().y - item.ref.current.getBoundingClientRect().y;
    const newPos = item.num + Math.floor(dist/100);
    dispatch({
      type: MOVE_ITEM_CONSTRUCTOR,
      id: item.id,
      pos: item.num,
      newPos: newPos
    });
  };
  
  const [, dropTargetSub] = useDrop({
    accept: 'itemsSub',
    drop: (item, monitor) =>  {
      moveItemSub(item, monitor)
    },
  });

  const total = useMemo(() => {
    let total = 0;
    if (ingredients.length > 0) ingredients.map((item) => total += items.find(product => item === product._id).price);
    if (bun != null) {
      total += 2 * items.find(product => product._id === bun).price;
    }
    return total;
  }, [ingredients, bun, items]);


  return (
    <section ref={dropTarget} className={styles.wrap + ' mt-15'}>
      <div className={styles.list + ' mt-4'}>
        {(bun != null) && <ConstructorIngredient id={bun} position='top' /> }
        <div className={styles.main} ref={dropTargetSub}>
          {(ingredients.length > 0) && ingredients.map((product, index) => <ConstructorIngredient id={product} num={index} key={index} />)}
        </div>
        {(bun != null) && <ConstructorIngredient id={bun} position='bottom' />}
      </div>
      <div className={styles.footer + ' mt-10'}>
        <span className={styles.total + ' mr-10'}>
          <span className="text text_type_digits-medium mr-4">{total}</span><CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="medium" value="" onClick={openOrderDetails}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;