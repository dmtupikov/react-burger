import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import PropTypes from 'prop-types';
import styles from './home.module.css';
import AppHeader from '../components/app-header/app-header';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import OrderDetails from '../components/order-details/order-details';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Modal from '../components/modal/modal';

import { getItems, RESET_ITEM_OBJECT, ADD_ITEM_OBJECT } from '../services/actions/ingredients';
import {RESET_ORDER_OBJECT} from '../services/actions/order';


export function HomePage({ modal }) {

  const { id } = useParams();

  const { items } = useSelector(
    state => state.ingredients
  );
  const { itemObject } = useSelector(
    state => state.ingredients
  );
  const { orderObject } = useSelector(
    state => state.order
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

  useEffect(
    () => {
      if (modal) {
        dispatch({type:ADD_ITEM_OBJECT, id:id});
      };
    },
    [dispatch, items]
  );
  
  const modalContent = useMemo(() => {
    let modalContent = (itemObject != null) ? (<IngredientDetails />) : ((orderObject != null) ? (<OrderDetails />) : null);
    return modalContent;
  }, [itemObject, orderObject]);
  
  return (
    <div>
      <AppHeader />
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

HomePage.propTypes = {
  modal: PropTypes.bool
};