import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import { useSelector, useDispatch } from 'react-redux';
import {getItems, RESET_ITEM_OBJECT} from '../../services/actions/ingredients';
import {RESET_ORDER_OBJECT} from '../../services/actions/order';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


function App() {

  const { itemObject } = useSelector(
    state => state.ingredients
  );
  const { orderObject } = useSelector(
    state => state.order
  );
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch({type:RESET_ITEM_OBJECT});
    dispatch({type:RESET_ORDER_OBJECT});
  }

  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  const modalContent = (itemObject != null) ? (<IngredientDetails />) : ((orderObject != null) ? (<OrderDetails />) : null) 

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

export default App;