import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';

import { useSelector, useDispatch } from 'react-redux';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


function App() {

  const { items, constructor, modal } = useSelector(
    state => state.ingredients
  );
  const dispatch = useDispatch();

  const handleOpenModal = (content) => {
    dispatch({'type':'OPEN_MODAL', 'content':content});
  }

  const handleCloseModal = () => {
    dispatch({'type':'CLOSE_MODAL'});
  }

  React.useEffect(() => {
    let total = 0;
    if (constructor.ingredients.length > 0) constructor.ingredients.map((item) => total += items.find(product => item === product._id).price);
    if (constructor.bun != null) {
      total += 2 * items.find(product => product._id === constructor.bun).price;
    }
    dispatch({'type':'UPDATE_TOTAL','total':total});
  }, [constructor, dispatch, items]);

  const visabilityModal = modal.visability;
  const contentModal = modal.content;

  return (
    <div>
      <AppHeader />
      <main>
        <div className={styles.conteiner}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients handleOpenModal={handleOpenModal} key='1' />
            <BurgerConstructor handleOpenModal={handleOpenModal} key='2' />
          </DndProvider>
        </div>
      </main>
      {visabilityModal && (
        <Modal visability={visabilityModal} onClose={handleCloseModal} >
          {contentModal}
        </Modal>
      )}
    </div>
  );
}

export default App;