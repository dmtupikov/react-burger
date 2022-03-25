import React, { useEffect, useMemo, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './home.module.css';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import OrderDetails from '../components/order-details/order-details';
import Modal from '../components/modal/modal';

import { getItems, RESET_ITEM_OBJECT } from '../services/actions/ingredients';
import { RESET_ORDER_OBJECT } from '../services/actions/order';

interface IState {
  order:{
    orders:[],
    orderObject:IOrderObject|null,
    orderRequest:boolean,
    orderFailed:boolean
  }
}

interface IOrderObject {
  name:string,
  number:number
}

export const HomePage: FC = () => {

  const orderObject = useSelector<IState, IOrderObject | null>(
    state => state.order.orderObject
  );
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    window.history.replaceState(null, '', '/');
    dispatch({type:RESET_ITEM_OBJECT});
    dispatch({type:RESET_ORDER_OBJECT});
  }

  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  
  const modalContent = useMemo(() => {
    let modalContent = (orderObject != null) ? <OrderDetails /> : null;
    return modalContent;
  }, [orderObject]);
  
  return (
    <div>
      <main>
        <div className={styles.conteiner}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients key='1' />
            <BurgerConstructor key='2' />
          </DndProvider>
        </div>
      </main>
      { (modalContent != null) && (
        <Modal onClose={handleCloseModal}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
}
