import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
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
      { ((itemObject != null) || (orderObject != null)) && (
        <Modal onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;