import React from 'react';
import PropTypes from 'prop-types';
import ConstructorIngredient from './constructor-ingredient';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';

import { ADD_BUN_CONSTRUCTOR, ADD_INGREDIENT_CONSTRUCTOR, MOVE_ITEM_CONSTRUCTOR, getOrder } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';


function BurgerConstructor({handleOpenModal}) { 

  const { items, constructor, total } = useSelector(
    state => state.ingredients
  );
  const dispatch = useDispatch();
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
    accept: 'items',
    drop(itemId) {
      moveItem(itemId)
    },

  });

  const openOrderDetails = () => {
    if (constructor.bun != null) {
      let ingredients = [...constructor.ingredients, constructor.bun, constructor.bun];
      dispatch(getOrder(ingredients));
      const content = <OrderDetails />
      handleOpenModal(content);
    } else handleOpenModal(<ModalError>Необходимо добавить булку</ModalError>);
  }

  const ModalError = ({children}) => {
    return (
      <div className={'text text_type_main-large p-20'}>{children}</div>
    )
  }

  ModalError.propTypes = {
    children: PropTypes.string.isRequired,
  }; 

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


  return (
    <section ref={dropTarget} className={styles.wrap + ' mt-15'}>
      <div className={styles.list + ' mt-4'}>
        {(constructor.bun != null) && <ConstructorIngredient id={constructor.bun} position='top' /> }
        <div className={styles.main} ref={dropTargetSub}>
          {(constructor.ingredients.length > 0) && constructor.ingredients.map((product, index) => <ConstructorIngredient id={product} num={index} key={index} />)}
        </div>
        {(constructor.bun != null) && <ConstructorIngredient id={constructor.bun} position='bottom' />}
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

BurgerConstructor.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
}; 

export default BurgerConstructor;